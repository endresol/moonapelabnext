// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import excuteQuery from "../../../helpers/db";

async function handler(req, res) {
  try {
    console.log("req nom", req.body);
    const result = await excuteQuery({
      query: "SELECT address FROM nfts_apenft limit 1",
      values: [],
    });
    console.log("ttt", result);
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  }
}

// async function main() {
// // ... you will write your Prisma Client queries here
// const allUsers = await prisma.nfts_apenft.findMany();
// console.log(allUsers);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

export default handler;
