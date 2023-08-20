import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";


export const MaltarWinners: React.FC = () => {
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    fetch('/api/winners')
      .then((response) => response.json())
      .then((data) => setWinners(data.winners))
      .catch((error) => console.error('Error fetching winners:', error));
  }, []);

  return (
    <div>
      <h1>Winners</h1>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>{winner.winner} - Ticket #{winner.ticketId} - Prize {winner.prize}</li>
        ))}
      </ul>
    </div>
  );
}

