import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import { extractIntegers } from '../../helpers/bignum';
import useMoonStakingContract from '../../hooks/useMoonStakingContract';
import { getPetRarityName, getPetMADexchange} from "./../../helpers";
import { MalButton } from '../Layout';

interface PetObj {
  petType: number;
  count: number;
};

export const UnstakePets: React.FC = () => {
  const { address } = useWeb3Context();
  const stakingContractS1 = useMoonStakingContract();
  
  const [myStakedPets, setStakedMyPets] = useState<PetObj[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stakingContractS1) return;
    let mounted = true;

    const getStakerNFTs = async() => {
      try {
        const s1staking = await stakingContractS1.getStakerNFT(address);
        console.log("season1 staked nfts", s1staking);

        const tempPets = extractIntegers(s1staking[3]);
        const petArray = [];

        tempPets.map((pet, index) => {
          if (pet > 0 )
            petArray.push({petType: index, count: pet});
        });
        setStakedMyPets(petArray);
       
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

  },[address, stakingContractS1]);

  return (
    <>
    <div>UnstakePets</div>
    <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      {myStakedPets && myStakedPets.map((pet) => (
        <div key={pet.petType} className={`rounded-xl overflow-hidden shadow-lg border-4 border-transparent`}>
        <div className="relative">
          <Image src={`https://storage.moonapelab.io/static/pets/thumbs/${pet.petType}.png`} alt={`Pets type ${pet.petType}: ${pet.count}`} width={150} height={150} className="w-full"/>
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-10 h-10 text-s font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 right-3 dark:border-gray-900">{pet.count}</div>               
        </div>
        <div className="font-bold text-l mb-2">{getPetRarityName(pet.petType)} Moon Pet</div>
        </div>)
      )}
    </div>
    <div>
      <MalButton onClick={() => {console.log("unstake")}}>Unstake</MalButton>
    </div>
    </>
  )
}
