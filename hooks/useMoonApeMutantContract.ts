import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import ABI from "../abis/Mutant-ABI.json";

const contractAddress = process.env.NEXT_PUBLIC_BREEDING_CONTRACT;

const useMoonApeMutantContract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, ABI, signer),
    [signer]
  );
}

export default useMoonApeMutantContract;