import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

type CalendarHeaderProps = {
  date: Date;
  moveToPrevMonth(): void;
  moveToNextMonth(): void;
};

const CalendarHeader = ({
  date,
  moveToPrevMonth,
  moveToNextMonth,
}: CalendarHeaderProps) => {
  return (
    <h1 className='mb-5 flex items-center justify-center gap-7 text-2xl'>
      <button onClick={moveToPrevMonth}>
        <AiOutlineLeft />
      </button>
      {date.getFullYear()}년 {date.getMonth() + 1}월
      <button onClick={moveToNextMonth}>
        <AiOutlineRight />
      </button>
    </h1>
  );
};

export default CalendarHeader;
