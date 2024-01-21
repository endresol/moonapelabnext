import { NextPage } from "next";
import { WideRoundedBox } from "../components/Layout";
import { MadExchangeClosed } from "../components/GameElements";
import { MadExContextProvider } from "../context";

const StakingPage: NextPage = () => {
  return (
    <WideRoundedBox>
      <MadExContextProvider>
        <MadExchangeClosed />
      </MadExContextProvider>
    </WideRoundedBox>
  );
};

export default StakingPage;
