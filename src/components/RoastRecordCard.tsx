import { useRouter } from 'next/navigation';
import { RoastRecord } from '@/types/roast';
import RadarChart from '@/components/RadarChart';

type RoastRecordCardProps = {
  record: RoastRecord;
  onDelete?: (id: string) => void;
};

// 時間を分:秒形式にフォーマットする関数
const formatTime = (timeStr: string) => {
  if (!timeStr) return '-';
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// DTRを計算する関数
const calculateDTR = (totalTime: string, firstCrack: string) => {
  if (!totalTime || !firstCrack) return '-';
  const [totalMin, totalSec] = totalTime.split(':').map(Number);
  const [fcMin, fcSec] = firstCrack.split(':').map(Number);
  const totalSeconds = totalMin * 60 + totalSec;
  const fcSeconds = fcMin * 60 + fcSec;
  const dtr = ((totalSeconds - fcSeconds) / totalSeconds * 100).toFixed(1);
  return `${dtr}%`;
};

export default function RoastRecordCard({ record, onDelete }: RoastRecordCardProps) {
  const router = useRouter();

  // 焙煎記録用のラベルと値
  const roastIndicator = [
    { name: '酸味', max: 5 },
    { name: '甘み', max: 5 },
    { name: 'ボディ', max: 5 },
    { name: '濃さ', max: 5 },
    { name: '均一性', max: 5 },
    { name: 'バランス', max: 5 },
    { name: 'カップの綺麗さ', max: 5 },
  ];
  const roastValue = [
    record.acidity,
    record.sweetness,
    record.body,
    record.strength,
    record.uniformity,
    record.balance,
    record.cleanness,
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
      {/* 環境情報・評価スコア（上部） */}
      <div className="border-b border-gray-200 px-6 pt-6 pb-3">
        <div className="text-xs text-gray-500 mb-1">
          {new Date(record.roast_date).toLocaleDateString('ja-JP')}
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-gray-900 truncate max-w-[12em]">
            {record.bean_name}
          </div>
          <div className="flex flex-col items-end min-w-0 ml-2">
            <div className="text-2xl font-bold text-gray-900 whitespace-nowrap">
              {record.personal_score}
              <span className="text-xs font-normal text-gray-600">/100</span>
            </div>
            <div className="text-xs text-gray-600 whitespace-nowrap">
              評価スコア: {record.overall_total_score}/100
            </div>
          </div>
        </div>
      </div>

      {/* 本体 */}
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* コーヒー情報 */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-bold text-gray-700">産地: <span className="font-normal text-gray-900">{record.origin}</span></div>
            <div className="font-bold text-gray-700">品種: <span className="font-normal text-gray-900">{record.variety}</span></div>
            <div className="font-bold text-gray-700">色度: <span className="font-normal text-gray-900">{record.color}</span></div>
            <div className="font-bold text-gray-700">焙煎目標: <span className="font-normal text-gray-900">{record.target_roast_level}</span></div>
          </div>
        </div>

        {/* 焙煎プロセス */}
        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm mb-4">
          <div className="font-bold text-gray-700 mb-2">焙煎プロセス</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="font-bold text-gray-700">投入量: <span className="font-normal text-gray-900">{record.charge_weight}g</span></div>
            <div className="font-bold text-gray-700">焙煎後重量: <span className="font-normal text-gray-900">{record.after_weight}g</span></div>
            <div className="font-bold text-gray-700">投入温度: <span className="font-normal text-gray-900">{record.charge_temp}℃</span></div>
            <div className="font-bold text-gray-700">排出温度: <span className="font-normal text-gray-900">{record.drop_temp}℃</span></div>
            <div className="font-bold text-gray-700">総時間: <span className="font-normal text-gray-900">{formatTime(record.total_time)}</span></div>
            <div className="font-bold text-gray-700">DTR: <span className="font-normal text-gray-900">{calculateDTR(record.total_time, record.first_crack)}</span></div>
          </div>
        </div>

        {/* テイスティング評価 */}
        <div className="mb-4">
          <div className="font-bold text-gray-700 mb-2">テイスティング評価</div>
          {/* 香り・風味評価 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-bold text-gray-700 mb-1">香り（粉）</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-900 rounded-full"
                    style={{ width: `${(record.aroma_powder / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{record.aroma_powder}/5</span>
              </div>
              {record.aroma_powder_note && (
                <div className="text-xs text-gray-600 mt-1">{record.aroma_powder_note}</div>
              )}
            </div>
            <div>
              <div className="font-bold text-gray-700 mb-1">香り（液）</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-900 rounded-full"
                    style={{ width: `${(record.aroma_liquid / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{record.aroma_liquid}/5</span>
              </div>
              {record.aroma_liquid_note && (
                <div className="text-xs text-gray-600 mt-1">{record.aroma_liquid_note}</div>
              )}
            </div>
            <div>
              <div className="font-bold text-gray-700 mb-1">風味（液）</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-900 rounded-full"
                    style={{ width: `${(record.flavor / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{record.flavor}/5</span>
              </div>
              {record.flavor_note && (
                <div className="text-xs text-gray-600 mt-1">{record.flavor_note}</div>
              )}
            </div>
          </div>

          {/* レーダーチャート */}
          <div className="flex flex-col items-center my-4">
            <div className="w-[280px] h-[280px]">
              <RadarChart indicator={roastIndicator} value={roastValue} />
            </div>
          </div>
        </div>

        {/* 総合評価 */}
        {record.summary && (
          <div className="border-t border-gray-100 pt-2 mt-2 text-sm text-gray-700">
            <div className="font-medium text-gray-900 mb-1">総合評価</div>
            <div className="whitespace-pre-wrap">{record.summary}</div>
          </div>
        )}

        {/* 操作ボタン */}
        <div className="mt-auto pt-4 flex justify-end space-x-2">
          <button
            onClick={() => router.push(`/records/roast/${record.id}`)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            詳細を見る
          </button>
          <button
            onClick={() => router.push(`/records/roast/${record.id}/edit`)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            編集
          </button>
          <button
            onClick={() => {
              if (window.confirm('この記録を削除してもよろしいですか？')) {
                onDelete?.(record.id);
              }
            }}
            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
} 