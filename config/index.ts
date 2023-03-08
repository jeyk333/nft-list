export interface ConfigType {
  network: number;
  title: string;
  url: string;
  openseaURL: string;
}

export const Config: ConfigType[] = [
  {
    network: 1,
    title: 'Ethereum',
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ETH_KEY}/getNFTsForCollection`,
    openseaURL: `https://opensea.io/assets/ethereum`,
  },
  {
    network: 137,
    title: 'Polygon',
    url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_KEY}/getNFTsForCollection`,
    openseaURL: `https://opensea.io/assets/matic`,
  },
];
