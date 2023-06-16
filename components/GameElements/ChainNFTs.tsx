import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const NFTCollection = ({ userAddress, collectionContractAddress }) => {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // Check if we're running in the browser or server
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
          // Connect to Ethereum network using ethers.js
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          // Filter NFTs of the specific collection
          const nftList = await getNFTsOfCollection(userAddress, collectionContractAddress, provider);
          
          setNftList(nftList);
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNFTs();
  }, [userAddress, collectionContractAddress]);

  const getNFTsOfCollection = async (userAddress, collectionContractAddress, provider) => {
    // Get the NFT contract instance
    const contract = new ethers.Contract(collectionContractAddress, NFTContractAbi, provider);

    // Get the user's NFT balance
    const userBalance = await contract.balanceOf(userAddress);

    // Filter NFTs of the specific collection
    const nftList = [];

    for (let i = 0; i < userBalance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
      const tokenContractAddress = await contract.ownerOf(tokenId);

      if (tokenContractAddress === collectionContractAddress) {
        // Add the NFT to the list
        nftList.push(tokenId.toString());
      }
    }

    return nftList;
  };

  return (
    <div>
      <h2>NFT Collection</h2>
      <ul>
        {nftList.map((tokenId) => (
          <li key={tokenId}>{tokenId}</li>
        ))}
      </ul>
    </div>
  );
};

export default NFTCollection;
