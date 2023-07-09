import React from 'react';

export function MalButton({children, onClick}) {
  return (
    <button className="malbutton mt-2 mr-4 px-10 py-2 relative uppercase bg-gray-100 bg-opacity-10 tracking-wider leading-none overflow-hidden" onClick={() => {onClick()}}>
        <span className="absolute inset-0 bg-black"></span>
        <span className="absolute inset-0 flex justify-center items-center "> 
        {children}
        </span>
        {children}
      </button>
  )
}
