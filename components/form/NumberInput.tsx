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
    <>
      <label htmlFor={type} className='absolute left-2 top-2 z-10'>
        {value.toLocaleString()}
      </label>
      <input
        type='number'
        className='absolute inset-0 border-b-2 border-gray-600 text-transparent opacity-0 outline-0 transition-all focus:opacity-100'
        id={type}
        autoComplete='off'
        value={value}
        onChange={handleChange(grade)}
      />
    </>
  );
};

export default NumberInput;
