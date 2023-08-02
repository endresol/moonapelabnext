import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const address = req.query.address;

    const tickets = await prisma.mal_raffle_purchase.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        address: address as string,
      },
    });

    res.status(200).json({ mytickets: tickets._sum.quantity });
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
