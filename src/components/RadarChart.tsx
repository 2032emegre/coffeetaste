import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Radar } from 'react-chartjs-2';

// roast_tasting型に合わせる
export type RoastTasting = {
    acidity: number;
    sweetness: number;
  bitterness: number;
    body: number;
  aftertaste: number;
    balance: number;
  overall: number;
  notes?: string;
};

type RadarChartProps = {
  tasting: RoastTasting;
  mode?: 'roast' | 'espresso' | 'handdrip';
};

export default function RadarChart({ tasting, mode }: RadarChartProps) {
  // roast_tastingの主要項目のみ
  const labels = [
    '酸味',
    '甘味',
    '苦味',
    'ボディ',
    '後味',
    'バランス',
    '総合',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'テイスティング',
        data: [
          tasting.acidity,
          tasting.sweetness,
          tasting.bitterness,
          tasting.body,
          tasting.aftertaste,
          tasting.balance,
          tasting.overall,
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };
  const options = {
    scale: {
      ticks: { min: 0, max: 5, stepSize: 1 },
    },
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
  return <Radar data={data} options={options} />;
} 