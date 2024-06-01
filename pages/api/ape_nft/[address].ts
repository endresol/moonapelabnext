import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
import executeQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  // const prisma = new PrismaClient();
  if (req.method === "GET") {
    const address = req.query.address;

    // const nfts = await prisma.nfts_apenft.findMany({
    //   select: {
    //     nft_id: true,
    //   },
    //   where: {
    //     owner: address as string,
    //   },
    // });

    const result = await executeQuery({
      query: {
        sql: "SELECT nft_id FROM nfts_apenft WHERE address = ?",
        rowsAsArray: true,
      },
      values: [req.query.address],
    });

    // const nftIds = result.map((nft) => nft.nft_id);
    res.status(200).json({ nft_ids: result });
  }
}

// async function main(address) {
//   // ... you will write your Prisma Client queries here
//   const allUsers = await
//   console.log(allUsers)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

export default handler;
