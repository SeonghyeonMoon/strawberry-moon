type date = {
  date: number;
  isToday?: boolean;
};

export type Calendar = date[][];

export type Grade = 'special' | 'good' | 'normal';
export type GradeData = { label: string; price: number; count: number };
