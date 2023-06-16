import { BigNumber } from "ethers";


export function extractIntegers(bigNumbers: BigNumber[] | null | undefined): number[] {
  return bigNumbers.map(bigNumber => bigNumber.toNumber());
}