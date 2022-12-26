import type { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getWeekNumber } from '../utils/makeCalendar';
import type { Grade, GradeData } from '../type';

type UsePriceQueryProps = {
  date: string;
  setFormData: Dispatch<SetStateAction<Record<Grade, GradeData>>>;
};

const usePriceQuery = ({ date, setFormData }: UsePriceQueryProps) => {
  const { isLoading } = useQuery(
    ['price', date],
    () =>
      axios
        .get('/api/price', {
          params: {
            month: date?.slice(0, 6),
            week: getWeekNumber(date),
          },
        })
        .then((res) => res.data),
    {
      enabled: !!date,
      onSuccess: (data) => {
        setFormData((prevState) => ({
          special: {
            ...prevState.special,
            price: data.special,
          },
          good: { ...prevState.good, price: data.good },
          normal: {
            ...prevState.normal,
            price: data.normal,
          },
        }));
      },
      onError: () => {
        setFormData((prevState) => ({
          special: {
            ...prevState.special,
            price: 0,
          },
          good: { ...prevState.good, price: 0 },
          normal: {
            ...prevState.normal,
            price: 0,
          },
        }));
      },
      retry: false,
    },
  );
  return { isLoading };
};

export default usePriceQuery;
