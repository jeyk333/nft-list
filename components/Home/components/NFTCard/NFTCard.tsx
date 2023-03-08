import { FC } from 'react';
import Image from 'next/image';
import { NFTType } from '@/types';

interface Props {
  nft: NFTType;
  setSelectedNFT: (nft: NFTType) => void;
}

const NFTCard: FC<Props> = ({ nft, setSelectedNFT }) => {
  return (
    <div
      className='border-black border pt-4 pb-2 cursor-pointer shadow hover:shadow-2xl rounded-xl'
      onClick={nft?.tokenId === '0x00' ? () => {} : () => setSelectedNFT(nft)}
    >
      <div className='w-[250px] h-[250px] relative'>
        {nft?.thumbnail ? (
          <Image
            unoptimized
            className='mx-4 pb-4 rounded-xl object-contain'
            src={nft?.thumbnail}
            alt='thumbnail'
            fill
          />
        ) : (
          <div className='flex items-center justify-center h-[250px] w-[284px]'>
            <h2>Not Available</h2>
          </div>
        )}
      </div>
      <div className='border-black border-t px-4 pt-2 text-center'>
        <p className='text-lg font-bold truncate w-[250px]'>
          {nft?.title ? nft.title : 'NA'}
        </p>
        <p className='bg-black text-white py-1 px-2 rounded-xl text-sm w-fit mx-auto'>
          {nft?.tokenType ? nft.tokenType : 'NA'}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
