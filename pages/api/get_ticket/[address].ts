import { NextApiRequest, NextApiResponse } from "next";

import executeQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await executeQuery({
      query:
        "select sum(quantity) as mytickets from raffle_tickets where address = ?",
      values: [req.query.address],
    });

    res
      .status(200)
      .json({ mytickets: result[0].mytickets ? result[0].mytickets : 0 });
  }
}

export default handler;
