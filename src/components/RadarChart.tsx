import React from 'react';
import ReactECharts from 'echarts-for-react';

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

// エスプレッソ・ハンドドリップ用の型
export type EspressoHanddripTasting = {
  acidity: number;
  sweetness: number;
  richness: number;
  body: number;
  balance: number;
  cleanliness: number;
  aftertaste: number;
  totalScore?: number;
};

type RadarChartProps = {
  tasting: RoastTasting | EspressoHanddripTasting;
  mode?: 'roast' | 'espresso' | 'handdrip' | 'crema' | 'espresso-taste';
};

export default function RadarChart({ tasting, mode }: RadarChartProps) {
  let indicator: { name: string; max: number }[] = [];
  let value: number[] = [];

  if (mode === 'roast' || 'bitterness' in tasting) {
    // ロースト用
    indicator = [
      { name: '酸味', max: 5 },
      { name: '甘味', max: 5 },
      { name: '苦味', max: 5 },
      { name: 'ボディ', max: 5 },
      { name: '後味', max: 5 },
      { name: 'バランス', max: 5 },
      { name: '総合', max: 5 },
    ];
    value = [
      tasting.acidity,
      tasting.sweetness,
      (tasting as RoastTasting).bitterness,
      tasting.body,
      tasting.aftertaste,
      tasting.balance,
      (tasting as RoastTasting).overall,
    ];
  } else if (mode === 'crema') {
    // クレマ用（エスプレッソ）
    indicator = [
      { name: '色', max: 5 },
      { name: '厚み', max: 5 },
      { name: '持続性', max: 5 },
    ];
    value = [
      tasting.acidity, // color
      tasting.sweetness, // thickness
      tasting.richness, // persistence
    ];
  } else {
    // エスプレッソ・ハンドドリップ用
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
    radar: {
      indicator,
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#999', width: 1 } },
      splitLine: { lineStyle: { color: '#ddd', width: 1 } },
    },
    series: [{
      type: 'radar',
      data: [{
        value,
        name: '評価',
        areaStyle: { color: 'rgba(0,0,0,0.1)' },
        lineStyle: { color: '#000', width: 2 },
        itemStyle: { color: '#000' },
      }],
    }],
    tooltip: { show: false },
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
} 