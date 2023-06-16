import { useEffect, useState } from "react";
import useMoonStakingContract from "./useMoonStakingContract";
import { useWeb3Context } from "../context";

const useMoonStaking = () => {
  const contract = useMoonStakingContract();
  const { address } = useWeb3Context();
  const [stakedApes, setStakedApes] = useState<string | null | undefined>(null);
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!contract) return;
    let mounted = true;

    const getStakedApes = async() => {
      try {
        const response = await contract.getStakerNFT(address);
        console.log("getStakedApes", response);
        
        setStakedApes(response);
      } catch (err) {
        console.error("getStakedApes", err);
      }
    };

    if (mounted) {
      getStakedApes().then(() => { setIsLoading(false)});      
    }

    return () => {
      mounted = false;
    }

  },[contract,address]);

  return { stakedApes, isLoading };
}

export default useMoonStaking;
