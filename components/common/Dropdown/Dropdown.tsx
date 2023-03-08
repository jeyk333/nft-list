import { FC, ChangeEvent } from 'react';
import { ConfigType } from '@/config';

interface Props {
  name: string;
  value: number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  items: ConfigType[];
}

const Dropdown: FC<Props> = ({ name, onChange, value, items }) => {
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      className='border-black border-l text-lg py-3 rounded-r-3xl px-3 mr-1'
    >
      {items.map((item) => (
        <option value={item.network} key={item.title}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
