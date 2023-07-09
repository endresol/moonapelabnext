import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useWeb3Context } from "../../context";
import { extractIntegers } from '../../helpers/bignum';
import useMoonPetsContract from '../../hooks/useMoonPetsContract';
import useMADExchangeContract from '../../hooks/useMADExchangeContract';
import { getPetRarityName, getPetMADexchange} from "./../../helpers";
import { MalButton } from '../Layout';

export const BurnPets: React.FC = () => {
  const { address } = useWeb3Context();
  const moonPetsContract = useMoonPetsContract();
  const madExchangeContract = useMADExchangeContract();
  
  const [myPets, setMyPets] = useState<number[] | null>(null);
  const [burnCounter, setBurnCounter] = useState<number[]>([0,0,0,0,0,0,0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalMAD, setTotalMAD] = useState<number>(0);

 
  const handleBurnClick = async () => {
    console.log("BURN");
    const petsArray = [];
    const numberArray = [];

    if (totalMAD <= 0) {
      console.log("no pets selected");
      return;
    };

    burnCounter.map((pet, index) => {
      if (pet > 0) {
        petsArray.push(index);
        numberArray.push(pet);
      }
    })

    console.log("got pet and start burning");
    
    const transaction = await madExchangeContract.burnPetForMad(petsArray, numberArray);
    console.log("transaction started:", transaction);
    
    await transaction.wait();

    console.log(transaction);
    
  };

  const handleIncrementClick =(index) => {
    console.log("adding for", index);
    const nextCounters = burnCounter.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        if (c < myPets[index]) {
          setTotalMAD(totalMAD + getPetMADexchange(index));
          return c + 1;  
        }
        else {
          return c;
        }
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setBurnCounter(nextCounters);
    console.log("after", burnCounter);
  }

  const handleDecrementClick = (index) => {
    console.log("adding for", index);
    const nextCounters = burnCounter.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        if (c > 0) {
          setTotalMAD(totalMAD - getPetMADexchange(index));
          return c - 1;
        } else  {
          return 0;
        }
        
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setBurnCounter(nextCounters);
    console.log("after", burnCounter);
  }

  useEffect(() => {
    if (!moonPetsContract) return;

    let mounted = true;

    const getPets = async () => {
      try {
        const allPets = await moonPetsContract.balanceOfBatch(Array(8).fill(address), [0,1,2,3,4,5,6,7]);
        console.log("my pets:", extractIntegers(allPets));
        setMyPets(extractIntegers(allPets));
      } catch (err) {
        console.log("get pets", err);
      };
    };

    if (mounted) {
      getPets().then(() => {setIsLoading(false)});
    }

    return () => {
      mounted = false;
    }

  },[address, moonPetsContract]);

  return (
    <>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
      <>
        <div>Burn Pets</div>
        <div className="relative p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {myPets && myPets.map((pet, index) => (
          <div key={index} className={`rounded-xl overflow-hidden shadow-lg border-4 ${burnCounter[index] > 0 ? ("border-white") : ("border-black")}`}>
          <div className="relative">
            <Image src={`https://storage.moonapelab.io/static/pets/thumbs/${index}.png`} alt={`Pets type ${index}: ${pet}`} width={150} height={150} className="w-full"/>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-10 h-10 text-s font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 right-3 dark:border-gray-900">{pet}</div>
            <div className="absolute bottom-5 right-0 transform rotate-[-45deg] bg-white text-black px-2 py-1">
              { getPetMADexchange(index)} $MAD
            </div>          
          </div>
          <div className="font-bold text-l mb-2">{getPetRarityName(index)} Moon Pet</div>
          
          <div> 
            <div>
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button onClick={() => {handleDecrementClick(index);}}  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <div className="text-center w-full font-semibold text-md text-white">Burn {burnCounter[index]}</div>
                <button onClick={() => {handleIncrementClick(index);}} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>   
          </div>
          </div>
        ))}
        </div>
        <div>
          <MalButton onClick={handleBurnClick}>Burn pet for {totalMAD} MAD </MalButton>
        </div>
      </>
      )}
    </>

  )
};
