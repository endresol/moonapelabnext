import { NextApiRequest, NextApiResponse } from "next";

import executeQuery from "../../../helpers/db";
interface RaffleLotteryTicket {
  id: number;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await executeQuery({
      query: "select id from raffle_lottery_tickets where address like ?",
      values: [req.query.address],
    });

    const tickets = result as RaffleLotteryTicket[];

    // Extract the ids into an array
    const ticketNumbers = tickets.map((ticket) => ticket.id);
    res.status(200).json({ ticketNumbers });
  }
}

export default handler;
