import { NextPage } from "next";
import { ThinRoundedBox as RoundedBox, MALheader} from "../components/Layout";
// import { TicketBooth } from "../components/GameElements";
import { TicketBoothClosed } from "../components/GameElements";

// export async function getServerSideProps() {
//   // Determine if the booth should be open or closed based on server time
//   const isBoothOpen = process.env.TICKETBOOTH_OPEN;
//   console.log("isBoothOpen", isBoothOpen);
  
//   return {
//     props: { isBoothOpen },
//   };
// }

// interface Props {
//   isBoothOpen: boolean;
// }

const TicketBoothPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Ticket Booth" /> 
      {/* {isBoothOpen ? <TicketBooth /> : <TicketBoothClosed />} */}
      <TicketBoothClosed />
    </RoundedBox>
  )
}

export default TicketBoothPage;
