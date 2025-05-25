import React from 'react';
import RadarChart from '../RadarChart';

// 型は本来TastingRecord/EspressoRecord型を使うべきだが、ここではanyで仮実装
// 必要に応じて型をimportして差し替えてください

type Props = {
  record: any;
  onEdit?: (record: any) => void;
  onDetail?: (record: any) => void;
  onDelete?: (id: string) => void;
};

const displayValue = (v: any, unit: string = '') => (v === undefined || v === null || v === '' ? '-' : `${v}${unit}`);

const EspressoCard: React.FC<Props> = ({ record, onEdit, onDetail, onDelete }) => {
  // クレマ評価用データ
  const cremaTasting = {
    acidity: record.crema_color ?? 0,
    sweetness: record.crema_thickness ?? 0,
    richness: record.crema_persistence ?? 0,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
  };
  // テイスティング評価用データ
  const espressoTasting = {
    acidity: record.tasting_acidity ?? 0,
    sweetness: record.tasting_sweetness ?? 0,
    richness: record.tasting_richness ?? 0,
    body: record.tasting_body ?? 0,
    balance: record.tasting_balance ?? 0,
    cleanliness: record.tasting_cleanliness ?? 0,
    aftertaste: record.tasting_aftertaste ?? 0,
  };
  // LE NEZ/AROMES表示用
  const checkedKeys = (obj: any) => Object.entries(obj || {}).filter(([_, v]) => v === true).map(([k]) => k);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full p-4 w-full max-w-md mx-auto">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            E
          </div>
          <div className="text-sm text-gray-500">
            {record.created_at ? record.created_at.slice(0, 16).replace('T', ' ') : '-'}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {displayValue(record.environment_temperature, '℃')} / {displayValue(record.environment_humidity)}
        </div>
      </div>

      {/* メイン情報 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{displayValue(record.coffee_name)}</h3>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold mb-1">
              {displayValue(record.personal_score)}<span className="text-sm font-normal ml-1">点</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
              評価: {displayValue(record.tasting_total_score)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>産地: {displayValue(record.coffee_origin)}</div>
          <div>品種: {displayValue(record.coffee_variety)}</div>
          <div>標高: {displayValue(record.coffee_altitude)}</div>
          <div>精製方法: {displayValue(record.coffee_process)}</div>
        </div>
        {/* 抽出レシピ */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h4 className="font-bold mb-2">抽出レシピ</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>種類: {displayValue(record.brewing_type)}</div>
            <div>グラインダー: {displayValue(record.brewing_grinder)}</div>
            <div>挽き目: {displayValue(record.brewing_grind_size)}</div>
            <div>豆量: {displayValue(record.brewing_coffee_amount, 'g')}</div>
            <div>抽出量: {displayValue(record.brewing_yield, 'ml')}</div>
            <div>温度: {displayValue(record.brewing_temperature, '℃')}</div>
            <div>抽出時間: {displayValue(record.brewing_time)}</div>
          </div>
          {record.brewing_flair_memo && (
            <div className="mt-1 text-xs text-gray-600">flair: {displayValue(record.brewing_flair_memo)}</div>
          )}
          {record.brewing_notes && (
            <div className="mt-1 text-xs text-gray-600">メモ: {displayValue(record.brewing_notes)}</div>
          )}
        </div>
        {/* フレーバー */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-bold mb-2">LE NEZ</h4>
            <div className="text-sm">
              {checkedKeys(record.nose_positive).length > 0 ? (
                checkedKeys(record.nose_positive).map((item: string, index: number) => (
                  <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">-</span>
              )}
              {record.nose_notes && (
                <div className="mt-2 text-gray-600">{record.nose_notes}</div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">LE AROMES</h4>
            <div className="text-sm">
              {checkedKeys(record.aroma_positive).length > 0 ? (
                checkedKeys(record.aroma_positive).map((item: string, index: number) => (
                  <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">-</span>
              )}
              {record.aroma_notes && (
                <div className="mt-2 text-gray-600">{record.aroma_notes}</div>
              )}
            </div>
          </div>
        </div>
        {/* レーダーチャート（クレマ） */}
        <div className="h-64 mb-4">
          <RadarChart tasting={cremaTasting} mode="crema" />
        </div>
        {/* レーダーチャート（テイスティング） */}
        <div className="h-64 mb-4">
          <RadarChart tasting={espressoTasting} mode="espresso-taste" />
        </div>
        {/* 総合評価 */}
        <div className="mb-2">
          <div className="font-semibold text-gray-700 mb-1">総合評価</div>
          <div className="text-base text-gray-900 font-bold">{displayValue(record.comments)}</div>
        </div>
        {/* アクションボタン */}
        <div className="flex justify-end space-x-2 mt-auto pt-4 border-t">
          <button
            onClick={() => onDetail?.(record.id)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            詳細
          </button>
          <button
            onClick={() => onEdit?.(record.id)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            編集
          </button>
          <button
            onClick={() => onDelete?.(record.id)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default EspressoCard; 