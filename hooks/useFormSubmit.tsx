import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getWeekNumber } from '../utils/makeCalendar';

type UseFormSubmitProps = {
  date: string;
  count: { special: number; good: number; normal: number };
  price: { special: number; good: number; normal: number };
  handleSuccess?: () => void;
  handleError?: () => void;
};

const UseFormSubmit = ({
  date,
  count,
  price,
  handleSuccess,
  handleError,
}: UseFormSubmitProps) => {
  const { mutate } = useMutation(
    ['form', date?.slice(4, 6)],
    async () =>
      Promise.all([
        axios.post('/api/count', {
          date,
          ...count,
        }),
        axios.post('/api/price', {
          month: date?.slice(0, 6),
          week: getWeekNumber(date),
          ...price,
        }),
      ]),
    {
      onSuccess: () => {
        toast.success('등록되었습니다.');
        handleSuccess?.();
      },
      onError: () => {
        // TODO: toast error 에러 해결
        setTimeout(() => {
          toast.error('등록에 실패했습니다. 다시 시도해주세요.');
        }, 0);
        handleError?.();
      },
    },
  );
  return { mutate };
};

export default UseFormSubmit;
