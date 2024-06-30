import { NextPage } from "next";
import { RoundedBox as RoundedBox, MALheader } from "../components/Layout";
import { MaltarWinners, MaltarTickets } from "../components/GameElements";

const MaltarPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline='Welcome to the Maltar' />
      <MaltarTickets />
      <MaltarWinners />
    </RoundedBox>
  );
};

export default MaltarPage;
