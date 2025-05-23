import React from 'react';
import ReactECharts from 'echarts-for-react';

type RadarChartProps = {
  tasting: {
    acidity: number;
    sweetness: number;
    richness: number;
    body: number;
    balance: number;
    cleanliness: number;
    aftertaste: number;
  };
  mode?: 'crema' | 'espresso-taste' | 'default';
};

const RadarChart: React.FC<RadarChartProps> = ({ tasting, mode = 'default' }) => {
  let indicator;
  let value;
  if (mode === 'crema') {
    indicator = [
      { name: '色', max: 5 },
      { name: '厚み', max: 5 },
      { name: '持続性', max: 5 },
    ];
    value = [tasting.acidity, tasting.sweetness, tasting.richness];
  } else if (mode === 'espresso-taste') {
    indicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: 'コク', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: 'バランス', max: 5 },
      { name: 'クリーン度', max: 5 },
      { name: '余韻', max: 5 },
    ];
    value = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste,
    ];
  } else {
    indicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: '濃厚さ', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: 'バランス', max: 5 },
      { name: 'クリーン度', max: 5 },
      { name: '余韻', max: 5 },
    ];
    value = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste,
    ];
  }

  const option = {
    tooltip: {},
    radar: {
      indicator,
      radius: 60,
      name: {
        fontSize: 12,
        color: '#111',
        fontWeight: 'bold',
        padding: [0, 0, 0, 0],
      },
      splitLine: { lineStyle: { color: '#bbb' } },
      splitArea: { areaStyle: { color: ['#fff', '#f9f9f9'] } },
      axisLine: { lineStyle: { color: '#bbb' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value,
            areaStyle: { color: 'rgba(0,0,0,0.1)' },
            lineStyle: { color: 'black', width: 2 },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: 'black' },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280, width: 280 }} />;
};

export default RadarChart; 