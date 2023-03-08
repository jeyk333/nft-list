import { FC, ChangeEvent } from 'react';

interface Props {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<Props> = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className='w-full px-5 text-xl py-3 rounded-l-3xl'
      onChange={onChange}
      value={value}
    />
  );
};

export default TextField;
