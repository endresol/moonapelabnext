import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import { extractIntegers } from '../../helpers/bignum';
import useMoonLootContract from '../../hooks/useMoonLootContract';
import useMADExchangeContract from '../../hooks/useMADExchangeContract';
import { getLootTypeNameFromIndex, getLootType, getLootMADexchangeFromIndex } from "./../../helpers";

export const BurnLoot: React.FC = () => {
  const { address } = useWeb3Context();
  const moonLootContract = useMoonLootContract();
  const madExchangeContract = useMADExchangeContract();
  
  const [myLoot, setMyLoot] = useState<number[] | null>(null);
  const [lootToBurn, setLootToBurn] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalMAD, setTotalMAD] = useState<number>(0);

 
  const handleBurnClick = async () => {
    console.log("BURN");

    if (totalMAD <= 0) {
      console.log("no loot selected");
      return;
    };

    console.log("got loot and start burning",lootToBurn);
    const transaction = await madExchangeContract.burnLootForMad(lootToBurn);
    console.log("transaction started:", transaction);
    await transaction.wait();
    console.log(transaction);
    
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
        <div>Burn Loot</div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {myLoot && myLoot.map((loot) => (
          <div key={loot} className={`rounded-xl overflow-hidden shadow-lg border-4 ${lootToBurn.includes(loot) ? ("border-white") : ("border-black")}`}
          onClick={() => handleToggleLootSelect(loot)}>
            <div className="relative">
              <Image src={`https://storage.moonapelab.io/static/loots/thumbs/${getLootTypeNameFromIndex(loot)}.png`} alt={`${getLootTypeNameFromIndex(loot)} loot # ${loot}: ${loot}`} width={150} height={150} className="w-full"/>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-l mb-2 capitalize ">{getLootTypeNameFromIndex(loot)} Moon Loot</div>
              <p className="text-gray-700 text-base">
                Burn for {getLootMADexchangeFromIndex(loot)} $MAD
              </p>
            </div>
          </div>
        ))}
        </div>
        <div>
          <button onClick={handleBurnClick} className="mt-4 mr-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Burn loot for {totalMAD} MAD </button>
        </div>
      </>
      )}
    </>

  )
};
