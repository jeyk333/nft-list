import { FC, useState } from 'react';
import Image from 'next/image';
import DetailModal from '../DetailModal';
import { NFTType } from '@/types';
import NFTCard from '../NFTCard';

interface Props {
  nfts: NFTType[];
  network: number;
  contractError: boolean;
  isLoading: boolean;
}

const NFTsContainer: FC<Props> = ({
  nfts,
  network,
  contractError,
  isLoading,
}) => {
  const [selectedNFT, setSelectedNFT] = useState<NFTType | null>(null);

  const handleClose = () => {
    setSelectedNFT(null);
  };

  return (
    <div className='mt-16'>
      <div className='mx-auto place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {!contractError && nfts.length
          ? nfts.map((nft: NFTType) => (
              <NFTCard
                nft={nft}
                setSelectedNFT={setSelectedNFT}
                key={nft?.tokenId}
              />
            ))
          : null}
      </div>

      {!isLoading && contractError ? (
        <div className='text-center'>
          <p className='text-lg font-bold'>
            <span className='text-yellow-500'>⚠️</span> The entered collection
            address does not have any NFTs.
          </p>
          <p className='text-lg text-yellow-500 text-center'>
            If you think, we are wrong. Please check the following points and
            try again,
          </p>
          <ol>
            <li>
              1. Please check the entered collection address is correct or
              incorrect
            </li>
            <li>
              2. Please check the selected chain network belong to the entered
              collection address{' '}
            </li>
          </ol>
        </div>
      ) : null}

      {!nfts.length && !contractError && !isLoading ? (
        <>
          <p className='text-center text-xl'> Hello there!</p>
          <p className='text-center text-xl'>
            Ready to buy some NFTs!!!
            <br />
            Enter a NFT Collection address{' '}
            <span className='text-gray-400'>→</span> Select Network{' '}
            <span className='text-gray-400'>→</span> Click Show NFTs{' '}
            <span className='text-gray-400'>→</span> Check and Buy it.
          </p>
          <p className='text-center text-lg font-bold'>
            Note: Currently we support only Ethereum and Polygon network
          </p>
        </>
      ) : null}
      {selectedNFT && (
        <DetailModal
          handleClose={handleClose}
          nft={selectedNFT}
          network={network}
        />
      )}
    </div>
  );
};

export default NFTsContainer;
