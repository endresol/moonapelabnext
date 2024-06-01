import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await executeQuery({
      query: {
        sql: "SELECT nft_id FROM nfts_apenft WHERE address = ?",
        rowsAsArray: true,
      },
      values: [req.query.address],
    });

    res.status(200).json({ nft_ids: result });
  }
}

export default handler;
