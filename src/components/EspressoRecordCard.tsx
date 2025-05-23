import { EspressoRecord } from '@/types/tasting';
import RadarChart from './RadarChart';

export type EspressoRecordCardProps = {
  record: EspressoRecord;
  onEdit?: (record: EspressoRecord) => void;
  onDetail?: (record: EspressoRecord) => void;
  onDelete?: (id: string) => void;
};

export default function EspressoRecordCard({ record, onEdit, onDetail, onDelete }: EspressoRecordCardProps) {
  // クレマのレーダーチャート用データ
  const cremaTasting = {
    acidity: record.crema.color,
    sweetness: record.crema.thickness,
    richness: record.crema.persistence,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full relative">
      {/* エスプレッソマーク */}
      <div className="absolute top-2 left-2 w-6 h-6 bg-black rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">E</span>
      </div>

      {/* タイトル・スコア・日付（上部） */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 pt-6 pb-3">
        <div>
          <div className="text-lg font-bold text-gray-900">{record.coffee.name}</div>
          <div className="text-xs text-gray-500">
            {new Date(record.environment.date).toLocaleDateString('ja-JP')} {record.environment.time}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {record.personalScore}
            <span className="text-xs font-normal text-gray-600">/100</span>
          </div>
          <div className="text-xs text-gray-600">
            評価スコア: {record.tasting.totalScore}/35
          </div>
        </div>
      </div>

      {/* コーヒー情報 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">産地:</span> {record.coffee.origin}
          </div>
          <div>
            <span className="text-gray-500">品種:</span> {record.coffee.variety}
          </div>
          <div>
            <span className="text-gray-500">精製方法:</span> {record.coffee.process}
          </div>
          <div>
            <span className="text-gray-500">焙煎度:</span> {record.coffee.roastLevel}
          </div>
        </div>
      </div>

      {/* クレマ評価 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">クレマ評価</h3>
        <div className="h-32">
          <RadarChart tasting={cremaTasting} />
        </div>
      </div>

      {/* テイスティング評価 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">テイスティング評価</h3>
        <div className="h-32">
          <RadarChart tasting={record.tasting} />
        </div>
      </div>

      {/* コメント */}
      {record.comments && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">コメント</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{record.comments}</p>
        </div>
      )}

      {/* アクションボタン */}
      <div className="px-6 py-4 mt-auto flex justify-end space-x-2">
        <button
          onClick={() => onDetail && onDetail(record)}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          詳細を見る
        </button>
        <button
          onClick={() => onEdit && onEdit(record)}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          編集
        </button>
        <button
          onClick={() => onDelete && onDelete(record.id)}
          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50"
        >
          削除
        </button>
      </div>
    </div>
  );
} 