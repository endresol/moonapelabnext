import React, { useEffect, useState } from "react";

import { useWeb3Context } from "../../context";

function formatTicketNumbers(ticketNumbers: number[]): string[] {
  if (ticketNumbers.length === 0) return [];

  // Sort the ticket numbers
  ticketNumbers.sort((a, b) => a - b);

  const intervals: string[] = [];
  let start = ticketNumbers[0];
  let end = ticketNumbers[0];

  for (let i = 1; i < ticketNumbers.length; i++) {
    const current = ticketNumbers[i];

    if (current === end + 1) {
      // Continue the current interval
      end = current;
    } else {
      // End the current interval and start a new one
      intervals.push(start === end ? `${start}` : `${start}-${end}`);
      start = current;
      end = current;
    }
  }

  // Add the last interval
  intervals.push(start === end ? `${start}` : `${start}-${end}`);

  return intervals;
}

export const MaltarLotteryTickets: React.FC = () => {
  const { address } = useWeb3Context();
  const [ticketNumbers, setTicketNumbers] = useState([]);
  const [gotTickets, setGotTickets] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        await fetch(`/api/tickets/${address}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("get tickets", data);
            setGotTickets(data.ticketNumbers > 0 ? true : false);
            setTicketNumbers(data.ticketNumbers);
          });
      } catch (err) {
        console.log("error getting data", err);
      }
    };

    if (mounted) {
      getData();
    }

    return () => {
      mounted = false;
    };
  }, [address]);

  return (
    <div className='mt-4 mb-4'>
      <div>
        <h3>Your Tickets:</h3>
        {formatTicketNumbers(ticketNumbers).join(", ")}
      </div>
    </div>
  );
};
