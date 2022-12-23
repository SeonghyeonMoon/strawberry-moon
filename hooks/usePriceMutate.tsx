import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getWeekNumber } from '../utils/makeCalendar';

type UsePriceMutateProps = {
  date: string;
  special: number;
  good: number;
  normal: number;
};

const UsePriceMutate = ({
  date,
  special,
  good,
  normal,
}: UsePriceMutateProps) => {
  const { mutate: mutatePrice } = useMutation(
    ['price', date?.slice(4, 6)],
    async () => {
      return axios
        .post('/api/price', {
          month: date?.slice(0, 6),
          week: getWeekNumber(date),
          special,
          good,
          normal,
        })
        .then((res) => res.data);
    },
  );

  return { mutatePrice };
};

export default UsePriceMutate;
