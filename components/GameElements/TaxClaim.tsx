import React, { useEffect, useState } from 'react'
import { BigNumberish, ethers } from "ethers";

import { useWeb3Context } from "../../context";
import useTaxStakingContract from '../../hooks/useTaxStakingContract';

import { MalButton, SectionLoading } from '../Layout/';

type Props = {}

export const TaxClaim: React.FC = ({}: Props) => {
  const { address } = useWeb3Context();
  const taxStakingContract = useTaxStakingContract();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taxToClaim, setTaxToClaim] = useState<BigNumberish | null>(0);

  const claimClickHandler = async () => {
    console.log("clicked");
  };

  const handleClaimAction = async () => {
    
    console.log("lets claim tax and reward");
    
    const transaction = await taxStakingContract.claimTaxAndReward();
    console.log(transaction);

    await transaction.wait();

    console.log(transaction);
    
  };

  useEffect(() => {
    if (!taxStakingContract) return;

    let mounted = true;

    const getTax = async () => {
      const taxNotClaimed = await taxStakingContract.getTotalClaimableAmount(address);
      console.log("tax to claim", taxNotClaimed);
      setTaxToClaim(taxNotClaimed);
    }

    if (mounted) {
      getTax().then(() => {setIsLoading(false)});
    }
  }, [taxStakingContract, address])
  

  return (
    <>
       {isLoading && <SectionLoading /> }
       {!isLoading && (  
      <>
        <h3>CLAIM TAX & TREASURY REWARD</h3>
        <div>Here you can claim rewards accumulated from Tax distribution and from Treasury daily reward.</div>
        <div>Claimable MAL: {taxToClaim ? Math.floor(+ethers.utils.formatEther(taxToClaim)) : "0"} </div>
        <MalButton onClick={handleClaimAction}>
          Click
        </MalButton>

      </>
       )}
    </>
  )
}