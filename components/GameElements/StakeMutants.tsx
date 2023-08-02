import React, {useState, useEffect } from 'react';

import { useWeb3Context } from '../../context';
import useMoonApeMutantContract from '../../hooks/useMoonApeMutantContract';
import { NftList } from '.';
import { Popup } from "../Layout/Popup";


interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export const StakeMutants: React.FC = () => {
  const { address } = useWeb3Context();
  const mutantContract = useMoonApeMutantContract();

  const [mutants, setMutants] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  
  const handleStakeMutantsAction = async (nfts: number[]) => {
    const isApprove = await mutantContract.isApprovedForAll(address, process.env.NEXT_PUBLIC_MOONSTAKING_S2_CONTRACT);
    console.log("isApprovedForAll", isApprove);
    if (!isApprove) {
      setIsPopupOpen(true);
    }
    console.log("stake mutants", nfts);  
  };

  const handleApprovalAction = async () => {
    console.log("start approval");
    const transaction = await mutantContract.setApprovalForAll(process.env.NEXT_PUBLIC_MOONSTAKING_S2_CONTRACT, true);
    console.log("transaction started:", transaction);
  
    await transaction.wait();
    console.log(transaction);

  };

  const MutantsStakeActions: Action[] = [
    { label: "Approve ", onClick: handleApprovalAction },
    { label: "Stake ", onClick: handleStakeMutantsAction },
  ];
  

  useEffect(() => {
    if (!mutantContract) return;

    let mounted = true;

    const getMutants = async() => {
      try {
        const userMutants = [];
        const totalMutants = await mutantContract.balanceOf(address);

        for (let i = 0; i < totalMutants.toNumber(); i++) {
          const mutant = await mutantContract.tokenOfOwnerByIndex(address, i);
          userMutants.push(mutant.toNumber());
        }
        setMutants(userMutants);
      } catch (err) {
        console.log("get mutants error", err);
        
      };
    };

    if (mounted) {
      getMutants().then(() => {setIsLoading(false)}); 
    }

    return () => {
      mounted = false;
    }
  },[address, mutantContract]);

  return (
    <>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <>
        <div className="mt-10 mb-10">
          <h2 className="text-3xl font-bold">Available Mutants to stake</h2>
          <p>
          Select the Mutants you want to stake and click the ”STAKE” button. <br />
          Confirm transaction through Metamask in order to finalise changes.
          </p>
          <NftList nftlist={mutants} imagepath="https://storage.moonapelab.io/mutants_images/thumbs" actions={MutantsStakeActions} />
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
