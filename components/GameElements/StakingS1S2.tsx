import React, { useState, useEffect } from 'react'

import { useWeb3Context } from "../../context";
import useMoonStakingContract from '../../hooks/useMoonStakingContract';
import useMoonStakingS2Contract from '../../hooks/useMoonStakingS2Contract';
import useMALgenesisContract from '../../hooks/useMoonApeLabContract';

import { extractIntegers } from "../../helpers/bignum";
import { removeDuplicateApes } from "../../helpers/nfts";

import { NftList } from ".";
import { UnstakePets, StakeMutants, UnstakeTreasuries, UnstakeMoonPass } from '.';
import UnstakeApesS1 from './UnstakeApesS1';
import { LoadingScreen } from '../Layout';

import { Popup } from "../Layout/Popup";
import { toast } from 'react-toastify';

interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export function StakingS1S2() {  
  
  const { address } = useWeb3Context();
  const [stakedS2OG, setStakedS2OG] = useState<number[] | null>(null);
  const [stakedS2Mutants, setStakedS2Mutants] = useState<number[] | null>(null);
  const [malGenesis, setMalGenesis] = useState<number[] | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);


  // BUTTON ACTIONS
  const handleClaimAction = async (nfts: number[]) => {
    console.log("start claim");
    
    const transaction = await moonStakingContractS2.updateAccumulatedAmount(address);
    toast.info(() => (<div>Transaction started: <a href={transaction.hash}>{transaction.hash}</a></div>), { autoClose: 5000, pauseOnHover:true, hideProgressBar: false});
    
    await transaction.wait();
    toast.success("Claimed", { autoClose: 5000 });

    console.log(transaction);
  };

  const handleUnstakeS2Action = async (nfts: number[]) => {
    if (!nfts || nfts.length <= 0) {
      toast.error("No apes selected");
      return;
    };

    console.log("got apes and start unstaking");
    
    const transaction = await moonStakingContractS2.unstake721(process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT, nfts);
    toast.info( `transaction started: <a href="">${transaction.hash}</a>`, { autoClose: 5000, pauseOnHover:true, hideProgressBar: false});
    
    await transaction.wait();
    toast.success("Unstaked", { autoClose: 5000 });
    console.log(transaction);
    
  }

  const handleStakeS2Action = async (nfts: number[]) => {
    if (!nfts || nfts.length <= 0) {
      toast.error("No apes selected");
      return;
    };

    const numberApes = [];
    nfts.forEach((nft) => { numberApes.push(Number(nft)) });
    console.log("numberApes", numberApes);

    const isApprove = await malgenesisContract.isApprovedForAll(address, process.env.NEXT_PUBLIC_MOONSTAKING_S2_CONTRACT);
    console.log("isApprovedForAll", isApprove);
    if (!isApprove) {
      setIsPopupOpen(true);
    } else {
      console.log("got apes and start staking");
      const transaction = await moonStakingContractS2.stake721(process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT, numberApes);
      toast.info( `transaction started: <a href="">${transaction.hash}</a>`, { autoClose: 5000, pauseOnHover:true, hideProgressBar: false});
      await transaction.wait();
      toast.success("Staked", { autoClose: 5000 });
      console.log(transaction);
    }
  };

  const handleUnstakeMutantsAction = async (nfts: number[]) => {
    if (!nfts || nfts.length <= 0) {
      toast.error("No mutants selected");
      return;
    };

    console.log("got mutants and start unstaking");
    
    const transaction = await moonStakingContractS2.unstake721(process.env.NEXT_PUBLIC_BREEDING_CONTRACT, nfts);
    toast.info( `transaction started: <a href="">${transaction.hash}</a>`, { autoClose: 5000, pauseOnHover:true, hideProgressBar: false});

    console.log("transaction started:", transaction);
    
    await transaction.wait();
    toast.success("Unstaked", { autoClose: 5000 });
    console.log(transaction);
    
  };

  const handleApprovalAction = async () => {
    console.log("start approval");
    const transaction = await malgenesisContract.setApprovalForAll(process.env.NEXT_PUBLIC_MOONSTAKING_S2_CONTRACT, true);
    
    console.log("transaction started:", transaction);
  
    await transaction.wait();
    toast.success("Set Approved done!", { autoClose: 5000 });
    console.log(transaction);

  };


  // BUTTONS

  const OGseason2UnstakeActions: Action[] = [
    { label: 'Unstake', onClick: handleUnstakeS2Action },
    { label: 'Claim MALv2', onClick: handleClaimAction },
  ];

  const MutantsUnstakeActions: Action[] = [
    { label: 'Unstake', onClick: handleUnstakeMutantsAction },
  ];

  const OGseason2StakeActions: Action[] = [
    { label: "Approve ", onClick: handleApprovalAction },
    { label: 'Stake', onClick: handleStakeS2Action },
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
    {!address && <div>Connect Wallet</div> }
    {isLoading && <LoadingScreen height="h-36" /> }
    {!isLoading && (
      <>
      <div>
        <UnstakeApesS1 />
        <div className="mt-10 mb-10">
          <h2 className="text-3xl font-bold">My Staked Moon Apes - Season 2</h2>
          <h3 className="text-xl mb-4">Staked after 23rd December 2022</h3>
          <p className="mb-6">Select apes and click ”UNSTAKE” in order to unstake selected Apes. <br />
            Confirm the transaction through Metamask in order to finalise changes.</p>
          <NftList isApe={true} nftlist={stakedS2OG} imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" actions={OGseason2UnstakeActions} />
        </div>
        <div className="mt-10 mb-10">
          <h2 className="text-3xl font-bold">My Staked Mutants</h2>
          <p className="mb-6">
            Click ”UNSTAKE” in order to unstake selected Mutants. <br />
            Confirm the transaction through Metamask in order to finalise changes.
          </p>
          <NftList nftlist={stakedS2Mutants} imagepath="https://storage.moonapelab.io/mutants_images/thumbs" actions={MutantsUnstakeActions} />
        </div>
        <UnstakePets />
        <br />
        <div className="mt-10 mb-10">
          <h2 className="text-3xl font-bold">Available Moon Apes to stake</h2>
          <p className="mb-6">Select the Moon Apes you want to stake and click the ”STAKE” button.<br />
            Confirm transaction through Metamask in order to finalise changes.
          </p>
          <NftList nftlist={malGenesis} isApe={true} imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" actions={OGseason2StakeActions} />
        </div>
        <StakeMutants />
        <UnstakeTreasuries />
        <UnstakeMoonPass />
      </div>
      <Popup open={isPopupOpen} setOpen={setIsPopupOpen} title="Approval needed before staking">
          <>
            <p className="text-white">Approval is needed for staking to work. Please click the approval button and wait for the transaction to be approved.</p>
          </>
        </Popup>
      </>
    )}  
    </>
  )
}
