import React from 'react';
import { TastingRecord } from '@/types/tasting';

type Props = {
  record: Partial<TastingRecord>;
};

const ShopCard: React.FC<Props> = ({ record }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full p-4">
      <div className="font-bold text-lg mb-2">店舗来店記録カード（雛形）</div>
      <div>コーヒー名: {record.coffee?.name}</div>
      <div>日付: {record.timestamp ? new Date(record.timestamp).toLocaleDateString('ja-JP') : ''}</div>
      <div>コメント: {record.comments}</div>
      {/* 必要に応じて項目追加 */}
    </div>
  );
};

export default ShopCard; 