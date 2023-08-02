import { NextPage } from "next";
import { ThinRoundedBox as RoundedBox, MALheader} from "../components/Layout";
import { TicketBooth } from "../components/GameElements";

const TicketBoothPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Ticket Booth" /> 
      <TicketBooth />   
    </RoundedBox>
  )
}

export default TicketBoothPage;
