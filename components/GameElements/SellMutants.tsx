import React, { useContext, useEffect, useState } from 'react';

import { useWeb3Context } from "../../context";
import useMoonApeMutantContract from '../../hooks/useMoonApeMutantContract';
import useMADExchangeContract from '../../hooks/useMADExchangeContract';
import { NftList } from './NftList';
import MadExContext from '../../context/MadExContext';


interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export const SellMutants: React.FC = () => {
  const { address } = useWeb3Context();
  const moonPetsContract = useMoonApeMutantContract();
  const madExchangeContract = useMADExchangeContract();

  const madExCtx = useContext(MadExContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myMutants, setMyMutants] = useState<number[]>([]);
  const [mutantSaleOpen, setMutantSaleOpen] = useState<boolean>(false);
  const [madBalance, setMadBalance] = useState<number>(0);
  
  const handleMutantSale = (nfts: number[]) => {
    console.log("sell mutants", nfts);
  };

  const mutantsActions: Action[] = [
    { label: 'Sell', onClick: handleMutantSale },
  ];

  useEffect(() => {
    if (!moonPetsContract) return;

    let mounted = true;

    const getMutants = async () => {
      try {
        const isOpen = await madExchangeContract.mutantSalesStatus();
        setMutantSaleOpen(isOpen);
        
        setMadBalance(madExCtx.madBalance);

        const userMutants = [];
        const totalUserMutants = await moonPetsContract.balanceOf(address);
        console.log("user got mutants:", totalUserMutants.toNumber());
        
        for (let i = 0; i < totalUserMutants.toNumber() ;i++) {
          const mutant =  await moonPetsContract.tokenOfOwnerByIndex(address, i);
          userMutants.push(mutant.toNumber());
          console.log("this", mutant.toNumber());
        }
        
        setMyMutants(userMutants);
        console.log("got loot", userMutants);
      } catch (err) {
        console.log("getMutants", err);
        
      }
    };

    if (mounted) {
      getMutants().then(() => {setIsLoading(false)});
    }

  },[address, moonPetsContract, madExchangeContract, madExCtx])
  return (
    <>
    <h3 className="text-2xl">Sell mutants</h3>
    <p className="text-white">Not yet open!</p>
    <NftList nftlist={myMutants} withPrice={true} imagepath="https://storage.moonapelab.io/mutants_images/thumbs" actions={mutantsActions} />
    </>
  )


}