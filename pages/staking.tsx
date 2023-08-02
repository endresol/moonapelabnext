import { NextPage } from "next";
import { MALheader, WideRoundedBox as RoundedBox } from "../components/Layout";

import { StakingS1S2 } from "../components/GameElements";

const StakingPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Moon Staking" />
      <div className="text-center">
      To make sure you do not lose any MAL v1 or v2 please CLAIM before you do any unstaking
      </div>
      <StakingS1S2 />
    </RoundedBox>
  )
}

export default StakingPage;
