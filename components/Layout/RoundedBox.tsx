import React from 'react';
import Link from 'next/link';

export function RoundedBox({children}) {
  return (
    <div className="">
      <div className="flex justify-center text-white">
        <div className="w-3/5 bg-gray-900 rounded-lg border-2 border-white p-10 mt-4 relative">
          <Link className="absolute top-1 right-2" href="/">&#x2715;</Link>
          {children}
        </div>
      </div>
    </div>
  )
}
