import React from 'react';
import Image from 'next/image';

export function MALheader({headline}) {
  return (
    <>
      <div className="flex justify-center">
        <Image src="/MAL_LOGO.svg" width="75" height="75" alt={"MoonApeLab logo"} />
      </div>
      <div className="flex justify-center">
        <h2 className="b-2 mt-0 text-5xl font-medium leading-tight text-primary uppercase">{headline}</h2>
      </div>
    </>
  )
}
