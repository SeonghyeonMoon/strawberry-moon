import { useEffect, useState } from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { CalendarHeader, Days, Td } from '../components/calendar';
import Loading from '../components/Loading';
import MonthCountChart from '../components/MonthCountChart';
import useSwipe from '../hooks/useSwipe';
import makeCalendar from '../utils/makeCalendar';
import type { Calendar } from '../type';

Chart.register(CategoryScale);

const Calendar = () => {
  const [dateData, setDateData] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Calendar>();
  const [initLoading, setInitLoading] = useState(true);

  const moveToPrevMonth = () => {
    setDateData(new Date(dateData.getFullYear(), dateData.getMonth() - 1));
  };

  const moveToNextMonth = () => {
    setDateData(new Date(dateData.getFullYear(), dateData.getMonth() + 1));
  };

  useSwipe({
    handleSwipeRight: moveToPrevMonth,
    handleSwipeLeft: moveToNextMonth,
  });

  useEffect(() => {
    setCalendarData(makeCalendar(dateData.getFullYear(), dateData.getMonth()));
  }, [dateData]);

  useEffect(() => {
    setInitLoading(true);
    const timeOut = setTimeout(() => {
      setInitLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dateData]);

  if (initLoading) {
    return <Loading />;
  }

  return (
    <div className='mx-auto mt-5 flex w-full flex-col p-5'>
      <CalendarHeader
        date={dateData}
        moveToPrevMonth={moveToPrevMonth}
        moveToNextMonth={moveToNextMonth}
      />
      <table className='mb-8'>
        <Days />
        <tbody>
          {calendarData?.map((week, index) => (
            <tr key={index}>
              {week?.map(({ date, isToday }, index) => (
                <Td
                  key={index}
                  index={index}
                  dateData={dateData}
                  date={date}
                  isToday={isToday}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <MonthCountChart
        date={`${dateData.getFullYear()}${dateData.getMonth() + 1}`}
      />
    </div>
  );
};

export default Calendar;
