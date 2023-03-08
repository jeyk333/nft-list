import Web3 from 'web3';

export const validateContractAddress = (address: string) => {
  return Web3.utils.isAddress(address);
};

export const tokenHexToNumberString = (value: string) => {
  return Web3.utils.hexToNumberString(value);
};

export const validateAddressField = (address: string) => {
  if (!address) {
    return 'Address is required';
  } else if (!validateContractAddress(address)) {
    return 'Please enter a valid address';
  }
  return;
};
