import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

type MonthCountChartProps = {
  date: string;
};

const MonthCountChart = ({ date }: MonthCountChartProps) => {
  const lastDate = new Date(
    Number(date.slice(0, 4)),
    Number(date.slice(4, 6)),
    0,
  ).getDate();

  const [statisticsData, setStatisticsData] = useState<
    { special: number; good: number; normal: number }[]
  >(
    Array.from({ length: lastDate }, () => ({
      special: 0,
      good: 0,
      normal: 0,
    })),
  );

  useQuery(
    ['count', date],
    () => axios.get(`/api/count?month=${date}`).then((res) => res.data),
    {
      onSuccess: (data) => {
        const newData = Array.from({ length: lastDate }, () => ({
          special: 0,
          good: 0,
          normal: 0,
        }));

        data.forEach(
          (date: {
            date: string;
            special: number;
            good: number;
            normal: number;
          }) => {
            newData[Number(date.date.slice(6, 8)) - 1] = date;
          },
        );
        setStatisticsData(newData);
      },
      onError: () => {
        setStatisticsData([]);
      },
      retry: false,
      enabled: !!date,
    },
  );

  return (
    <Line
      data={{
        labels: Array.from({ length: lastDate }, (_, i) => i + 1),
        datasets: [
          {
            label: '특',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: statisticsData.map((d) => d.special),
          },
          {
            label: '상',
            backgroundColor: 'royalblue',
            borderColor: 'royalblue',
            data: statisticsData.map((d) => d.good),
          },
          {
            label: '보통',
            backgroundColor: 'coral',
            borderColor: 'coral',
            data: statisticsData.map((d) => d.normal),
          },
        ],
      }}
    />
  );
};

export default MonthCountChart;
