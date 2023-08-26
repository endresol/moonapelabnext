import React from 'react'
import Image from "next/image";
import { getMutantRank, getMutantRewardFromId } from '../../helpers';
import { getMutantMadPrice } from '../../helpers/raritynaming';

interface NFTcardProps {
  nftid: number; // Array of image URLs
  selected: boolean;
  onClick: (nft: number) => void;
  imagepath: string;
  withPrice?: boolean | null;
  withLoot?: number | undefined;
}


export const NFTcard: React.FC<NFTcardProps> = ({nftid,  selected, onClick, imagepath, withPrice, withLoot}) => {
  // console.log("Card got loot?", withLoot);
  const aperank = getMutantRank(nftid);
  // console.log("aperank", aperank);
  
  // TODO  aperank fungerer ikke når det ikke er apes. må skille kode, evt ha logikk
  
  return (
    <>
     <div
        className={`relative cursor-pointer border-4 rounded-xl ${selected ? 'border-blue-500' : 'border-gray-400'
      }`}
      onClick={() => onClick(nftid)}
      >
        <div className="relative">
        <Image className="w-full h-auto rounded-xl" src={`${imagepath}/${nftid}.png`} width={400} height={100} alt={`Moon Ape # ${nftid}`} />
        {selected && (
          <div className="absolute top-0 right-0 mr-2 mt-2 bg-blue-500 text-white rounded-full w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
          </div>
        )}  

        {withPrice && (
          <div className="absolute bottom-0 right-0 transform rotate-[-45deg] bg-white text-black px-2 py-1">
          {getMutantMadPrice(nftid)} $MAD
        </div>  
        )}

        {!withPrice && (
          <>
            <div className="text-small">{ aperank && aperank} Moon Mutant #{nftid}</div>
            <div className="text-small">Daily reward</div>
            {/* {isSeason1 && (<div className="text-small">{getApeRewardWithLoot(aperank.type, getLootTypeNameFromIndex(withLoot)).reward} MALv1</div>) } */}
            <div className="text-small">{getMutantRewardFromId(nftid)} MALv2</div>
            </>
        )}
      </div>
      </div>
        </>
  )
}
