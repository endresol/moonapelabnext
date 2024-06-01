import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await executeQuery({
      query:
        "select sum(quantity) as mal_spent from mal_spending where address = ?",
      values: [address],
    });

    console.log("spending", result);

    res
      .status(200)
      .json({ malspending: result[0].mal_spent ? result[0].mal_spent : 0 });
  }
}

export default handler;
