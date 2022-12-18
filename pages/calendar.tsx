import { useEffect, useState } from 'react';
import makeCalendar from '../utils/makeCalendar';
import type { Calendar } from '../type';
import { CalendarHeader, Days, Td } from '../components/calendar';

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
      <CalendarHeader
        date={date}
        moveToPrevMonth={moveToPrevMonth}
        moveToNextMonth={moveToNextMonth}
      />
      <table>
        <Days />
        <tbody>
          {calendarData?.map((week, index) => (
            <tr key={index}>
              {week?.map(({ date, isToday }, index) => (
                <Td key={index} index={index} date={date} isToday={isToday} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
