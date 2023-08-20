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
      { id: "madexchange", shape: "circle", coords: [780, 230, 80]},
      { id: "staking", shape: "circle", coords: [450, 520, 75] },
      { id: "ticketbooth", shape: "circle", coords: [595, 335, 60] },
      { id: "maltar", shape: "circle", coords: [595, 140, 75] },
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
