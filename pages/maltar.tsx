import { NextPage } from "next";
import { RoundedBox as RoundedBox, MALheader} from "../components/Layout";
import { MaltarWinners } from "../components/GameElements";

const MaltarPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Welcome to the Maltar" /> 
      <MaltarWinners />
    </RoundedBox>
  )
}

export default MaltarPage;
