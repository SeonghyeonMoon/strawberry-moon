import type { Calendar } from '../type';

const getMonthStartDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const getMonthEndDate = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const makeCalendar = (year: number, month: number): Calendar => {
  const startDay = getMonthStartDay(year, month);
  const endDate = getMonthEndDate(year, month);
  const weekNumber = Math.ceil((startDay + endDate) / 7);
  const calendar: Calendar = [];

  let curDate = 0;
  let curDay = 0;

  for (let i = 0; i < weekNumber; i++) {
    const curWeekData = [];
    for (let j = 0; j < 7; j++) {
      if (startDay <= curDay && curDate < endDate) {
        curDate++;
        curWeekData.push(curDate);
      } else {
        curWeekData.push(0);
      }
      curDay++;
    }
    calendar.push(curWeekData);
  }

  return calendar;
};

export default makeCalendar;
