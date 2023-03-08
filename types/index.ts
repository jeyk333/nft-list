//Alchemy API NFT data type
export interface AlchemyNFTType {
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  title: string;
  description: string;
  media: { thumbnail: string }[];
  metadata: {
    attributes: AttributeType[];
  };
  contractMetadata: {
    name: string;
    contractDeployer: string;
  };
  contract: { address: string };
}

// Destructured NFT data type
export interface NFTType {
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  thumbnail: string;
  attributes: AttributeType[];
  owner: {
    name: string;
    address: string;
  };
  collectionAddress: string;
}

export interface AttributeType {
  value: string;
  trait_type: string;
}
