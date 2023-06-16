import { NextPage } from "next";
import { MALheader, WideRoundedBox as RoundedBox } from "../components/Layout";

import { StakingS1S2 } from "../components/GameElements";

const StakingPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Moon Staking" /> 
      <StakingS1S2 />
    </RoundedBox>
  )
}

export default StakingPage;
