import React, { useState, useEffect } from 'react'

import { useWeb3Context } from "../../context";
import useMoonStakingContract from '../../hooks/useMoonStakingContract';
import useMoonStakingS2Contract from '../../hooks/useMoonStakingS2Contract';
import useMALgenesisContract from '../../hooks/useMoonApeLabContract';

import { extractIntegers } from "../../helpers/bignum";
import { removeDuplicateApes } from "../../helpers/nfts";

import { NftList } from ".";

interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export function StakingS1S2() {  
  
  const { address } = useWeb3Context();
  const [stakedS1OG, setStakedS1OG] = useState<number[] | null>(null);
  const [stakedLoot, setStakedLoot] = useState<number[] | null>(null);
  const [stakedS2OG, setStakedS2OG] = useState<number[] | null>(null);
  const [stakedS2Mutants, setStakedS2Mutants] = useState<number[] | null>(null);
  const [malGenesis, setMalGenesis] = useState<number[] | null>(null);

  const handleUnstakeS1Action = (nfts: number[]) => {
    console.log("Unstake season 1", nfts);
  };

  
  const handleUnstakeAllLoot = (nfts: number[]) => {
    console.log("Unstake all loot", nfts);
  };
  
  const handleAction2 = (nfts: number[]) => {
    console.log("action 2", nfts);
  };

  const handleUnstakeS2Action = async (nfts: number[]) => {
    if (!nfts || nfts.length <= 0) {
      console.log("no apes selected");
      return;
    };

    console.log("got apes and start unstaking");
    
    const transaction = await moonStakingContractS2.unstake721(process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT, nfts);
    console.log("transaction started:", transaction);
    
    await transaction.wait();

    console.log(transaction);
    
  }

  const handleStakeS2Action = async (nfts: number[]) => {
    if (!nfts || nfts.length <= 0) {
      console.log("no apes selected");
      return;
    };

    console.log("got apes and start staking");
    
    const transaction = await moonStakingContractS2.stake721(process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT, nfts);
    await transaction.wait();

    console.log(transaction);
    
  };

  const OGseason1Actions: Action[] = [
    { label: 'Unstake', onClick: handleUnstakeS1Action },
    { label: 'Unstake Loot', onClick: handleUnstakeAllLoot },
    { label: 'Claim MALv2', onClick: handleAction2 },
  ];

  const actions2: Action[] = [
    { label: 'Unstake', onClick: handleUnstakeS1Action },
    { label: 'Stake', onClick: handleAction2 },
  ];

  const OGseason2StakeActions: Action[] = [
    { label: 'Stake', onClick: handleStakeS2Action },
  ];
  const OGseason2UnstakeActions: Action[] = [
    { label: 'Unstake', onClick: handleUnstakeS2Action },
    { label: 'Claim MALv2', onClick: handleUnstakeS2Action },
  ];
  
  const moonStakingContract = useMoonStakingContract();
  const moonStakingContractS2 = useMoonStakingS2Contract();
  const malgenesisContract = useMALgenesisContract();
  
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!moonStakingContract && !moonStakingContractS2) return;
    let mounted = true;

    const getStakerNFTs = async() => {
      try {
        const s1staking = await moonStakingContract.getStakerNFT(address);
        console.log("season1 staked nfts", s1staking);
        setStakedS1OG(extractIntegers(s1staking[0]));
        setStakedLoot(extractIntegers(s1staking[1]));

        const s2staking = await moonStakingContractS2.getStakerNFT(address);
        console.log("season2 staked nfts", s2staking);
        setStakedS2OG(extractIntegers(s2staking[0]));
        setStakedS2Mutants(extractIntegers(s2staking[1]));

        // getting wallets apes from database
        console.log("fetching data");
        
        await fetch(`/api/ape_nft/${address}`).then(response => response.json()).then(data => {
          let filteredApes = removeDuplicateApes(data.nft_ids, extractIntegers(s2staking[0]));
          filteredApes = removeDuplicateApes(filteredApes, extractIntegers(s1staking[0]))
          setMalGenesis(filteredApes);
        });
        
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

  },[address, moonStakingContract, moonStakingContractS2, malgenesisContract]);

  return (
    <>
    {isLoading && <div>Loading</div> }
    {!isLoading && (
      <>
      <div>
        <NftList nftlist={stakedS1OG} title="Season 1 Staked Moon Apes" withLoot={stakedLoot} imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" actions={OGseason1Actions} />
        <NftList nftlist={stakedS2OG} title="Season 2 Staked Moon Apes" imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" actions={OGseason2UnstakeActions} />
        <NftList nftlist={stakedS2Mutants} title="Staked Mutants" imagepath="https://storage.moonapelab.io/mutants_images/thumbs" actions={actions2} />
        <NftList nftlist={malGenesis} title="Unstaked Moon Apes" imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" actions={OGseason2StakeActions} />
      </div>  
      </>
    )}  
    </>
  )
}
