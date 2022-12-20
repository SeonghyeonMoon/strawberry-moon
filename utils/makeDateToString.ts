export const makePrevDate = (date: string): string => {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));
  const prevDate = new Date(year, month - 1, day - 1);
  return makeDateToString(prevDate);
};

export const makeNextDate = (date: string): string => {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));
  const nextData = new Date(year, month - 1, day + 1);
  return makeDateToString(nextData);
};

export const makeDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${month}${day}`;
};
