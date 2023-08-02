import React, { useState } from "react";
import { useRouter } from "next/router";

import { ImageMap, Area } from '@qiuz/react-image-map';

export function GameMap () {
  type AreaComp = Area & {
    page: string;
  }

  const router = useRouter();

  const mapArea: AreaComp[] = [
    {
      left: '32%',
      top: '16%',
      width: '16%',
      height: '15%',
      onMouseOver: () => console.log('map onMouseOver bank'),
      page: "/bank",
    },
    {
      left: '36%',
      top: '48%',
      width: '16%',
      height: '15%',
      onMouseOver: () => console.log('map onMouseOver stake'),
      page: "/staking"
    },
    {
      left: '70%',
      top: '16%',
      width: '16%',
      height: '15%',
      onMouseOver: () => console.log('map onMouseOver stake'),
      page: "/madexchange"
    },
    {
      left: '50%',
      top: '36%',
      width: '16%',
      height: '15%',
      onMouseOver: () => console.log('map onMouseOver stake'),
      page: "/ticketbooth"
    }

  ];

  const onMapClick = (area, index) => {
    const tip = `click map${index + 1}`;
    console.log(tip, area.page);
    router.push(area.page);
  }
  return (
    <>
      <div className=" ">
        <ImageMap
          className="usage-map"
          src="/game/map2.png"
          map={mapArea}
          onMapClick={onMapClick}
          />
      </div>
    </>
  )

}