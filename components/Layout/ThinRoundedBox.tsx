import React from 'react';
import Link from 'next/link';

export function ThinRoundedBox({children}) {
  return (
    <div className="">
      <div className="flex justify-center text-white">
        <div className="w-2/5 bg-black rounded-lg border-2 border-white p-10 mt-4 relative">
          <Link className="absolute top-1 right-2" href="/">&#x2715;</Link>
          {children}
        </div>
      </div>
    </div>
  )
}
