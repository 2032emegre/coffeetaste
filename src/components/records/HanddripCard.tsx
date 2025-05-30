import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TastingRecord } from '@/types/tasting';
import ReactECharts from 'echarts-for-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  record: Partial<TastingRecord>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDetail?: (id: string) => void;
};

const HanddripCard: React.FC<Props> = ({ record, onDelete }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

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
        { name: '強度', max: 5 },
        { name: '均一性', max: 5 },
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
          record.tasting?.strength || 0,
          record.tasting?.uniformity || 0,
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
  const getCheckedItems = (
    items: { [key: string]: boolean | string } | undefined,
    otherNote?: string
  ) => {
    if (!items) return [];
    // other以外のtrueな項目
    const checked = Object.entries(items)
      .filter(([key, value]) => value === true && key !== 'other')
      .map(([key]) => key);
    // otherがtrueかつotherNoteが空でなければ追加
    if (items.other && otherNote && otherNote.trim() !== '') {
      checked.push(otherNote);
    }
    return checked;
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
            {record.created_at ? new Date(record.created_at).toLocaleDateString('ja-JP') : '-'}
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
              {displayValue(record.personal_score)}
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
            <div>挽き目: {displayValue(record.brewing?.grindSetting)}</div>
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
              <div className="mb-1">
                <span className="font-semibold">ポジティブ: </span>
                {getCheckedItems(record.nose?.positive, record.nose?.positive_other_note).length > 0 ? (
                  getCheckedItems(record.nose?.positive, record.nose?.positive_other_note).map((item, index) => (
                    <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">{item}</span>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
              <div className="mb-1">
                <span className="font-semibold">ネガティブ: </span>
                {getCheckedItems(record.nose?.negative, record.nose?.negative_other_note).length > 0 ? (
                  getCheckedItems(record.nose?.negative, record.nose?.negative_other_note).map((item, index) => (
                    <span key={index} className="inline-block bg-red-100 rounded px-2 py-1 mr-1 mb-1">{item}</span>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
              {record.nose?.notes && (
                <div className="mt-2 text-gray-600">{record.nose.notes}</div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">LE AROMES</h4>
            <div className="text-sm">
              <div className="mb-1">
                <span className="font-semibold">ポジティブ: </span>
                {getCheckedItems(record.aroma?.positive, record.aroma?.positive_other_note).length > 0 ? (
                  getCheckedItems(record.aroma?.positive, record.aroma?.positive_other_note).map((item, index) => (
                    <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">{item}</span>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
              <div className="mb-1">
                <span className="font-semibold">ネガティブ: </span>
                {getCheckedItems(record.aroma?.negative, record.aroma?.negative_other_note).length > 0 ? (
                  getCheckedItems(record.aroma?.negative, record.aroma?.negative_other_note).map((item, index) => (
                    <span key={index} className="inline-block bg-red-100 rounded px-2 py-1 mr-1 mb-1">{item}</span>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
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
            onClick={() => router.push(`/handdrip/${record.id}`)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            disabled={isDeleting}
          >
            詳細
          </button>
          <button
            onClick={() => router.push(`/handdrip/${record.id}/edit`)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            disabled={isDeleting}
          >
            編集
          </button>
          <button
            onClick={async () => {
              if (!record.id) return;
              if (window.confirm('この記録を削除してもよろしいですか？')) {
                setIsDeleting(true);
                try {
                  const { error: recordError } = await supabase
                    .from('handdrip_records')
                    .delete()
                    .eq('id', record.id);
                  if (recordError) throw recordError;

                  // 関連する環境情報とコーヒー情報を削除
                  if (record.environment_id) {
                    const { error: envError } = await supabase
                      .from('environments')
                      .delete()
                      .eq('id', record.environment_id);
                    if (envError) throw envError;
                  }

                  if (record.coffee_id) {
                    const { error: coffeeError } = await supabase
                      .from('coffees')
                      .delete()
                      .eq('id', record.coffee_id);
                    if (coffeeError) throw coffeeError;
                  }

                  onDelete?.(record.id);
                  router.refresh();
                } catch (error) {
                  console.error('Error deleting record:', error);
                  alert('記録の削除に失敗しました。');
                } finally {
                  setIsDeleting(false);
                }
              }
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-red-600 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? '削除中...' : '削除'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HanddripCard; 