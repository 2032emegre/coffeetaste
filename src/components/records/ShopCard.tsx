import React from 'react';
import RadarChart from '../RadarChart';

// 型は本来ShopVisitRecord型を使うべきだが、ここではanyで仮実装

type Props = {
  record: any;
  onEdit?: (record: any) => void;
  onDetail?: (record: any) => void;
  onDelete?: (id: string) => void;
};

const displayValue = (v: any, unit: string = '') => (v === undefined || v === null || v === '' ? '-' : `${v}${unit}`);

const ShopCard: React.FC<Props> = ({ record, onEdit, onDetail, onDelete }) => {
  // レーダーチャート用データ
  const shopTasting = {
    acidity: record.tasting_acidity ?? 0,
    sweetness: record.tasting_sweetness ?? 0,
    richness: record.tasting_richness ?? 0,
    body: record.tasting_body ?? 0,
    balance: record.tasting_balance ?? 0,
    cleanliness: record.tasting_cleanliness ?? 0,
    aftertaste: record.tasting_aftertaste ?? 0,
  };
  // 飲み物リスト
  const items = Array.isArray(record.items) ? record.items : [];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full p-4 w-full max-w-md mx-auto">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            S
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
          <h3 className="text-xl font-bold truncate">{displayValue(record.shop_name)}</h3>
          <div className="flex flex-col items-end">
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
              合計スコア: {displayValue(record.tasting_total_score)}
            </span>
          </div>
        </div>
        {/* 飲み物リスト */}
        <div className="mb-4">
          <h4 className="font-bold mb-2">飲み物リスト</h4>
          {items.length > 0 ? (
            <ul className="text-sm space-y-1">
              {items.map((item: any, idx: number) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name || '-'}</span>
                  <span>{item.price ? `¥${item.price}` : '-'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
        {/* レーダーチャート */}
        <div className="h-64 mb-4">
          <RadarChart tasting={shopTasting} />
        </div>
        {/* その他の情報 */}
        <div className="mb-2">
          <div className="font-semibold text-gray-700 mb-1">その他の情報</div>
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

export default ShopCard; 