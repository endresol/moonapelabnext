import { NextPage } from "next";
import { WideRoundedBox } from "../components/Layout";
import { MadExchange } from "../components/GameElements";
import { MadExContextProvider } from "../context";

const StakingPage: NextPage = () => {
  return (
    <WideRoundedBox>
      <MadExContextProvider>
        <MadExchange />
      </MadExContextProvider>
    </WideRoundedBox>
  )
}

export default StakingPage;
