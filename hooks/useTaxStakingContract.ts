import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import TaxStakingABI from "../abis/TaxStaking-ABI.json";

const contractAddress = process.env.NEXT_PUBLIC_TAXSTAKING_CONTRACT;

const useTaxStakingContract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, TaxStakingABI, signer),
    [signer]
  );
}

export default useTaxStakingContract;
