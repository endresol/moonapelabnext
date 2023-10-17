import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import { extractIntegers } from '../../helpers/bignum';
import useTaxStakingContract from '../../hooks/useTaxStakingContract';
import { MalButton } from '../Layout';
import { getPassName, getPassDiscount } from "./../../helpers";
import { toast } from 'react-toastify';


export const UnstakeMoonPass: React.FC = () => {
  const { address } = useWeb3Context();
  const taxStakingContract = useTaxStakingContract();
  
  const [myStakedMoonPasses, setStakedMyMoonPasses] = useState<number[] | null>(null);
  const [myStakedPassValues, setMyStakedPassValues] = useState<Record<number, number> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const unstakeAllMoonPassesHandler = async () => {
    console.log("UNSTAKE ALL MoonPasses", myStakedMoonPasses);
    if (myStakedMoonPasses.length <= 0) { 
      console.log("no MoonPasses staked");
      toast.error("No MoonPasses staked");
      return;
    }
    
    const transaction = await taxStakingContract.unstake721(process.env.NEXT_PUBLIC_PASS_CONTRACT, myStakedMoonPasses);
    console.log("UNSTAKE ALL MoonPasses transaction", transaction);
    await transaction.wait();
    console.log("DONE", transaction);    
    
  };

  function countOccurrences(arr: number[]): Record<number, number> {
    const counts: Record<number, number> = {
      1: 0,
      5: 0,
      10: 0
    };
  
    for (const num of arr) {
      if (num === 1) {
        counts[1]++;
      } else if (num === 5) {
        counts[5]++;
      } else if (num === 10) {
        counts[10]++;
      }
    }
  
    return counts;
  }

  useEffect(() => {
    if (!taxStakingContract) return;
    let mounted = true;

    const getStakerNFTs = async() => {
      try {
        const taxStaking = await taxStakingContract.getStakerNFT(address);
        console.log("taxStaking staked nfts", taxStaking);
        setStakedMyMoonPasses(extractIntegers(taxStaking[1]));
        setMyStakedPassValues(countOccurrences(extractIntegers(taxStaking[2])));
        console.log(countOccurrences(extractIntegers(taxStaking[2])));
        
      } catch (err) {
        console.error("getStakerNFTs", err);
      }
    };
  
    if (mounted) {
      getStakerNFTs().then(() => { setIsLoading(false)});      
    }

    return () => {
      mounted = false;
    }

  },[address, taxStakingContract]);

  return (
    <div className="pt-10 pb-10">
      <h3 className="text-3xl font-bold mb-4">My Staked MoonPasses</h3>
      <p className="mb-6">
        Staked MoonPasses does not have a use in the game anymore, but can still be worth holding on to, at least one.<br/>
        A MoonPass will give you a discount on future Moon Ape Lab mints, but these discounts does not stack, so there is no need to keep more than one.<br/>
        <br/>
        Because staking now do not give any benefits the only option is to unstake all your MoonPasses in one transaction.
      </p>
      <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {myStakedMoonPasses && Object.keys(myStakedPassValues).map((key, index) => {
          return (
            <>
            <div key={index} className="rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <div className="relative">
                <Image src={`https://storage.moonapelab.io/static/passes/thumbs/${getPassName(key)}_pass.png`} alt={`MoonPass # ${key}: ${key}`} width={150} height={150} className="w-full"/>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-10 h-10 text-s font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 right-3 dark:border-gray-900">{myStakedPassValues[key]}</div>
              </div>
              
              <div className="text-small p-2">
                <p className="capitalize">{getPassName(key)} pass </p>
                Discount: {getPassDiscount(key)}
              </div>
              
            </div>
            
          </>
          )
        })}
        {isLoading && <div className="text-2xl font-bold text-center">Loading...</div>}
      </div>
      <div>
        <MalButton onClick={() => unstakeAllMoonPassesHandler()}>Unstake all</MalButton>
      </div>
    </div>
  )
}
