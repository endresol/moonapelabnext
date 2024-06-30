const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

function getCurrentDateTimeStrings() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
}

async function getTotalNumberOfTicketsFromDatabase() {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT COUNT(*) AS total FROM raffle_lottery_ticketskets"
    );
    return rows[0].total;
  } catch (error) {
    console.error("Error fetching total number of tickets:", error);
    return 0;
  } finally {
    connection.end();
  }
}

async function getWinnerByTicketNumberFromDatabase(ticketNumber) {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM raffle_lottery_tickets WHERE id = ? AND winner = 0",
      [ticketNumber]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching winner by ticket number:", error);
    return null;
  } finally {
    connection.end();
  }
}

async function getPendingPrizesFromDatabase(currentDate, currentTime) {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM mal_raffle_prizes WHERE winner like '' AND date <= ? AND time <= ?",
      [currentDate, currentTime]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching pending prizes:", error);
    return [];
  } finally {
    connection.end();
  }
}

async function updateDrawScheduleWithWinner(prizeId, winner, ticket) {
  const connection = await getConnection();

  try {
    await connection.execute(
      "UPDATE mal_raffle_prizes SET winner = ?, ticketId = ? WHERE id = ?",
      [winner, ticket, prizeId]
    );
  } catch (error) {
    console.error("Error updating draw schedule with winner:", error);
  } finally {
    connection.end();
  }
}

async function updateTicketAsWinner(ticketId) {
  const connection = await getConnection();

  try {
    await connection.execute(
      "UPDATE raffle_lottery_tickets SET winner = 1 WHERE id = ?",
      [ticketId]
    );
  } catch (error) {
    console.error("Error updating ticket as winner:", error);
  } finally {
    connection.end();
  }
}

async function findWinner(totalNumberOfTickets, minTicketNumber) {
  const randomOffset = Math.floor(Math.random() * totalNumberOfTickets);
  const winningTicketNumber = minTicketNumber + randomOffset;
  console.log("Winning ticket number:", winningTicketNumber);

  const winner = await getWinnerByTicketNumberFromDatabase(winningTicketNumber);

  if (winner !== undefined && winner !== null) {
    console.log("Got a non-null result:", winner);
    return { winner, winningTicketNumber }; // Return
  } else {
    console.log("Result is null. Retrying...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    return findWinner(totalNumberOfTickets, minTicketNumber); // Recursive call
  }
}

async function drawWinners() {
  const { formattedDate, formattedTime } = getCurrentDateTimeStrings();

  console.log("Current date:", formattedDate, "Current time:", formattedTime);

  const pendingPrizes = await getPendingPrizesFromDatabase(
    formattedDate,
    formattedTime
  );

  console.log("Pending prizes:", pendingPrizes);

  const winners = [];

  for (const prize of pendingPrizes) {
    const totalNumberOfTickets = await getTotalNumberOfTicketsFromDatabase();
    const minTicketNumber = 10000;

    // const randomOffset = Math.floor(Math.random() * totalNumberOfTickets);
    // const winningTicketNumber = minTicketNumber + randomOffset;
    // console.log("Winning ticket number:", winningTicketNumber);

    // const winner = await getWinnerByTicketNumberFromDatabase(
    //   winningTicketNumber
    // );

    const { winner, winningTicketNumber } = await findWinner(
      totalNumberOfTickets,
      minTicketNumber
    );

    console.log("Winner:", winner, winningTicketNumber);

    if (winner) {
      winners.push({ prize: prize.prize, winner: winner.addess });
      // Update drawSchedule with winner's name
      console.log(
        "Updating draw schedule with winner:",
        winner.address,
        prize.id
      );
      await updateDrawScheduleWithWinner(
        prize.id,
        winner.address,
        winningTicketNumber
      );
      await updateTicketAsWinner(winner.id);
    }
  }

  return winners;
}

drawWinners();
