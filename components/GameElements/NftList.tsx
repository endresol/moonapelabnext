import React, { useState } from 'react';
import { NFTcard, ApeCard } from '.';
import { MalButton } from '../Layout';

interface NFTListProps {
  nftlist: number[];
  imagepath: string
  actions: Action[];
  withPrice?: boolean;
  withLoot?: number[] | undefined | null;
  isApe?: boolean;
}

interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export const NftList: React.FC<NFTListProps> = ({ nftlist, imagepath, actions, withPrice, withLoot ,isApe }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (imageId) => {
    const isSelected = selectedImages.includes(imageId);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {nftlist && nftlist.map((og, index) => {
          if (isApe) {
            return (<ApeCard nftid={og} key={og.toString()} withPrice={withPrice} withLoot={withLoot ? withLoot[index] : null} imagepath={imagepath} selected={selectedImages.includes(og) ? true : false} onClick={handleImageClick} />)
          } else {
            return (<NFTcard nftid={og} key={og.toString()} withPrice={withPrice} withLoot={withLoot ? withLoot[index] : null} imagepath={imagepath} selected={selectedImages.includes(og) ? true : false} onClick={handleImageClick} />)
          }
        })}
      </div>
      <div>
        {actions.map((action, actionIndex) => (
          <MalButton
            key={actionIndex} onClick={() => action.onClick(selectedImages)}>
              {action.label}
            </MalButton>
          ))}
      </div>
    </>
  );
};
