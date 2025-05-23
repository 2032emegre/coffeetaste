import React from 'react';
import ReactECharts from 'echarts-for-react';

type Indicator = { name: string; max: number };

type RadarChartProps = {
  // 新しい柔軟な呼び出し方
  indicator?: Indicator[];
  value?: number[];
  // 従来の呼び出し方（後方互換）
  tasting?: {
    acidity: number;
    sweetness: number;
    richness?: number;
    body: number;
    balance: number;
    cleanliness?: number;
    aftertaste?: number;
  };
  mode?: 'crema' | 'espresso-taste' | 'default';
};

const DEFAULT_INDICATOR = [
  { name: '酸味', max: 5 },
  { name: '甘味', max: 5 },
  { name: '濃厚さ', max: 5 },
  { name: 'ボディ', max: 5 },
  { name: 'バランス', max: 5 },
  { name: 'クリーン度', max: 5 },
  { name: '余韻', max: 5 },
];

const RadarChart: React.FC<RadarChartProps> = ({ indicator, value, tasting, mode = 'default' }) => {
  let usedIndicator: Indicator[];
  let usedValue: number[];

  if (indicator && value) {
    usedIndicator = indicator;
    usedValue = value;
  } else if (tasting) {
    if (mode === 'crema') {
      usedIndicator = [
        { name: '色', max: 5 },
        { name: '厚み', max: 5 },
        { name: '持続性', max: 5 },
      ];
      usedValue = [tasting.acidity, tasting.sweetness, tasting.richness ?? 0];
    } else if (mode === 'espresso-taste') {
      usedIndicator = [
        { name: '酸味', max: 5 },
        { name: '甘味', max: 5 },
        { name: 'コク', max: 5 },
        { name: 'ボディ', max: 5 },
        { name: 'バランス', max: 5 },
        { name: 'クリーン度', max: 5 },
        { name: '余韻', max: 5 },
      ];
      usedValue = [
        tasting.acidity,
        tasting.sweetness,
        tasting.richness ?? 0,
        tasting.body,
        tasting.balance,
        tasting.cleanliness ?? 0,
        tasting.aftertaste ?? 0,
      ];
    } else {
      usedIndicator = DEFAULT_INDICATOR;
      usedValue = [
        tasting.acidity,
        tasting.sweetness,
        tasting.richness ?? 0,
        tasting.body,
        tasting.balance,
        tasting.cleanliness ?? 0,
        tasting.aftertaste ?? 0,
      ];
    }
  } else {
    usedIndicator = DEFAULT_INDICATOR;
    usedValue = [0, 0, 0, 0, 0, 0, 0];
  }

  const option = {
    tooltip: {},
    radar: {
      indicator: usedIndicator,
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
            value: usedValue,
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