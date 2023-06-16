import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from '../context';

import ABI from "../abis/MALv1-ERC20-ABI.json";

const contractAddress = process.env.NEXT_PUBLIC_MAL_ERC_20_CONTRACT;

const useMALerc20Contract = () => {
  const { signer  } = useWeb3Context();

  return useMemo(
    () => signer && new Contract(contractAddress, ABI, signer),
    [signer]
  );
}

export default useMALerc20Contract;