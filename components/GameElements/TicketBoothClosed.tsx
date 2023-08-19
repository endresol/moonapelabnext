import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";


export const TicketBoothClosed: React.FC = () => {
  const { address } = useWeb3Context();
  const [ticketsOwned, setTicketsOwned] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  

  useEffect(() => {
    console.log("useEffect TicketBooth");
    
    if (!address) return;

    let mounted = true;

    const getMalv1 = async () => {
      try {


        await fetch(`/api/get_ticket/${address}`).then(response => response.json()).then(data => {    
          console.log("get tickets", data);
          
          setTicketsOwned(data.mytickets);
        });
        

      } catch (err) {
        console.log("get mal", err);
      };
    };

    if (mounted) {
      getMalv1().then(() => {setIsLoading(false)});
    }

    return () => {
      mounted = false;
    }

  },[address]);

  return (
    <>
      <h3 className="text-center text-2xl font-bold text-white">Ticket Booth is Closed</h3>
      <p className="text-center text-white">We had to draw the line somewhee and here it is.
      Good luck with your {ticketsOwned} in the draw</p>
    </>

  )
};
