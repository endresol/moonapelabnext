import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";


export const MaltarWinners: React.FC = () => {
  
  const { address } = useWeb3Context();
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    fetch('/api/winners')
      .then((response) => response.json())
      .then((data) => setWinners(data.winners))
      .catch((error) => console.error('Error fetching winners:', error));
  }, []);

  return (
    <div className="mt-4 mb-4">
      <h2 className="text-2xl font-bold">Maltar Winners</h2>
      {winners.length === 0 && <p>No winners yet - the first draw will happen at 19:30 utc</p>}
      <ul>
        {winners.map((winner, index) => (
          <li key={index}><span className={`${winner.winner === address ? 'text-yellow-400' : 'text-white'}`}>{winner.winner} - Ticket #{winner.ticketId} - Prize {winner.prize}</span></li>
        ))}
      </ul>
    </div>
  );
}

