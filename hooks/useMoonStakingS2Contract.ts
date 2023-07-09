import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import MoonStakingS2ABI from "../abis/MoonStakingS2.json";

const contractAddress = process.env.NEXT_PUBLIC_MOONSTAKING_S2_CONTRACT;

const useMoonStakingS2Contract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, MoonStakingS2ABI, signer),
    [signer]
  );
}

export default useMoonStakingS2Contract;
