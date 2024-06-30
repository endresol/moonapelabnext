import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { RoundedBox as RoundedBox, MALheader } from "../components/Layout";

import { TicketBoothV2, TicketBoothClosed } from "../components/GameElements";

type MaltarMeta = {
  isOpen: boolean;
};

export const getServerSideProps = (async () => {
  const now = new Date();
  const specificTime = new Date(Date.UTC(2024, 6, 1, 0, 0, 0)); // June 30th, 23:00 UTC (note: months are 0-based)

  const isBeforeSpecificTime = now < specificTime;

  const meta: MaltarMeta = { isOpen: isBeforeSpecificTime };

  return { props: { meta } };
}) satisfies GetServerSideProps<{ meta: MaltarMeta }>;

interface Props {
  isBoothOpen: boolean;
}

function TicketBoothPage({
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RoundedBox>
      <MALheader headline='Ticket Booth' />
      {meta.isOpen ? <TicketBoothV2 /> : <TicketBoothClosed />}
    </RoundedBox>
  );
}

export default TicketBoothPage;
