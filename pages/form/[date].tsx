import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormHeader from '../../components/form/FormHeader';
import FormTableHeader from '../../components/form/FormTableHeader';
import NumberInput from '../../components/form/NumberInput';
import useCountMutate from '../../hooks/useCountMutate';
import useCountQuery from '../../hooks/useCountQuery';
import usePriceMutate from '../../hooks/usePriceMutate';
import usePriceQuery from '../../hooks/usePriceQuery';
import type { Grade, GradeData } from '../../type';

const Date = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<Grade, GradeData>>({
    special: { label: '특', price: 0, count: 0 },
    good: { label: '상', price: 0, count: 0 },
    normal: { label: '보통', price: 0, count: 0 },
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useCountQuery({ date: router.query.date as string, setFormData });
  usePriceQuery({ date: router.query.date as string, setFormData });

  const { mutatePrice } = usePriceMutate({
    date: router.query.date as string,
    special: formData.special.price,
    good: formData.good.price,
    normal: formData.normal.price,
  });

  const { mutateCount } = useCountMutate({
    date: router.query.date as string,
    special: formData.special.count,
    good: formData.good.count,
    normal: formData.normal.count,
  });

  const handleChange = (grade: Grade) => (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (Number(value) > 9999) {
      return;
    }

    setFormData({
      ...formData,
      [grade]: {
        ...formData[grade],
        [id]: Number(value.trim()),
      },
    });
    setIsFormChanged(true);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCount();
    mutatePrice();
  };

  return (
    <form
      className='flex w-full flex-col gap-2 py-8 px-4'
      onSubmit={handleSubmit}
    >
      <FormHeader date={router.query.date} />
      <table className='mb-4'>
        <FormTableHeader />
        <tbody>
          {Object.entries(formData).map(([grade, { label, price, count }]) => (
            <tr key={grade} className='border text-left'>
              <td className='w-10 border p-2'>{label}</td>
              <td className='relative w-16 border p-2'>
                <NumberInput
                  type='count'
                  value={count}
                  grade={grade as Grade}
                  handleChange={handleChange}
                />
              </td>
              <td className='relative w-16 border p-2'>
                <NumberInput
                  type='price'
                  value={price}
                  grade={grade as Grade}
                  handleChange={handleChange}
                />
              </td>
              <td className='w-24 border p-2'>
                <span>{(count * price).toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type='submit'
        disabled={!isFormChanged}
        className='rounded bg-gray-600 p-2 text-white disabled:opacity-50'
      >
        등록
      </button>
      <button type='button' className='rounded p-2 text-gray-300'>
        <Link href={'/calendar'}>취소</Link>
      </button>
    </form>
  );
};

export default Date;
