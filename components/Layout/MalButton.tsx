import React from 'react';

export function MalButton({children, onClick, isDisabled=false}) {
  return (
    <button 
      disabled={isDisabled} 
      className={`text-white malbutton mt-2 mr-4 px-10 py-2 relative uppercase bg-gray-100 bg-opacity-10 tracking-wider leading-none overflow-hidden 
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      `} 
      onClick={() => {onClick()}}
    >
        <span className="absolute inset-0 bg-black"></span>
        <span className="absolute inset-0 flex justify-center items-center "> 
        {children}
        </span>
        {children}
      </button>
  )
}
