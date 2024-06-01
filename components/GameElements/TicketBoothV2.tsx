import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useWeb3Context } from "../../context";
import { MalButton } from "../Layout";

import useMoonStakingS2Contract from "../../hooks/useMoonStakingS2Contract";

interface TransactionRequest {
  address: string;
  tickets: number;
  transaction: string;
}

interface TransactionResponse {
  message: string;
  data?: any; // Replace 'any' with the actual data type for the response data
}

export const TicketBoothV2: React.FC = () => {
  const { address } = useWeb3Context();
  const s2Staking = useMoonStakingS2Contract();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [maxTickets, setMaxTickets] = useState<number>(0);
  const ticketPrice = 5000;
  const [malSaldo, setMalSaldo] = useState<number>(0);
  const [ticketsOwned, setTicketsOwned] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleTicketBurnClick = async (tickets: number) => {
    console.log("lets get tickets", tickets);

    const transactionData: TransactionRequest = {
      address: address,
      tickets: tickets,
      transaction: Date.now().toString(),
    };

    try {
      const response = await fetch("/api/get_ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const responseData: TransactionResponse = await response.json();

      console.log("API return", responseData.message);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      throw new Error("Error submitting transaction");
    }

    setRefresh((prev) => !prev); // Toggle refresh state
  };

  useEffect(() => {
    console.log("useEffect TicketBooth");

    if (!s2Staking) return;

    let mounted = true;

    const getMalSaldo = async () => {
      try {
        const myMal = await s2Staking.getAccumulatedAmount(address);
        let spentMal = 0;
        await fetch(`/api/spending/${address}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("get spent mal", data);

            spentMal = data.malspending;
          });
        console.log("MAL", myMal, spentMal);

        let availableMal =
          Math.floor(+ethers.utils.formatEther(myMal)) - spentMal;
        if (availableMal < 0) availableMal = 0;

        setMalSaldo(availableMal);

        setMaxTickets(Math.floor(availableMal / ticketPrice));

        await fetch(`/api/get_ticket/${address}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("get tickets", data);

            setTicketsOwned(data.mytickets);
          });
      } catch (err) {
        console.log("get mal", err);
      }
    };

    if (mounted) {
      getMalSaldo().then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      mounted = false;
    };
  }, [address, s2Staking, refresh]);

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center h-screen'>
          <div className='text-2xl font-bold text-gray-800 animate-spin'>
            Loading
          </div>
        </div>
      )}
      {!isLoading && (
        <div className='max-w-4xl mx-auto p-6 text-gray-200 border-gray-200 border-2 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Get your Tickets</h2>
          <p className='text-l mb-8'>
            The is the last utility of the MALv2 token. We have listened to the
            community and will do one draw on the 1st of July. Spend all your
            MALv2 now, there will not be any better use case.
          </p>
          <p className=' mb-2'>MALv2 Balance: {malSaldo}</p>
          <p className=' mb-2'>Ticket price: {ticketPrice} MALv2</p>
          <p className=' mb-2'>Max tickets: {maxTickets}</p>
          <p className=' mb-4'>Your tickets: {ticketsOwned}</p>
          <div className='flex justify-center'>
            <MalButton
              onClick={() => handleTicketBurnClick(maxTickets)}
              isDisabled={maxTickets === 0}
            >
              {maxTickets === 0 ? "Price 5000" : "Buy tickets"}
            </MalButton>
          </div>
        </div>
      )}
    </>
  );
};
