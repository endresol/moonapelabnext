CREATE TABLE
    mal_raffle_tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        address VARCHAR(150),
        winner BOOLEAN DEFAULT FALSE
    ) AUTO_INCREMENT = 10000;

CREATE TABLE
    mal_raffle_prizes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE,
        time TIME,
        prize VARCHAR(150),
        winner VARCHAR(150),
        ticketId VARCHAR(150)
    );