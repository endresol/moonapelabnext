import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BigNumberish, ethers } from "ethers";

import { useWeb3Context } from "../../context";
import { extractIntegers } from "../../helpers/bignum";
import { MalButton, SmallButton } from "../Layout";
import { Popup } from "../Layout/Popup";

import UseMalv1Contract from "../../hooks/useMalV1Contract";

interface TransactionRequest {
  address: string;
  tickets: number;
  transaction: string;
}

interface TransactionResponse {
  message: string;
  data?: any; // Replace 'any' with the actual data type for the response data
}

export const TicketBooth: React.FC = () => {
  const { address } = useWeb3Context();
  const malv1Contract = UseMalv1Contract();

  const [myMalv1, setMyMalv1] = useState<BigNumberish | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [maxTickets, setMaxTickets] = useState<number>(0);
  const ticketPrice = 5000;

  const [burnTransaction, setBurnTransaction] = useState<string | null>(null);
  const [burnTransactionSuccess, setBurnTransactionSuccess] =
    useState<boolean>(false);
  const [burnTransactionError, setBurnTransactionError] =
    useState<boolean>(false);
  const [APITransactionSuccess, setAPITransactionSuccess] =
    useState<boolean>(false);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [ticketsOwned, setTicketsOwned] = useState<number>(0);

  const handleTicketBurnClick = async () => {
    // reset states
    setBurnTransaction(null);
    setBurnTransactionSuccess(false);
    setBurnTransactionError(false);
    setAPITransactionSuccess(false);

    setIsPopupOpen(true);

    const ticketsCost = count * ticketPrice;

    const transaction = await malv1Contract.purchaseRoyaleTickets(count);
    console.log("transaction started:", transaction.hash);
    setBurnTransaction(transaction.hash);

    await transaction.wait();

    console.log("transaction returned", transaction);

    setBurnTransactionSuccess(true);

    const transactionData: TransactionRequest = {
      address: address,
      tickets: count,
      transaction: transaction.hash,
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
      setAPITransactionSuccess(true);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      throw new Error("Error submitting transaction");
    }
  };

  const changeCounter = (value: number): void => {
    if (count + value < 0) setCount(0);
    else if (count + value > maxTickets) setCount(maxTickets);
    else setCount((prevCount) => prevCount + value);
  };

  useEffect(() => {
    console.log("useEffect TicketBooth");

    if (!malv1Contract) return;

    let mounted = true;

    const getMalv1 = async () => {
      try {
        const myMal = await malv1Contract.getUserBalance(address);
        setMyMalv1(Math.floor(+ethers.utils.formatEther(myMal)));
        setMaxTickets(
          Math.floor(+ethers.utils.formatEther(myMal) / ticketPrice)
        );

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
      getMalv1().then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      mounted = false;
    };
  }, [address, malv1Contract, isPopupOpen]);

  return (
    <>
      {isLoading && <div>Loading</div>}
      {!isLoading && myMalv1 && (
        <>
          <div>Buy Tickets</div>
          <p>
            <>MALv1 Balance: {myMalv1} </>
          </p>
          <p>Ticket price: 5000 MALv1</p>
          <p>Max tickets: {maxTickets} </p>
          <p>Your tickets: {ticketsOwned}</p>
          <div className='relative p-10'>
            <div className='counter flex flex-col items-center mt-4'>
              <div className='buttons flex'>
                <SmallButton onClick={() => changeCounter(-10)}>
                  -10
                </SmallButton>
                <SmallButton onClick={() => changeCounter(-5)}>-5</SmallButton>
                <SmallButton onClick={() => changeCounter(-1)}>-1</SmallButton>

                <h2 className='text-2xl p-2 text-center border-solid border-2 border-white'>
                  <span>{count}</span>
                </h2>

                <SmallButton onClick={() => changeCounter(1)}>+1</SmallButton>
                <SmallButton onClick={() => changeCounter(5)}>+5</SmallButton>
                <SmallButton onClick={() => changeCounter(10)}>+10</SmallButton>
                <SmallButton onClick={() => changeCounter(maxTickets)}>
                  MAX
                </SmallButton>
              </div>
            </div>
          </div>
          <div>
            <MalButton onClick={handleTicketBurnClick}>Buy tickets</MalButton>
          </div>
          <Popup
            open={isPopupOpen}
            setOpen={setIsPopupOpen}
            title='Getting Maltar Tickets'
          >
            <>
              <p className='text-white'>
                Buying tickets require a blockchain transaction and a call the
                the backend server. This take some time, so please let the
                transaction finish before doing anything else. Reloading the
                page can result in lost MAL.
              </p>
              <p className='text-white'>
                Please wait for the transaction to finish before closing this
                popup.
              </p>
              <p className='text-white'>
                Sending transaction - please approve the request.
              </p>
              {burnTransaction && (
                <p className='text-white'>
                  Waiting for transaction {burnTransaction} to finish
                </p>
              )}
              {burnTransactionSuccess && (
                <>
                  <p className='text-white'>Transaction finished...</p>
                  <p className='text-white'>Writing to database...</p>
                </>
              )}
              {APITransactionSuccess && (
                <p className='text-white font-xl'>
                  Success. Now you can close this window
                </p>
              )}
            </>
          </Popup>
        </>
      )}
    </>
  );
};
