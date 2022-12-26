import type { ChangeEvent } from 'react';
import type { Grade } from '../../type';

type NumberInputProps = {
  type: 'price' | 'count';
  value: number;
  grade: Grade;
  handleChange(grade: Grade): (e: ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({
  type,
  value,
  grade,
  handleChange,
}: NumberInputProps) => {
  return (
    <input
      type='text'
      className='h-full w-full p-2 outline-gray-600'
      id={type}
      autoComplete='off'
      value={value}
      onChange={handleChange(grade)}
    />
  );
};

export default NumberInput;
