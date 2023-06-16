import { NextPage } from "next";
import { ThinRoundedBox as RoundedBox, MALheader} from "../components/Layout";

import { Bank, TaxStaking, TaxClaim } from "../components/GameElements";

const BankPage: NextPage = () => {
  return (
    <RoundedBox>
      <MALheader headline="Bank" />
      <Bank />
      <hr />
      <TaxStaking />
      <hr />
      <TaxClaim />
    </RoundedBox>
  )
}

export default BankPage;
