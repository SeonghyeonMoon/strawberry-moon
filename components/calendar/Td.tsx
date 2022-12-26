import Link from 'next/link';
import { makeDateToString } from '../../utils/makeDateToString';

type TdProps = {
  index: number;
  dateData: Date;
  date: number;
  isToday?: boolean;
};

const Td = ({ index, dateData, date, isToday }: TdProps) => {
  if (!date) {
    return <td></td>;
  }

  const color = index === 0 ? 'red-600' : index === 6 ? 'blue-600' : 'black';

  return (
    <td className={`text-center text-${color}`}>
      <Link href={`/form/${makeDateToString(dateData, date)}`}>
        <p className='border-black p-3'>
          <span
            className={`border-b-2 ${
              isToday ? `border-b-${color} font-bold` : 'border-b-transparent'
            }`}
          >
            {date}
          </span>
        </p>
      </Link>
    </td>
  );
};

export default Td;
