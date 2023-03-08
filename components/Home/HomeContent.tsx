import { FC, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { validateContractAddress } from '@/utils';
import { getNFTs } from '@/services';
import Form from '@/components/Home/components/Form';
import { Config } from '@/config';
import NFTsContainer from '@/components/Home/components/NFTsContainer';
import { NFTType, AlchemyNFTType } from '@/types';

const HomeContent: FC = () => {
  const [address, setAddress] = useState<string>('');
  const [network, setNetwork] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNFTs] = useState<NFTType[]>([]);
  const [contractError, setContractError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextToken, setNextToken] = useState<string>('');

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [nfts]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setNetwork(Number(e.target.value));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsSubmitted(true);
    fetchNFTs(true);
  };

  const fetchNFTs = (newCall: boolean, token: string = ''): void => {
    let url: string | undefined = Config.find(
      (item) => item.network === network
    )?.url;
    if (validateContractAddress(address) && url) {
      setIsLoading(true);
      getNFTs(address, url, token)
        .then((resp) => {
          if (resp?.data?.nfts?.length) {
            if (resp.data?.nextToken) {
              setHasMore(true);
              setNextToken(resp.data.nextToken);
            } else {
              setHasMore(false);
              setNextToken('');
            }
            // Restructuring API NFT response
            let data = resp?.data?.nfts?.length
              ? resp.data.nfts.map((nft: AlchemyNFTType) => {
                  return {
                    tokenId: nft?.id?.tokenId,
                    tokenType: nft?.id?.tokenMetadata?.tokenType,
                    title: nft?.title,
                    description: nft?.description,
                    thumbnail: nft?.media?.[0]?.thumbnail,
                    attributes: nft?.metadata?.attributes,
                    owner: {
                      name: nft?.contractMetadata?.name,
                      address: nft?.contractMetadata?.contractDeployer,
                    },
                    collectionAddress: nft?.contract?.address,
                  };
                })
              : [];
            if (newCall) {
              setNFTs([...data]);
            } else {
              setNFTs([...nfts, ...data]);
            }
            setContractError(false);
            setIsSubmitted(false);
          } else {
            setNFTs([]);
            setContractError(true);
            setIsSubmitted(false);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setContractError(true);
          setNFTs([]);
          setIsLoading(false);
        });
    }
  };

  // To fecth new data on scroll
  const onScroll = (): void => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchNFTs(false, nextToken);
    }
  };

  return (
    <div>
      <div className='mt-6 w-6/6 md:w-3/6 mx-auto'>
        <Form
          handleInputChange={handleInputChange}
          address={address}
          handleSelectChange={handleSelectChange}
          network={network}
          handleSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          isLoading={isLoading}
        />
      </div>
      <div className='my-6'>
        <NFTsContainer
          nfts={nfts}
          network={network}
          contractError={contractError}
          isLoading={isLoading}
        />
        {isLoading ? (
          <p className='text-center text-lg mt-4'>Getting NFTs...</p>
        ) : null}
        {!contractError && !hasMore && !isLoading && nfts.length ? (
          <p className='text-center text-lg mt-6'>
            No more NFTs. You have reached the end !!!
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default HomeContent;
