import type { Calendar } from '../type';

const getMonthStartDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const getMonthEndDate = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getWeekNumber = (date: string) => {
  const startDay = getMonthStartDay(
    Number(date.slice(0, 4)),
    Number(date.slice(4, 6)) - 1,
  );
  return Math.ceil((Number(date.slice(6, 8)) + startDay) / 7);
};

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
        curWeekData.push({ date: curDate });
      } else {
        curWeekData.push({ date: 0 });
      }
      curDay++;
    }
    calendar.push(curWeekData);
  }

  const now = new Date();
  if (now.getFullYear() === year && now.getMonth() === month) {
    const todayOrder = now.getDate() + startDay - 1;
    calendar[Math.floor(todayOrder / 7)][todayOrder % 7].isToday = true;
  }
  return calendar;
};

export default makeCalendar;
