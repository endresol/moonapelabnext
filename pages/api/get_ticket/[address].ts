import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
import excuteQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  // const prisma = new PrismaClient();
  if (req.method === "GET") {
    const address = req.query.address;

    // const tickets = await prisma.mal_raffle_purchase.aggregate({
    //   _sum: {
    //     quantity: true,
    //   },
    //   where: {
    //     address: address as string,
    //   },
    // });

    const result = await excuteQuery({
      query:
        "select sum(quantity) as mytickets from maldev2.mal_raffle_purchase where address = ?",
      values: [req.query.address],
    });

    console.log("ttt", result[0]);

    res.status(200).json({ mytickets: result[0].mytickets });
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
