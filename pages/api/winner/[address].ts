import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await executeQuery({
      query: {
        sql: "SELECT id FROM raffle_prizes WHERE winner = ?",
        rowsAsArray: true,
      },
      values: [req.query.address],
    });

    const winner = result[0] ? true : false;
    res.status(200).json({ winner });
  }
}

export default handler;
