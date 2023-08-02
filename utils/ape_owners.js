const axios = require("axios");
const { ethers } = require("ethers");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const apeAbi = "C:/Users/endre/dev/MadEx/abis/MALgenesis-ABI.json";
const apeAddress = "0x34c4EBA1966B502dfCF0868b6f271d85CC8A2312";
const provider =
  "https://mainnet.infura.io/v3/5354fa25a0434b90a34241d37f45c33d";

const maxRetries = 3;
const batchSize = 10;

const batchRetryDelayMs = 2000; // 5 seconds delay between retries
const batchProcessingDelayMs = 1000; // 1 second delay between batches

const readABI = () => {
  try {
    const abiData = fs.readFileSync(apeAbi, "utf-8");
    const obj = JSON.stringify(abiData);
    return JSON.parse(obj);
  } catch (error) {
    console.error("Error reading ABI file:", error.message);
    return null;
  }
};

const getApeOwner = async (contract, apeId) => {
  console.log("getting: ", apeId);
  const _owner = await contract.ownerOf(apeId);
  console.log("new owner: ", _owner);
  try {
    const apeObj = await prisma.nfts_apenft.upsert({
      where: { nft_id: apeId },
      update: { owner: _owner },
      create: { owner: _owner, nft_id: apeId },
    });
    console.log("apeObj: ", apeObj);
  } catch (err) {
    console.log("error: ", err);
  }
};

const processBatch = async (contract, startId, batchSize) => {
  const promises = [];
  for (let i = startId; i < startId + batchSize; i++) {
    promises.push(getApeOwner(contract, i));
  }
  await Promise.all(promises);
};

const main = async () => {
  const abi = readABI();
  if (!abi) return;

  try {
    const _provider = new ethers.providers.JsonRpcProvider(provider);
    const contract = new ethers.Contract(
      apeAddress,
      JSON.parse(abi),
      _provider
    );

    console.log("provider", _provider);

    const totalSupply = await contract.totalSupply();
    const t1 = Date.now();

    for (let i = 1; i <= totalSupply; i += batchSize) {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          await processBatch(contract, i, batchSize);
          break; // Batch processed successfully, break out of the retry loop
        } catch (error) {
          console.error(`Error processing batch starting from ID ${i}:`, error);
          retries++;
          if (retries < maxRetries) {
            console.log(
              `Retrying batch starting from ID ${i} in ${batchRetryDelayMs}ms...`
            );
            await new Promise((resolve) =>
              setTimeout(resolve, batchRetryDelayMs)
            );
          }
        }
      }
      if (i + batchSize <= totalSupply) {
        console.log(
          `Waiting ${batchProcessingDelayMs}ms before processing the next batch...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, batchProcessingDelayMs)
        );
      }
    }
    const t2 = Date.now();
    const timeMsg = `[live] Updated APE owners in ${Math.round(
      (t2 - t1) / 60000
    )} minutes`;
    console.log(timeMsg, true); // Replace this with the function to send Telegram messages
  } catch (err) {
    // todo use something like ---
    console.log(`[live] ${err}`, true); // Replace this with the function to send Telegram messages
  }
};

main();
