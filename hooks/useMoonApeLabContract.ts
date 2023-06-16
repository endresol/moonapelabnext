import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import ABI from "../abis/MALgenesis-ABI.json";

const contractAddress = process.env.NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT;

const useMALgenesisContract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, ABI, signer),
    [signer]
  );
}

export default useMALgenesisContract;