import { NextPage } from "next";
import { ThinRoundedBox as RoundedBox, MALheader} from "../components/Layout";
import { TicketBooth } from "../components/GameElements";
import { TicketBoothClosed } from "../components/GameElements";

export async function getServerSideProps() {
  // Get the current server time
  const serverTime = new Date();

  // Define the UTC time at which the booth should close (20:00)
  const closingTimeUTC = new Date();
  closingTimeUTC.setUTCHours(19, 0, 0, 0);

  // Determine if the booth should be open or closed based on server time
  const isBoothOpen = serverTime < closingTimeUTC;

  return {
    props: { isBoothOpen },
  };
}

interface Props {
  isBoothOpen: boolean;
}


const TicketBoothPage: NextPage<Props> = ({ isBoothOpen }) => {
  return (
    <RoundedBox>
      <MALheader headline="Ticket Booth" /> 
      {isBoothOpen ? <TicketBooth /> : <TicketBoothClosed />}
    </RoundedBox>
  )
}

export default TicketBoothPage;
