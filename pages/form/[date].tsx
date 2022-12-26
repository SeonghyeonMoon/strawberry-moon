import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import FormHeader from '../../components/form/FormHeader';
import FormTableHeader from '../../components/form/FormTableHeader';
import NumberInput from '../../components/form/NumberInput';
import Loading from '../../components/Loading';
import useCountQuery from '../../hooks/useCountQuery';
import UseFormSubmit from '../../hooks/useFormSubmit';
import usePriceQuery from '../../hooks/usePriceQuery';
import type { Grade, GradeData } from '../../type';
import 'react-toastify/dist/ReactToastify.css';

const Date = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<Grade, GradeData>>({
    special: { label: '특', price: 0, count: 0 },
    good: { label: '상', price: 0, count: 0 },
    normal: { label: '보통', price: 0, count: 0 },
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const { isLoading: isCountLoading } = useCountQuery({
    date: router.query.date as string,
    setFormData,
  });
  const { isLoading: isPriceLoading } = usePriceQuery({
    date: router.query.date as string,
    setFormData,
  });

  const { mutate } = UseFormSubmit({
    date: router.query.date as string,
    count: {
      special: formData.special.count,
      good: formData.good.count,
      normal: formData.normal.count,
    },
    price: {
      special: formData.special.price,
      good: formData.good.price,
      normal: formData.normal.price,
    },
    handleSuccess: () => {
      setIsFormChanged(false);
    },
  });

  const handleChange = (grade: Grade) => (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const onlyNumber = Number(value.replace(/[^0-9]/g, ''));

    if (onlyNumber > 9999) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [grade]: {
        ...prev[grade],
        [id]: onlyNumber,
      },
    }));
    setIsFormChanged(true);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormChanged) {
      mutate();
    }
  };

  useEffect(() => {
    setInitLoading(true);
    const timeOut = setTimeout(() => {
      setInitLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [router.query.date]);

  if (initLoading || isCountLoading || isPriceLoading) {
    return <Loading />;
  }

  return (
    <form
      className='relative flex w-full flex-col gap-2 py-8 px-4'
      onSubmit={handleSubmit}
    >
      <ToastContainer
        position='top-center'
        autoClose={500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme='light'
      />
      <FormHeader date={router.query.date} />
      <table className='mb-4'>
        <FormTableHeader />
        <tbody>
          {Object.entries(formData).map(([grade, { label, price, count }]) => (
            <tr key={grade} className='border text-left'>
              <td className='w-10 border p-2'>{label}</td>
              <td className='relative w-16 border'>
                <NumberInput
                  type='count'
                  value={count}
                  grade={grade as Grade}
                  handleChange={handleChange}
                />
              </td>
              <td className='relative w-16 border'>
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
        className='rounded bg-gray-600 p-2 text-white transition disabled:opacity-10'
      >
        등록
      </button>
      <Link
        href={'/calendar'}
        className='block rounded p-2 text-center text-gray-400'
      >
        취소
      </Link>
    </form>
  );
};

export default Date;
