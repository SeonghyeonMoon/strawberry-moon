type TdProps = {
  index: number;
  date: number;
  isToday?: boolean;
};

const Td = ({ index, date, isToday }: TdProps) => {
  return (
    <td
      className={`py-5 text-center 
                  ${index === 0 ? 'text-red-600' : ''} 
                  ${index === 6 ? 'text-blue-600' : ''}`}
    >
      {date ? (
        isToday ? (
          <span
            className={`border-b-2 border-black font-bold
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
    </td>
  );
};

export default Td;
