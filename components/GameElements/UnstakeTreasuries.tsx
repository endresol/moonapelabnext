import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import { extractIntegers } from '../../helpers/bignum';
import useTaxStakingContract from '../../hooks/useTaxStakingContract';
import { MalButton } from '../Layout';


export const UnstakeTreasuries: React.FC = () => {
  const { address } = useWeb3Context();
  const taxStakingContract = useTaxStakingContract();
  
  const [myStakedTreasuries, setStakedMyTreasuries] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const unstakeAllTreasuriesHandler = async () => {
    console.log("UNSTAKE ALL treasuries", myStakedTreasuries);
    
    const transaction = await taxStakingContract.unstake721(process.env.NEXT_PUBLIC_TREASURIES_CONTRACT, myStakedTreasuries);
    console.log("UNSTAKE ALL Treasuries transaction", transaction);
    await transaction.wait();
    console.log("DONE", transaction);    
    
  };

  useEffect(() => {
    if (!taxStakingContract) return;
    let mounted = true;

    const getStakerNFTs = async() => {
      try {
        const taxStaking = await taxStakingContract.getStakerNFT(address);
        console.log("taxStaking staked nfts", taxStaking);
        setStakedMyTreasuries(extractIntegers(taxStaking[0]));
       
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
      <h3 className="text-3xl font-bold mb-4">My Staked Treasuries</h3>
      <p className="mb-6">
        Staked Moon Treasuries does not have a use in the game anymore, but we do not want the holders to be left empty handed. <br/>
        By unstaking your treasuries you will be able to trade them for a free Deku mint when the time comes.<br/>
        <br/>
        Because of this the only option is to unstake all your treasuries in one transaction.
      </p>
      <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {myStakedTreasuries && (
          <div className={`rounded-xl overflow-hidden shadow-lg border-4 border-white`}>
          <div className="relative">
            <Image src={`https://storage.moonapelab.io/static/treasury/thumbs/moon_treasury.gif`} alt={`${myStakedTreasuries.length} staked treasuries`} width={150} height={150} className="w-full"/>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-10 h-10 text-s font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 right-3 dark:border-gray-900">{myStakedTreasuries.length}</div>               
          </div>
          <div className="text-small p-2">Moon Treasury</div>
          </div>)
        }
      </div>
      <div>
        <MalButton onClick={() => unstakeAllTreasuriesHandler()}>Unstake all</MalButton>
      </div>
    </div>
  )
}
