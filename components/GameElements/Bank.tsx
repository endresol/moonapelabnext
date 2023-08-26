import React, { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";

import { useWeb3Context } from "../../context";
import useMoonStakingContract from "../../hooks/useMoonStakingContract";
import useMoonStakingS2Contract from "../../hooks/useMoonStakingS2Contract";
import useMALerc20Contract from "../../hooks/useMalV1Contract";
import useMADTokenContract from "../../hooks/useMADTokenContract";
import { LoadingScreen } from "../Layout";

export function Bank() {
  const { address } = useWeb3Context();
  const moonStakingContract = useMoonStakingContract();
  const moonStakingContractS2 = useMoonStakingS2Contract();
  const malErc20Contract = useMALerc20Contract();
  const madTokenContract = useMADTokenContract();

  const [dailyYield, setDailyYield] = useState<BigNumberish | null | undefined>(null);
  const [malv1Balance, setMalv1Balance] = useState<BigNumberish | null | undefined>(null);
  const [dailyMalV2Yield, setDailyMalV2Yield] = useState<BigNumberish | null | undefined>(null);
  const [malv2Balance, setMalv2Balance]= useState<BigNumberish | null | undefined>(null);
  const [madBalance, setMadBalance] =  useState<BigNumberish | null | undefined>(null);

  const [ isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!moonStakingContract  || !moonStakingContractS2 || !malErc20Contract || !madTokenContract) return;
    let mounted = true;

    const getStakerYield = async() => {
      try {
        const malv1yield = await moonStakingContract.getStakerYield(address);
        console.log("getStgetStakerYieldakedApes", malv1yield);
        setDailyYield(malv1yield);

        const malv2yield = await moonStakingContractS2.getStakerYield(address);
        setDailyMalV2Yield(malv2yield);

        const malv2Bal = await moonStakingContractS2.getAccumulatedAmount(address);
        setMalv2Balance(malv2Bal);

        const malv1Bal = await malErc20Contract.getUserBalance(address);
        setMalv1Balance(malv1Bal);

        const madBal = await madTokenContract.balanceOf(address);
        setMadBalance(madBal);

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

  },[address, moonStakingContract, moonStakingContractS2, malErc20Contract, madTokenContract])
  
  return (
      <>
      {isLoading && <LoadingScreen height="h-36"/> }
      {!isLoading && (      
        <div className="mt-10 mb-10">
          {/* <div className="flex flex-row">
            <div className="basis-1/2">Total Daily MALv1 reward: </div>
            <div className="basis-1/2">{dailyYield ? Math.floor(+ethers.utils.formatEther(dailyYield)) : "loading"} </div>
          </div>
          <div className="flex flex-row mb-5">
            <div className="basis-1/2">MALv1 Balance:</div>
            <div className="basis-1/2"> {malv1Balance ? Math.floor(+ethers.utils.formatEther(malv1Balance)) : "loading"} </div>
          </div> */}
          <div className="flex flex-row">
            <div className="basis-1/2">Total Daily MALv2 reward: </div>
            <div className="basis-1/2">{dailyMalV2Yield ? Math.floor(+ethers.utils.formatEther(dailyMalV2Yield)) : "loading"} </div>
          </div>
          <div className="flex flex-row mb-5">
            <div className="basis-1/2">MALv2 Balance: </div>
            <div className="basis-1/2">{malv2Balance ? Math.floor(+ethers.utils.formatEther(malv2Balance)) : "loading"} </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/2">MAD Balance: </div>
            <div className="basis-1/2">{madBalance ? ethers.utils.formatEther(madBalance) : "loading"} </div>
          </div>
        </div>
    )}    
    </>
  )
}