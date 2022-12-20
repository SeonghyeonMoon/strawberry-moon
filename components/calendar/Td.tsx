import Link from 'next/link';

type TdProps = {
  index: number;
  dateData: Date;
  date: number;
  isToday?: boolean;
};

const Td = ({ index, dateData, date, isToday }: TdProps) => {
  return (
    <td
      className={`
        py-5 text-center 
        ${index === 0 ? 'text-red-600' : ''} 
        ${index === 6 ? 'text-blue-600' : ''}`}
    >
      <Link
        href={`/form/${dateData.getFullYear()}${
          dateData.getMonth() + 1
        }${date}`}
      >
        {date ? (
          isToday ? (
            <span
              className={`
              border-b-2 border-black font-bold
              ${index === 0 ? 'border-red-600' : ''} 
              ${index === 6 ? 'border-blue-600' : ''}`}
            >
              {date}
            </span>
          ) : (
            <span>{date}</span>
          )
        ) : (
          ''
        )}
      </Link>
    </td>
  );
};

export default Td;
