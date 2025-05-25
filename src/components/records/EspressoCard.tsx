import React from 'react';

type Props = {
  record: any;
};

const EspressoCard: React.FC<Props> = ({ record }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full p-4">
      <div className="font-bold text-lg mb-2">エスプレッソ記録カード（雛形）</div>
      <div>コーヒー名: {record.coffee_name}</div>
      <div>産地: {record.coffee_origin}</div>
      <div>品種: {record.coffee_variety}</div>
      <div>スコア: {record.personal_score}</div>
      {/* 必要に応じて項目追加 */}
    </div>
  );
};

export default EspressoCard; 