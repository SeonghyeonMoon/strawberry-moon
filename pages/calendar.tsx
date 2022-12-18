import { useEffect, useState } from 'react';
import makeCalendar from '../utils/makeCalendar';
import type { Calendar } from '../type';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

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
    <div className='mx-auto mt-7 flex w-1/2 flex-col'>
      <h1 className='mb-5 flex items-center justify-center gap-7 text-2xl'>
        <button onClick={moveToPrevMonth}>
          <AiOutlineLeft />
        </button>
        {date.getFullYear()}년 {date.getMonth() + 1}월
        <button onClick={moveToNextMonth}>
          <AiOutlineRight />
        </button>
      </h1>
      <table>
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <td
                key={day}
                className={`py-5 text-center font-bold 
                ${day === '토' ? 'text-blue-600' : ''} 
                ${day === '일' ? 'text-red-600' : ''}`}
              >
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData?.map((week, index) => (
            <tr key={index}>
              {week?.map(({ date, isToday }, index) => (
                <td
                  key={index}
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
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
