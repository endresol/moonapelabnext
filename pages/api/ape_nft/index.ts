import executeQuery from "../../../helpers/db";

async function handler(req, res) {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT address FROM nfts_apenft limit 1",
      values: [],
    });
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  }
}

export default handler;
