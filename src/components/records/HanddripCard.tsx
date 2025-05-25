import React from 'react';
import { TastingRecord } from '@/types/tasting';
import ReactECharts from 'echarts-for-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type Props = {
  record: Partial<TastingRecord>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDetail?: (id: string) => void;
};

const HanddripCard: React.FC<Props> = ({ record, onEdit, onDelete, onDetail }) => {
  // データが存在しない場合の表示用ヘルパー関数
  const displayValue = (value: any, unit: string = '') => {
    if (value === undefined || value === null || value === '') return '-';
    return `${value}${unit}`;
  };

  const radarOption = {
    radar: {
      indicator: [
        { name: '酸味', max: 5 },
        { name: '濃厚さ', max: 5 },
        { name: 'バランス', max: 5 },
        { name: '余韻', max: 5 },
        { name: '甘み', max: 5 },
        { name: 'ボディ', max: 5 },
        { name: 'クリーン度', max: 5 },
      ],
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          width: 1
        }
      },
      splitLine: {
        lineStyle: {
          color: '#ddd',
          width: 1
        }
      }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [
          record.tasting?.acidity || 0,
          record.tasting?.richness || 0,
          record.tasting?.balance || 0,
          record.tasting?.aftertaste || 0,
          record.tasting?.sweetness || 0,
          record.tasting?.body || 0,
          record.tasting?.cleanliness || 0,
        ],
        name: '評価',
        areaStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        lineStyle: {
          color: '#000',
          width: 2
        },
        itemStyle: {
          color: '#000'
        }
      }]
    }]
  };

  // LE NEZとLE AROMESのチェックされた項目を取得
  const getCheckedItems = (items: { [key: string]: boolean | string } | undefined) => {
    if (!items) return [];
    return Object.entries(items)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full p-4 w-full max-w-md mx-auto">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            H
          </div>
          <div className="text-sm text-gray-500">
            {record.created_at ? format(new Date(record.created_at), 'yyyy/MM/dd HH:mm', { locale: ja }) : '-'}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {displayValue(record.environment?.temperature, '°C')} / {displayValue(record.environment?.humidity, '%')}
        </div>
      </div>

      {/* メイン情報 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{displayValue(record.coffee?.name)}</h3>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold mb-1">
              {displayValue(record.personalScore)}
              <span className="text-sm font-normal ml-1">点</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
              評価: {displayValue(record.tasting?.totalScore)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>産地: {displayValue(record.coffee?.origin)}</div>
          <div>品種: {displayValue(record.coffee?.variety)}</div>
          <div>標高: {displayValue(record.coffee?.altitude, 'm')}</div>
          <div>精製方法: {displayValue(record.coffee?.process)}</div>
        </div>

        {/* 抽出レシピ */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h4 className="font-bold mb-2">抽出レシピ</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>ドリッパー: {displayValue(record.brewing?.dripper)}</div>
            <div>グラインダー: {displayValue(record.brewing?.grinder)}</div>
            <div>挽き目: {displayValue(record.brewing?.grindSize)}</div>
            <div>豆量: {displayValue(record.brewing?.coffeeAmount, 'g')}</div>
            <div>湯量: {displayValue(record.brewing?.waterAmount, 'ml')}</div>
            <div>温度: {displayValue(record.brewing?.temperature, '°C')}</div>
            <div>蒸らし: {displayValue(record.brewing?.bloomAmount, 'g')} / {displayValue(record.brewing?.bloomTime, '秒')}</div>
            <div>抽出時間: {displayValue(record.brewing?.brewTime, '秒')}</div>
          </div>
        </div>

        {/* フレーバー */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-bold mb-2">LE NEZ</h4>
            <div className="text-sm">
              {getCheckedItems(record.nose?.positive).length > 0 ? (
                getCheckedItems(record.nose?.positive).map((item, index) => (
                  <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">-</span>
              )}
              {record.nose?.notes && (
                <div className="mt-2 text-gray-600">{record.nose.notes}</div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">LE AROMES</h4>
            <div className="text-sm">
              {getCheckedItems(record.aroma?.positive).length > 0 ? (
                getCheckedItems(record.aroma?.positive).map((item, index) => (
                  <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">-</span>
              )}
              {record.aroma?.notes && (
                <div className="mt-2 text-gray-600">{record.aroma.notes}</div>
              )}
            </div>
          </div>
        </div>

        {/* レーダーチャート */}
        <div className="h-64 mb-4">
          <ReactECharts option={radarOption} style={{ height: '100%' }} />
        </div>

        {/* 総合評価 */}
        <div className="mb-2">
          <div className="font-semibold text-gray-700 mb-1">総合評価</div>
          <div className="text-base text-gray-900 font-bold">{displayValue(record.comments)}</div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-2 mt-auto pt-4 border-t">
          <button
            onClick={() => onDetail?.(record.id!)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            詳細
          </button>
          <button
            onClick={() => onEdit?.(record.id!)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            編集
          </button>
          <button
            onClick={() => onDelete?.(record.id!)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default HanddripCard; 