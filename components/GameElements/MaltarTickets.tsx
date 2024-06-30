import React, { useEffect, useState } from "react";

import { useWeb3Context } from "../../context";

export const MaltarTickets: React.FC = () => {
  const { address } = useWeb3Context();
  const [ticketsOwned, setTicketsOwned] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        await fetch(`/api/get_ticket/${address}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("get tickets", data);

            setTicketsOwned(data.mytickets);
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

  return <div className='mt-4 mb-4'>You got {ticketsOwned ?? "0"} Tickets</div>;
};
