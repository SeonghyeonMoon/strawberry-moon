import { useEffect, useState } from 'react';
import makeCalendar from '../utils/makeCalendar';
import type { Calendar } from '../type';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Calendar>();

  useEffect(() => {
    setCalendarData(makeCalendar(date.getFullYear(), date.getMonth()));
  }, [date]);

  return (
    <div>
      <h1>
        {date.getFullYear()}년 {date.getMonth() + 1}월
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
