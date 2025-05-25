import React from 'react';
import { TastingRecord } from '@/types/tasting';

type Props = {
  record: Partial<TastingRecord>;
};

const HanddripCard: React.FC<Props> = ({ record }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full p-4">
      <div className="font-bold text-lg mb-2">ハンドドリップ記録カード（雛形）</div>
      <div>コーヒー名: {record.coffee?.name}</div>
      <div>産地: {record.coffee?.origin}</div>
      <div>品種: {record.coffee?.variety}</div>
      <div>スコア: {record.personalScore}</div>
      {/* 必要に応じて項目追加 */}
    </div>
  );
};

export default HanddripCard; 