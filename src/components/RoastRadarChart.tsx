import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export type RoastRadarChartProps = {
  acidity: number;
  sweetness: number;
  body: number;
  strength: number;
  uniformity: number;
  balance: number;
  cleanness: number;
};

const LABELS = [
  '酸味',
  '甘み',
  'ボディ',
  '濃さ',
  '均一性',
  'バランス',
  'カップの綺麗さ',
];

export default function RoastRadarChart(props: RoastRadarChartProps) {
  const data = {
    labels: LABELS,
    datasets: [
      {
        label: '味わい評価',
        data: [
          props.acidity,
          props.sweetness,
          props.body,
          props.strength,
          props.uniformity,
          props.balance,
          props.cleanness,
        ],
        backgroundColor: 'rgba(31, 41, 55, 0.2)',
        borderColor: 'rgba(31, 41, 55, 1)',
        pointBackgroundColor: 'rgba(31, 41, 55, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(31, 41, 55, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    elements: {
      line: { borderWidth: 2, borderColor: 'black' },
      point: { radius: 6, backgroundColor: 'black', borderColor: '#fff' },
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        pointLabels: {
          font: { size: 12, weight: 'bold' },
          color: '#111',
          padding: 0,
        },
        angleLines: { color: '#bbb' },
        grid: { color: '#bbb' },
        ticks: {
          display: false,
        },
      },
    },
  } as const;

  return (
    <div style={{ width: 280, height: 280 }}>
      <Radar
        data={{
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderColor: 'black',
              pointBackgroundColor: 'black',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'black',
              borderWidth: 2,
              pointRadius: 6,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
} 