import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import ABI from "../abis/MadExchange-ABI.json";

const contractAddress = process.env.NEXT_PUBLIC_MAD_EXCHANGE_CONTRACT;

const useMADExchangeContract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, ABI, signer),
    [signer]
  );
}

export default useMADExchangeContract;