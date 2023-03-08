import { FC, ChangeEvent, MouseEvent } from 'react';
import TextField from '@/components/common/TextField';
import Dropdown from '@/components/common/Dropdown';
import { Config } from '@/config';
import { validateAddressField } from '@/utils';

interface Props {
  address: string;
  network: number;
  placeholder?: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  isSubmitted: boolean;
  isLoading: boolean;
}

const Form: FC<Props> = ({
  handleInputChange,
  handleSelectChange,
  address,
  network,
  isSubmitted,
  handleSubmit,
  isLoading,
}) => {
  let isError = isSubmitted && validateAddressField(address);
  return (
    <form>
      <div
        className={`flex items-center rounded-3xl ${
          isError ? 'border-red-400' : 'border-black'
        } border`}
      >
        <TextField
          name={'address'}
          placeholder='Enter a NFT collection address'
          onChange={handleInputChange}
          value={address}
        />
        <Dropdown
          name={'network'}
          placeholder='Select Network'
          onChange={handleSelectChange}
          value={network}
          items={Config}
        />
      </div>
      {isError && (
        <p className='text-md text-red-400 text-center'>
          {validateAddressField(address)}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className='bg-black text-white rounded-3xl py-2 px-4 mx-auto block text-xl mt-4 w-64 hover:shadow-xl'
      >
        {isLoading ? 'Loading...' : 'Show NFTs'}
      </button>
    </form>
  );
};

export default Form;
