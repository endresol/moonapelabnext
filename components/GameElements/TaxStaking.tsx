import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useWeb3Context } from "../../context";
import useTaxStakingContract from "../../hooks/useTaxStakingContract";

export function TaxStaking() {
  const { address } = useWeb3Context();
  const taxStakingContract = useTaxStakingContract();

  const [stakedNFTs, setStakedNFTs] = useState<[BigNumber[], BigNumber[],BigNumber[]] | null | undefined>(null);
  const [stakedPasses, setStakedPasses] = useState<[BigNumber] | null | undefined>(null);
  const [stakedPassTypes, setStakedPassTypes] = useState<[BigNumber] | null | undefined>(null);
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  const calculatePercent = (passes: BigNumber[]) => {
    let sum = 0;
    for ( let i = 0; i < passes.length; i++) {
      switch (passes[i].toNumber()) { 
        case 1: { 
          sum += 0.25;
          break;
        }
        case 5: {
          sum += 0.123;
          break;
        }
        case 10: {
          sum += 0.246;
          break;
        }
      };
    };
    return sum;
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
    <div className="mt-10 mb-10">
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">Moon Treasuries: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[0].length : "loading"} </div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">Moon Treasuries daily reward: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[0].length * 200 : "loading"} </div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">Total Treasuries Tax Claim %: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[0].length * 0.1 : "loading"} %</div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">Staked Passes: </div>
        <div className="basis-1/2">{stakedNFTs ? stakedNFTs[1].length : "loading"} </div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">Staked Passes percent: </div>
        <div className="basis-1/2">{stakedNFTs ? calculatePercent(stakedNFTs[2]) : "loading"} % </div>
      </div>
    </div>
  )
}
