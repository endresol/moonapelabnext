import React, { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { useWeb3Context } from "../../context";
import useTaxStakingContract from "../../hooks/useTaxStakingContract";

export function TaxStaking() {
  const { address } = useWeb3Context();
  const taxStakingContract = useTaxStakingContract();

  const [stakedNFTs, setStakedNFTs] = useState<[BigNumberish[], BigNumberish[],BigNumberish[]] | null | undefined>(null);
  const [stakedPasses, setStakedPasses] = useState<[BigNumberish] | null | undefined>(null);
  const [stakedPassTypes, setStakedPassTypes] = useState<[BigNumberish] | null | undefined>(null);
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  const calculatePercent = (passes: BigNumberish[]) => {
    console.log(passes);
    return passes.length;
    
  };

  useEffect(() => {
     if (!taxStakingContract) return;

    let mounted = true;

    const getStakerYield = async() => {
      try {   
          const stakednfts = await taxStakingContract.getStakerNFT(address);
          setStakedNFTs(stakednfts);
       } catch (err) {
        console.error("getStakerYield", err);
      }
    };

    if (mounted) {
      getStakerYield().then(() => { setIsLoading(false)});      
    }

    return () => {
      mounted = false;
    }
  },[address, taxStakingContract])

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/2">Moon Treasuries: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[0].length : "loading"} </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2">Moon Treasuries precent: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[0].length : "loading"} </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2">Staked Passes: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[1].length : "loading"} </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2">Staked Passes percent: </div>
        <div className="basis-1/2">{stakedNFTs ? calculatePercent(stakedNFTs[2]) : "loading"} </div>
      </div>
    </>
  )
}
