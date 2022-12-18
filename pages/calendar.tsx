import { useEffect, useState } from 'react';
import makeCalendar from '../utils/makeCalendar';
import type { Calendar } from '../type';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Calendar>();

  const moveToPrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const moveToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  useEffect(() => {
    setCalendarData(makeCalendar(date.getFullYear(), date.getMonth()));
  }, [date]);

  return (
    <div>
      <h1 className='mb-5 flex items-center gap-2 text-2xl'>
        <button onClick={moveToPrevMonth}>
          <AiFillCaretLeft />
        </button>
        {date.getFullYear()}년 {date.getMonth() + 1}월
        <button onClick={moveToNextMonth}>
          <AiFillCaretRight />
        </button>
      </h1>
      <table>
        <thead>
          <tr>
            <td>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td>토</td>
          </tr>
        </thead>
        <tbody>
          {calendarData?.map((week, index) => (
            <tr key={index}>
              {week?.map((date, index) => (
                <td key={index}>{date ? <span>{date}</span> : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
