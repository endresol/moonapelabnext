import React from 'react';

interface SpinningSVGProps {
  svgFileName: string;
}

export const SpinningSVG: React.FC<SpinningSVGProps> = ({ svgFileName }) => {
  return (
    <div className="flex items-center justify-center w-24 h-24">
      <svg
        className="w-full h-full animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <use xlinkHref={`/${svgFileName}#Layer_1`} />
      </svg>
    </div>
  );
};