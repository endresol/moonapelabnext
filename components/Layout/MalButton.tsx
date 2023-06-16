import React from 'react';

export function MalButton({children, onClickHandler}) {
  return (
    <button className="malbutton mt-2 px-10 py-2 relative uppercase bg-gray-100 bg-opacity-10 tracking-wider leading-none overflow-hidden" onClick={() => {onClickHandler()}}>
        <span className="absolute inset-0 bg-black"></span>
        <span className="absolute inset-0 flex justify-center items-center "> 
        {children}
        </span>
        {children}
      </button>
  )
}
