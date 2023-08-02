// component for unstaking apes using the moonStakingContractS1

import { useEffect, useState } from "react"; 
import { useWeb3Context } from "../../context";
import useMoonStakingContract from '../../hooks/useMoonStakingContract';
import useMoonStakingS2Contract from '../../hooks/useMoonStakingS2Contract';
import { extractIntegers } from "../../helpers/bignum";

import { ApeCard } from ".";
import { removeDuplicateApes } from "../../helpers/nfts";
import { MalButton } from "../Layout";

export const UnstakeApesS1: React.FC = () => {
  const { address } = useWeb3Context();
  const moonStakingContract = useMoonStakingContract();
  const moonStakingContractS2 = useMoonStakingS2Contract();

  const [stakedApes, setStakedApes] = useState<number[] | null>(null);
  const [stakedLoot, setStakedLoot] = useState<number[] | null>(null);
  const [apesToUnstake, setApesToUnstake] = useState<number[]>([]);
  const [lootToUnstake, setLootToUnstake] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // unstake all apes dersom ingen er valgt (sjekk om vi ønsker dette)
  // sjekk for approved
  // warning om claim om det ikke er gjort før unstake.

  // fjern kode fra stakingS1S2 som ikke er relevant lengre etter at denne er feature complete.

  const handleImageClick = (imageId) => {
    const isSelected = apesToUnstake.includes(imageId);
    if (isSelected) {
      setApesToUnstake(apesToUnstake.filter((id) => id !== imageId));
    } else {
      setApesToUnstake([...apesToUnstake, imageId]);
    }
  };

  // BUTTON ACTIONS
  const handleUnstakeAction = async () => {
    if (!apesToUnstake || apesToUnstake.length <= 0) {
      alert("no apes selected");
      return;
    };
    console.log("got apes and start unstaking");
    
    const transaction = await moonStakingContract.unstake721(process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT, apesToUnstake);
    console.log("transaction started:", transaction);
    
    await transaction.wait();
    console.log(transaction);
  };

  const handleUnstakeLootAction = async () => {
    console.log("start unstaking loot");
    const transaction = await moonStakingContract.removeLootFromStakedApes(lootToUnstake);
    console.log("transaction started:", transaction);
    await transaction.wait();
    console.log(transaction);  
  };

  const handleClaimAction = async () => {
    console.log("start claim");
    const transaction = await moonStakingContractS2.updateAccumulatedAmount(address);
    console.log("transaction started:", transaction);
    await transaction.wait();
    console.log(transaction);
  };

  const isAnyItemSelected = apesToUnstake.length > 0;
  const isLootSelected =
      (apesToUnstake.length > 0 &&
        apesToUnstake.every((item) => stakedLoot[item - 1] !== 0));


  useEffect(() => {
    if (!moonStakingContract) return;
    let mounted = true;

    const getStakerNFTs = async() => {
      try {
        const s1staking = await moonStakingContract.getStakerNFT(address);
        console.log("season1 new module staked nfts", s1staking);
        setStakedApes(extractIntegers(s1staking[0]));
        setStakedLoot(extractIntegers(s1staking[1]));
      
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

  },[address, moonStakingContract]);

  return (  
    <div className="mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-4">My Staked Moon Apes - Season 1</h2>
      <h3 className="text-xl mb-4">Staked before 23rd December 2022</h3>
      <p className="mb-4">Click ”UNSTAKE ALL”/”UNSTAKE SELECTED” in order to unstake all/selected Apes (if an Ape is staked with Loot, the Loot will also be unstaked).<br />
        Click ”REMOVE SELECTED LOOT”/”REMOVE ALL LOOT” in order to remove Loot from selected/all staked Apes (the selected Apes will remain staked).<br />
        Click ”CLAIM” to make sure no MALv2 are lost if you unstake any Genesis Moon Apes from the old contract.<br />
        Confirm the transaction through Metamask in order to finalise changes.<br />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {stakedApes && stakedApes.map((og, index) => (
          <ApeCard isSeason1={true} nftid={og} key={og.toString()} withLoot={stakedLoot[index]} imagepath="https://storage.moonapelab.io/static/moonapes/thumbs" selected={apesToUnstake.includes(og) ? true : false} onClick={handleImageClick} />
        ))}
      </div>
      <div>
          <MalButton
            onClick={() => handleUnstakeAction()}
            isDisabled={false}
          >
             Unstake {isAnyItemSelected ? "selected" : "all"} 
            </MalButton>
            <MalButton
            onClick={() => handleUnstakeLootAction()}
            isDisabled={isAnyItemSelected && !isLootSelected}
          >
             Remove {isLootSelected ? "selected" : "all"} loot
            </MalButton>
            <MalButton
            onClick={() => handleClaimAction()}
            isDisabled={false}
          >
             Claim MALv2
            </MalButton>
          </div>
    </div>
  );
} 

export default UnstakeApesS1;
