import React, { useState } from 'react';
import { getLootType } from '../../helpers/raritynaming';
import { NFTcard } from './NFTcard';
import { MalButton } from '../Layout';

interface NFTListProps {
  nftlist: number[]; // Array of image URLs
  title: string;
  imagepath: string
  actions: Action[];
  withPrice?: boolean;
  withLoot?: number[] | undefined | null;
}

interface Action {
  label: string; // Label for the action
  onClick: (nfts: number[]) => void; // Callback function for the action
}

export const NftList: React.FC<NFTListProps> = ({ nftlist, title, imagepath, actions, withPrice, withLoot }) => {
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
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {nftlist && nftlist.map((og, index) => (
          <NFTcard nftid={og} key={og.toString()} withPrice={withPrice} withLoot={withLoot ? withLoot[index] : null} imagepath={imagepath} selected={selectedImages.includes(og) ? true : false} onClick={handleImageClick} />
        ))}
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
