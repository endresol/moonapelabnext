import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
import { ethers, BigNumber } from "ethers";
import excuteQuery from "../../../helpers/db";

import ABI from "../../../abis/MALv1-ERC20-ABI.json";

const ticketPrice = 5000;

async function checkEthereumTransaction(
  transactionHash: string,
  tickets: number,
  ticketPrice: number
): Promise<boolean> {
  const providerUrl =
    "https://goerli.infura.io/v3/5354fa25a0434b90a34241d37f45c33d"; // Replace with your Infura project ID
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  try {
    const transactionReceipt = await provider.getTransaction(transactionHash);
    // console.log("Transaction receipt:", transactionReceipt);

    if (transactionReceipt && transactionReceipt.confirmations > 0) {
      const data = transactionReceipt.data;
      const methodSignature = data.substring(0, 10); // The method ID is the first 4 bytes (8 characters) of the data

      const iface = new ethers.utils.Interface(ABI);
      const parsedData = iface.decodeFunctionData(methodSignature, data);

      const payedAmount: BigNumber = parsedData.amount;
      const calculatedAmount: BigNumber = BigNumber.from(
        ethers.utils.parseEther(ticketPrice.toString()).mul(tickets)
      );

      console.log("Parsed data:", parsedData.amount.toString());

      console.log(payedAmount, "===", calculatedAmount);

      if (calculatedAmount.eq(payedAmount)) {
        console.log("Transaction is valid");

        return true;
      } else {
        console.log("Transaction is invalid");

        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking Ethereum transaction:", error.message);
    return false; // Error occurred while checking the transaction
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const prisma = new PrismaClient();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { body } = req;
  console.log("body:", body);
  const {
    address,
    tickets,
    transaction,
  }: { address: string; tickets: number; transaction: string } = body;

  console.log(
    "Checking Ethereum transaction input:",
    transaction,
    address,
    tickets
  );

  const isTransactionValid = await checkEthereumTransaction(
    transaction,
    tickets,
    ticketPrice
  );

  if (!isTransactionValid) {
    return res.status(400).json({ message: "Invalid Ethereum transaction" });
  }

  try {
    // Insert data into the database using Prisma
    // const insertTransaction = await prisma.mal_raffle_purchase.create({
    //   data: {
    //     address,
    //     quantity: tickets,
    //     raffle_id: 1,
    //     transaction: transaction,
    //   },
    // });

    const insertTransaction = await excuteQuery({
      query:
        "INSERT INTO mal_raffle_purchase SET address = ?, quantity = ?, raffle_id = ?, transaction = ?",
      values: [address, tickets, 1, transaction],
    });

    console.log("Inserted transaction....:", insertTransaction);

    return res.status(200).json({
      message: "Transaction successfully submitted",
      data: insertTransaction,
    });
  } catch (error) {
    console.error("Error submitting transaction:", error.message);
    return res.status(500).json({ message: "Error submitting transaction" });
  }
}
