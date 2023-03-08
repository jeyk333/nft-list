import axios from 'axios';

export const getNFTs = async (
  address: string,
  url: string | undefined,
  token: string
) => {
  return await axios.get(
    `${url}?contractAddress=${address}&withMetadata=true&limit=10&startToken=${token}`
  );
};
