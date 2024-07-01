import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useWeb3Context } from "../../context";

export const MaltarWinners: React.FC = () => {
  const { address } = useWeb3Context();
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    fetch("/api/winners")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        setWinners(data.winners);
      })
      .catch((error) => console.error("Error fetching winners:", error));
  }, []);

  return (
    <div className='mt-4 mb-4'>
      <h2 className='text-2xl font-bold'>Maltar Winners</h2>

      {winners.length === 0 && (
        <p>
          No winners yet - the next raffle of 50 3D Avatars will happen on the
          1st of July 2024 around 20:00 UTC
        </p>
      )}
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>
            <span
              className={`${winner.winner === address ? "text-yellow-400" : "text-white"}`}
            >
              {winner.winner} - Ticket #{winner.ticket} - Prize {winner.prize}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
