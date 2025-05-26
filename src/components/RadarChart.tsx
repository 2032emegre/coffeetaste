import React from 'react';
import ReactECharts from 'echarts-for-react';

type Indicator = { name: string; max: number };

export type RadarChartProps = {
  // 新しい柔軟な呼び出し方
  indicator?: Indicator[];
  value?: number[];
  // 従来の呼び出し方（後方互換）
  tasting: {
    acidity: number;
    sweetness: number;
    richness: number;
    body: number;
    balance: number;
    cleanliness: number;
    aftertaste: number;
    bitterness?: number;
    clarity?: number;
    strength?: number;
    uniformity?: number;
    cleanness?: number;
  };
  mode?: 'default' | 'crema' | 'espresso-taste' | 'roast' | 'shop';
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

const getRadarOption = (tasting: RadarChartProps['tasting'], mode: RadarChartProps['mode'] = 'default') => {
  let usedIndicator: Indicator[];
  let usedValue: number[];

  if (mode === 'crema') {
    usedIndicator = [
      { name: '色', max: 5 },
      { name: '厚み', max: 5 },
      { name: '持続性', max: 5 },
      { name: '', max: 5 },
      { name: '', max: 5 },
      { name: '', max: 5 },
      { name: '', max: 5 },
    ];
    usedValue = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      0,
      0,
      0,
      0,
    ];
  } else if (mode === 'espresso-taste') {
    usedIndicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: 'コク', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: 'バランス', max: 5 },
      { name: 'クリーン', max: 5 },
      { name: '余韻', max: 5 },
    ];
    usedValue = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste,
    ];
  } else if (mode === 'roast') {
    usedIndicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: 'コク', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: 'バランス', max: 5 },
      { name: 'クリーン', max: 5 },
      { name: '余韻', max: 5 },
    ];
    usedValue = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste,
    ];
  } else if (mode === 'shop') {
    usedIndicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: 'コク', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: 'バランス', max: 5 },
      { name: 'クリーン', max: 5 },
      { name: '余韻', max: 5 },
    ];
    usedValue = [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste,
    ];
  } else {
    usedIndicator = DEFAULT_INDICATOR;
    usedValue = [
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

  return option;
};

const RadarChart: React.FC<RadarChartProps> = ({ indicator, value, tasting, mode = 'default' }) => {
  const option = getRadarOption(tasting, mode);

  return <ReactECharts option={option} style={{ height: 280, width: 280 }} />;
};

export default RadarChart; 