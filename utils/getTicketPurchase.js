const { ethers } = require("ethers");
require("dotenv").config({ path: "./../" });

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_NETWORK_RPC
);

const contractAddress = process.env.NEXT_PUBLIC_MAL_ERC_20_CONTRACT; // Your contract's address
const contractABI = "./../abis/MALv1-ERC20-ABI.json";

const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function getInteractedWallets() {
  const filter = contract.filters.Interaction();
  const events = await contract.queryFilter(filter);

  const walletAddresses = events.map((event) => event.args.walletAddress);
  return walletAddresses;
}

getInteractedWallets()
  .then((walletAddresses) => {
    console.log("Interacted wallet addresses:", walletAddresses);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
