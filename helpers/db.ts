// db.js
import mysql from "mysql2/promise";

export default async function excuteQuery({ query, values }) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [rows, fields] = await db.execute(query, values);
    console.log("db: ", rows);
    await db.end();
    return rows;
  } catch (error) {
    return { error };
  }
}
