const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

async function transferPurchasesToTickets() {
  dotenv.config();

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM mal_raffle_purchase"
    );
    console.log("Rows:", rows.length);

    for (const row of rows) {
      const numTickets = row.quantity;
      for (let i = 1; i <= numTickets; i++) {
        console.log("Inserting ticket for address:", row.address);
        await connection.execute(
          "INSERT INTO mal_raffle_tickets (address) VALUES (?)",
          [row.address]
        );
      }
    }
    console.log("Tickets transferred successfully.");
  } catch (error) {
    console.error("Error transferring tickets:", error);
  } finally {
    connection.end();
  }
}

transferPurchasesToTickets();
