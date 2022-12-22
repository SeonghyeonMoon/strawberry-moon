import type { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Grade, GradeData } from '../type';

type UseCountQueryProps = {
  date: string;
  setFormData: Dispatch<SetStateAction<Record<Grade, GradeData>>>;
};

const useCountQuery = ({ date, setFormData }: UseCountQueryProps) => {
  useQuery(
    ['count', date],
    () =>
      axios
        .get(`http://localhost:3000/api/count?date=${date}`)
        .then((res) => res.data),
    {
      enabled: !!date,
      onSuccess: (data) => {
        setFormData((prevState) => ({
          special: {
            ...prevState.special,
            count: data.special,
          },
          good: { ...prevState.good, count: data.good },
          normal: {
            ...prevState.normal,
            count: data.normal,
          },
        }));
      },
      onError: () => {
        setFormData((prevState) => ({
          special: { ...prevState.special, count: 0 },
          good: { ...prevState.good, count: 0 },
          normal: { ...prevState.normal, count: 0 },
        }));
      },
      retry: false,
    },
  );
};

export default useCountQuery;
