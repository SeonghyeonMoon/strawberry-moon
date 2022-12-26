type NumberInputProps = {
  value: number;
  handleChange: () => void;
};

const NumberInput = ({ value, handleChange }: NumberInputProps) => {
  return (
    <>
      <label htmlFor='price' className='absolute left-2 top-2 z-10'>
        {value.toLocaleString()}
      </label>
      <input
        type='number'
        className='absolute inset-0 border-b-2 border-gray-600 text-transparent opacity-0 outline-0 transition-all focus:opacity-100'
        id='price'
        autoComplete='off'
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default NumberInput;
