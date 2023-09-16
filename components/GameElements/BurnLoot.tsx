import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import useMoonLootContract from '../../hooks/useMoonLootContract';
import useMADExchangeContract from '../../hooks/useMADExchangeContract';
import { getLootTypeNameFromIndex, getLootType, getLootMADexchangeFromIndex } from "./../../helpers";
import { MalButton } from "../Layout";
import {toast} from 'react-toastify';
import { Popup } from "../Layout/Popup";


export const BurnLoot: React.FC = () => {
  const { address } = useWeb3Context();
  const moonLootContract = useMoonLootContract();
  const madExchangeContract = useMADExchangeContract();
  
  const [myLoot, setMyLoot] = useState<number[] | null>(null);
  const [lootToBurn, setLootToBurn] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalMAD, setTotalMAD] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

 
  const handleBurnClick = async () => {
    console.log("BURN");

    if (totalMAD <= 0) {
      toast.error("No loot selected");
      return;
    };
    const isApprove = await moonLootContract.isApprovedForAll(address, process.env.NEXT_PUBLIC_MAD_EXCHANGE_CONTRACT);
    console.log("isApprovedForAll", isApprove);
    if (!isApprove) {
      setIsPopupOpen(true);
    } else {

    console.log("got loot and start burning",lootToBurn);
    const transaction = await madExchangeContract.burnLootForMad(lootToBurn);
    console.log("transaction started:", transaction);
    toast.info(() => (<div>Transaction started: <a target="_blank" href={transaction.hash}>{transaction.hash}</a></div>));
    await transaction.wait();
    toast.success("Transaction completed");
    console.log(transaction);
    }
  };

  const handleToggleLootSelect = (lootId) => {
    console.log("loot clicked", lootId);
    if (lootToBurn.includes(lootId)) {
      const newLootToBurn = lootToBurn.filter(item => item !== lootId);
      setLootToBurn(newLootToBurn);
      setTotalMAD(Math.round((totalMAD - getLootMADexchangeFromIndex(lootId))*10)/10);
    }
    else {
      setLootToBurn([...lootToBurn, lootId]);
      setTotalMAD(Math.round((totalMAD + getLootMADexchangeFromIndex(lootId))*10)/10);
    }
  };

  const handleApprovalAction = async () => {
    console.log("start approval");
    const transaction = await moonLootContract.setApprovalForAll(process.env.NEXT_PUBLIC_MAD_EXCHANGE_CONTRACT, true);
    
    console.log("transaction started:", transaction);
  
    await transaction.wait();
    toast.success("Set Approved done!", { autoClose: 5000 });
    console.log(transaction);

  };

  useEffect(() => {
    if (!moonLootContract) return;

    let mounted = true;

    const getLoot = async () => {
      try {
        const userLoot = [];
        const totalUserLoot = await moonLootContract.balanceOf(address);
        console.log("user got loot:", totalUserLoot.toNumber());
        
        for (let i = 0; i < totalUserLoot.toNumber() ;i++) {
          const loot =  await moonLootContract.tokenOfOwnerByIndex(address, i);
          userLoot.push(loot.toNumber());
          console.log("this", loot.toNumber());
        }
        
        setMyLoot(userLoot);
        console.log("got loot", userLoot);
        
      } catch (err) {
        console.log("get loot", err);
      };
    };

    if (mounted) {
      getLoot().then(() => {setIsLoading(false)});
    }

    return () => {
      mounted = false;
    }

  },[address, moonLootContract]);

  return (
    <>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
      <>
      <div className="my-10">
        <h2 className="text-2xl py-5">Burn Loot</h2>
        <p className="pb-4">
          This is the last use of loot. You can burn your loot and get $MAD in return. 
          The amount of $MAD you get depends on the type of loot you burn. The more rare the loot, the more $MAD you get. When the Mad Exchange runs out of $MAD, it will be closed.
        </p>
        <div className="grid pb-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {myLoot && myLoot.map((loot) => (
          <div key={loot} className={`rounded-xl overflow-hidden shadow-lg border-4 ${lootToBurn.includes(loot) ? ("border-white") : ("border-gray-400")}`}
          onClick={() => handleToggleLootSelect(loot)}>
            <div className="relative">
              <Image src={`https://storage.moonapelab.io/static/loots/thumbs/${getLootTypeNameFromIndex(loot)}.png`} alt={`${getLootTypeNameFromIndex(loot)} loot # ${loot}: ${loot}`} width={150} height={150} className="w-full"/>
              <div className="absolute bottom-5 right-0 transform rotate-[-45deg] bg-white text-black px-2 py-1">
              { getLootMADexchangeFromIndex(loot)} $MAD
            </div>
            </div>
            <div className="font-bold text-l m-2 capitalize ">{getLootTypeNameFromIndex(loot)} Moon Loot</div>

          </div>
        ))}
        </div>
        <div>
          <MalButton onClick={handleApprovalAction}>Approve MAD Exchange</MalButton>
          <MalButton onClick={handleBurnClick}>Burn loot for {totalMAD} MAD </MalButton>
        </div>
      </div>
        <Popup open={isPopupOpen} setOpen={setIsPopupOpen} title="Approval needed before burning">
          <>
            <p className="text-white">Approval is needed for the MAD Exchange to work. Please click the approval button and wait for the transaction to be approved.</p>
          </>
        </Popup>
        </>
      )}
    </>

  )
};
