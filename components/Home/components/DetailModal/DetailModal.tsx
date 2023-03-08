import { FC, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from '@/config';
import { tokenHexToNumberString } from '@/utils';
import { AttributeType, NFTType } from '@/types';

interface Props {
  handleClose: () => void;
  nft: NFTType;
  network: number;
}

const DetailModal: FC<Props> = ({ handleClose, nft, network }) => {
  let currentNetwork = useMemo(() => {
    return Config.find((item) => item.network === network);
  }, [network]);
  let tokenId = nft?.tokenId ? tokenHexToNumberString(nft.tokenId) : '';
  let openseaLink = `${currentNetwork?.openseaURL}/${nft?.collectionAddress}/${tokenId}`;
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='relative mx-auto p-5 border w-[90%] md:w-[50%] shadow-lg rounded-lg bg-white mb-4 h-[90%] md:h-auto overflow-y-auto'>
        <p onClick={handleClose} className='cursor-pointer text-right'>
          ⓧ
        </p>

        <div className='text-center'>
          <div className='w-[250px] h-[250px] relative mx-auto'>
            {nft?.thumbnail ? (
              <Image
                unoptimized
                className='pb-4 rounded-xl object-contain'
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
          <h2 className='font-bold text-[24px]'>
            {nft?.title ? nft.title : 'NA'}
          </h2>
          <p>{nft?.description ? nft.description : 'NA'}</p>
          <p className='absolute top-[8px] left-[8px] bg-black text-white py-1 px-2 rounded-xl text-sm w-fit mx-auto'>
            {nft?.tokenType ? nft.tokenType : 'NA'}
          </p>
        </div>
        <div className='mt-4'>
          <p className='font-bold text-lg'>Attributes</p>
          <div className='flex items-center flex-wrap'>
            {nft?.attributes?.length ? (
              nft?.attributes.map((attribute: AttributeType) => (
                <div className='border-black border p-2 text-center rounded-xl mr-2 mb-2'>
                  <p className='text-gray-400 capitalize'>
                    {attribute?.trait_type}
                  </p>
                  <p className='capitalize font-bold'>{attribute.value}</p>
                </div>
              ))
            ) : (
              <p>NA</p>
            )}
          </div>
        </div>
        <div className='mt-4'>
          <p className='font-bold'>Owners Details</p>
          <p>
            Name: <span className='font-bold'>{nft?.owner?.name}</span>
          </p>
          <p>
            Address:{' '}
            <span className='font-bold break-words'>{nft?.owner?.address}</span>
          </p>
        </div>
        <Link href={openseaLink} passHref target={'_blank'}>
          <button className='shadow-lg hover:shadow-2xl mt-4 block mx-auto text-xl bg-black text-white px-6 py-1 rounded-2xl'>
            Buy
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetailModal;
