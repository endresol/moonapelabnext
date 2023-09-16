import React, { useContext } from 'react'
import { MALheader } from '../Layout';
import { BurnPets } from './BurnPets';
import { BurnLoot } from './BurnLoot';
import { SellMutants } from './SellMutants';
import MadExContext from '../../context/MadExContext';

export function MadExchange() {
  const madExCtx = useContext(MadExContext);

  return (
    <>
      <MALheader headline="Mad Exchange" />
      <div>
        <p>The Mad Exchage is the place to get your hands on some $MAD, but you have to akt now as the Mad Exchange has a limited amount of $MAD available, and when they are gone, they are gone.</p>
        <p>There are currently three ways to get your hands on $MAD:</p>
        <ul>
          <li>1. Burn your pets</li>
          <li>2. Burn your loot</li>
          <li>3. Sell your mutants</li>
        </ul>
        Currently there are {madExCtx.madBalance} $MAD available.
      </div>

      <BurnPets />
      <BurnLoot />
      <SellMutants />
    </>
  )
}
