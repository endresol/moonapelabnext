import { NextPage } from "next";
import { MALheader, WideRoundedBox as RoundedBox } from "../components/Layout";

import { StakingS1S2 } from "../components/GameElements";

const StakingPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Moon Staking" />
      <div className="text-center">
        MAL coins v1 or v2 no longer have any value the the Moon Ape ecosystem.
        There for there is no need to claim any MAL coins before unstaking.
      </div>
      <StakingS1S2 />
    </RoundedBox>
  );
};

export default StakingPage;
