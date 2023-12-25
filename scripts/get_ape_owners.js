const mysql = require("mysql2/promise");
const Web3 = require("web3");
require("dotenv").config(); // Load environment variables from .env file

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
});

const provider = process.env.NEXT_PUBLIC_NETWORK_RPC;
const maladdress = process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT;
const abi = require("../abis/MALgenesis-ABI.json");

async function getApeOwner(contract, apeId) {
  const owner = await contract.methods.ownerOf(apeId).call();
  console.log("owner", owner);
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM nfts_apenft WHERE nft_id = ?",
      [apeId]
    );
    if (rows.length > 0 && rows[0].owner !== owner) {
      await pool.execute("UPDATE nfts_apenft SET owner = ? WHERE nft_id = ?", [
        owner,
        apeId,
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  try {
    const w3 = new Web3(new Web3.providers.HttpProvider(provider));
    const contract = new w3.eth.Contract(abi, maladdress);
    const totalSupply = await contract.methods.totalSupply().call();

    console.log("totalSupply", totalSupply);

    const t1 = Date.now();
    for (let i = 1; i <= totalSupply; i++) {
      await getApeOwner(contract, i);
    }
    const t2 = Date.now();
    const timeMsg = `[live] Updated APE owners in ${Math.round(
      (t2 - t1) / 60000
    )} minutes`;
    console.log(timeMsg);
    // Replace the console.log with your telegram notification function
  } catch (error) {
    console.error(`[live] ${error}`);
    // Replace the console.error with your telegram error notification function
  } finally {
    pool.end();
  }
}

main();
