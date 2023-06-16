import React from 'react'
import { MALheader } from '../Layout';
import { BurnPets } from './BurnPets';
import { BurnLoot } from './BurnLoot';
import { SellMutants } from './SellMutants';

export function MadExchange() {
  return (
    <>
      <MALheader headline="MadExchange" />
      <BurnPets />
      <BurnLoot />
      <SellMutants />
    </>
  )
}
