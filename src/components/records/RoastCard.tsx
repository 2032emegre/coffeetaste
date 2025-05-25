import React from 'react';
import RadarChart from '../RadarChart';

type Props = {
  record: any;
  onEdit?: (record: any) => void;
  onDetail?: (record: any) => void;
  onDelete?: (id: string) => void;
};

const displayValue = (v: any, unit: string = '') => (v === undefined || v === null || v === '' ? '-' : `${v}${unit}`);

const RoastCard: React.FC<Props> = ({ record, onEdit, onDetail, onDelete }) => {
  // レーダーチャート用データ
  const roastTasting = {
    acidity: record.tasting_acidity ?? 0,
    strength: record.tasting_strength ?? 0,
    uniformity: record.tasting_uniformity ?? 0,
    aftertaste: record.tasting_aftertaste ?? 0,
    sweetness: record.tasting_sweetness ?? 0,
    body: record.tasting_body ?? 0,
    cleanness: record.tasting_cleanness ?? 0,
    balance: 0, // linterエラー回避用（Roast用modeでは使われない）
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full p-4 w-full max-w-md mx-auto">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            R
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
          <div>精製方式: {displayValue(record.coffee_process)}</div>
        </div>
        {/* 焙煎情報 */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h4 className="font-bold mb-2">焙煎情報</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>目標焙煎度: {displayValue(record.target_roast_level)}</div>
            <div>色味: {displayValue(record.color)}</div>
            <div>DTR: {displayValue(record.dtr, '%')}</div>
            <div>焙煎原料率: {displayValue(record.material_yield, '%')}</div>
          </div>
        </div>
        {/* 香り・風味 */}
        <div className="mb-4">
          <h4 className="font-bold mb-2">香り・風味</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="mb-1">香り（粉）</div>
              <input type="range" min={0} max={5} value={record.aroma_powder ?? 0} readOnly className="w-full accent-black" />
              <div className="text-xs text-gray-600 mt-1">{displayValue(record.aroma_powder_note)}</div>
            </div>
            <div>
              <div className="mb-1">香り（液）</div>
              <input type="range" min={0} max={5} value={record.aroma_liquid ?? 0} readOnly className="w-full accent-black" />
              <div className="text-xs text-gray-600 mt-1">{displayValue(record.aroma_liquid_note)}</div>
            </div>
            <div>
              <div className="mb-1">風味</div>
              <input type="range" min={0} max={5} value={record.flavor ?? 0} readOnly className="w-full accent-black" />
              <div className="text-xs text-gray-600 mt-1">{displayValue(record.flavor_note)}</div>
            </div>
          </div>
        </div>
        {/* レーダーチャート */}
        <div className="h-64 mb-4">
          <RadarChart tasting={roastTasting} mode="roast" />
        </div>
        {/* 総合評価 */}
        <div className="mb-2">
          <div className="font-semibold text-gray-700 mb-1">総合評価</div>
          <div className="text-base text-gray-900 font-bold">{displayValue(record.overall_summary)}</div>
          <div className="text-xs text-gray-600 mt-1">問題点: {displayValue(record.overall_issues)}</div>
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

export default RoastCard; 