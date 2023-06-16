import React, { useState } from 'react';
import { useRouter } from 'next/router';
 
import ImageMapper from 'react-img-mapper';

export const GameMap2: React.FC = () => {

  const router = useRouter();

  const handlerMapClick = (area) => {
    console.log("area", area);
    router.push(`/${area}`);
    
  }
  const gamemap = {
    name: "MoonApeLabMap",
    areas: [
      { id: "bank", shape: "circle", coords: [400, 240, 75]},
      { id: "madexchange", shape: "circle", coords: [750, 240, 85]},
      { id: "staking", shape: "circle", coords: [450, 520, 75] },
    ]
  };

  return (
    <div className="center">
      <ImageMapper
        src="/game/map2.png"
        map={gamemap}
        width={1000}
        onClick={(area) => handlerMapClick(area.id)}
        
      />
    </div>
  );
};
