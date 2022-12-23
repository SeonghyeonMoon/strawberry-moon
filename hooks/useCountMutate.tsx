import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type UseCountMutateProps = {
  date: string;
  special: number;
  good: number;
  normal: number;
};

const UseCountMutate = ({
  date,
  special,
  good,
  normal,
}: UseCountMutateProps) => {
  const { mutate: mutateCount } = useMutation(
    ['count', date?.slice(4, 6)],
    async () => {
      return axios
        .post('/api/count', {
          date,
          special,
          good,
          normal,
        })
        .then((res) => res.data);
    },
  );

  return { mutateCount };
};

export default UseCountMutate;
