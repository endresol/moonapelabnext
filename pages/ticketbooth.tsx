import { NextPage } from "next";
import { RoundedBox as RoundedBox, MALheader } from "../components/Layout";

import { TicketBoothV2, TicketBoothClosed } from "../components/GameElements";

export async function getServerSideProps() {
  const isBoothOpen = process.env.TICKETBOOTH_OPEN;

  return {
    props: { isBoothOpen },
  };
}

interface Props {
  isBoothOpen: boolean;
}

const TicketBoothPage: NextPage = () => {
  const isBoothOpen = true; // Add a placeholder value for isBoothOpen

  return (
    <RoundedBox>
      <MALheader headline='Ticket Booth' />
      {isBoothOpen ? <TicketBoothV2 /> : <TicketBoothClosed />}
    </RoundedBox>
  );
};

export default TicketBoothPage;
