import { ChangeEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import useCountMutate from '../../hooks/useCountMutate';
import useCountQuery from '../../hooks/useCountQuery';
import usePriceMutate from '../../hooks/usePriceMutate';
import usePriceQuery from '../../hooks/usePriceQuery';
import { makeNextDate, makePrevDate } from '../../utils/makeDateToString';
import type { Grade, GradeData } from '../../type';

const Date = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<Grade, GradeData>>({
    special: { label: '특', price: 0, count: 0 },
    good: { label: '상', price: 0, count: 0 },
    normal: { label: '보통', price: 0, count: 0 },
  });

  useCountQuery({ date: router.query.date as string, setFormData });
  usePriceQuery({ date: router.query.date as string, setFormData });

  const prevDate = useMemo(
    () => router.query.date && makePrevDate(router.query.date as string),
    [router.query.date],
  );

  const nextDate = useMemo(
    () => router.query.date && makeNextDate(router.query.date as string),
    [router.query.date],
  );

  const { mutatePrice } = usePriceMutate({
    date: router.query.date as string,
    special: formData.special.count,
    good: formData.good.count,
    normal: formData.normal.count,
  });

  const { mutateCount } = useCountMutate({
    date: router.query.date as string,
    special: formData.special.price,
    good: formData.good.price,
    normal: formData.normal.price,
  });

  const handleChange = (grade: Grade) => (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const onlyNumber = Number(value.replace(/[^0-9]/g, ''));

    if (onlyNumber > 9999) {
      return;
    }

    setFormData({
      ...formData,
      [grade]: {
        ...formData[grade],
        [id]: onlyNumber,
      },
    });
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
      <h1 className='mb-8 flex items-center justify-center justify-between gap-7 text-2xl'>
        <button>
          <Link href={`/form/${prevDate}`}>
            <AiOutlineLeft />
          </Link>
        </button>
        {router.query.date?.slice(0, 4)}년 {router.query.date?.slice(4, 6)}월{' '}
        {router.query.date?.slice(6)}일
        <button>
          <Link href={`/form/${nextDate}`}>
            <AiOutlineRight />
          </Link>
        </button>
      </h1>
      <table className='mb-4'>
        <thead>
          <tr className='p-2 text-left'>
            <th className='border p-2'>등급</th>
            <th className='border p-2'>수량(개)</th>
            <th className='border p-2'>단가(원)</th>
            <th className='border p-2'>판매금액(원)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(formData).map(([grade, { label, price, count }]) => (
            <tr key={grade} className='border text-left'>
              <td className='w-10 border p-2'>{label}</td>
              <td className='relative w-16 border p-2'>
                <label htmlFor='count' className='absolute'>
                  {count.toLocaleString()}
                </label>
                <input
                  type='text'
                  className='w-full opacity-0 '
                  id='count'
                  autoComplete='off'
                  value={count}
                  onChange={handleChange(grade as Grade)}
                />
              </td>
              <td className='relative w-16 border p-2'>
                <label htmlFor='price' className='absolute'>
                  {price.toLocaleString()}
                </label>
                <input
                  type='text'
                  className='w-full opacity-0'
                  id='price'
                  autoComplete='off'
                  value={price}
                  onChange={handleChange(grade as Grade)}
                />
              </td>
              <td className='w-24 border p-2'>
                <span>{(count * price).toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type='submit' className='rounded bg-gray-300 p-2 text-white'>
        등록
      </button>
      <button type='button' className='rounded p-2 text-gray-300'>
        <Link href={'/calendar'}>취소</Link>
      </button>
    </form>
  );
};

export default Date;
