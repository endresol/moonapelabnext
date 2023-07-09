import React, {useState, useEffect } from 'react';

import { useWeb3Context } from '../../context';
import useMoonApeMutantContract from '../../hooks/useMoonApeMutantContract';
import { NftList } from '.';

interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export const StakeMutants: React.FC = () => {
  const { address } = useWeb3Context();
  const mutantContract = useMoonApeMutantContract();

  const [mutants, setMutants] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleStakeMutantsAction = async (nfts: number[]) => {
    console.log("stake mutants", nfts);  
  };

  const MutantsStakeActions: Action[] = [
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
        <NftList nftlist={mutants} title="My Mutants" imagepath="https://storage.moonapelab.io/mutants_images/thumbs" actions={MutantsStakeActions} />
      </>
      )}
    </>
  )
}
