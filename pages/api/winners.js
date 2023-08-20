import excuteQuery from "../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const winners = await excuteQuery({
      query:
        "SELECT * FROM mal_raffle_prizes where winner <> '' order by id desc",
      values: [],
    });

    res.status(200).json({ winners });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
