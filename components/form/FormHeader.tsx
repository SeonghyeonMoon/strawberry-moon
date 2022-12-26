import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import useSwipe from '../../hooks/useSwipe';
import { makeNextDate, makePrevDate } from '../../utils/makeDateToString';

type FormHeaderProps = {
  date: string | string[] | undefined;
};

const FormHeader = ({ date }: FormHeaderProps) => {
  const router = useRouter();
  const prevDate = useMemo(() => date && makePrevDate(date as string), [date]);
  const nextDate = useMemo(() => date && makeNextDate(date as string), [date]);

  useSwipe({
    handleSwipeRight: () => router.push(`/form/${prevDate}`),
    handleSwipeLeft: () => router.push(`/form/${nextDate}`),
  });

  return (
    <h1 className='mb-8 flex items-center justify-center justify-between gap-7 text-2xl'>
      <button>
        <Link href={`/form/${prevDate}`}>
          <AiOutlineLeft />
        </Link>
      </button>
      {date?.slice(0, 4)}년 {date?.slice(4, 6)}월 {date?.slice(6)}일
      <button>
        <Link href={`/form/${nextDate}`}>
          <AiOutlineRight />
        </Link>
      </button>
    </h1>
  );
};

export default FormHeader;
