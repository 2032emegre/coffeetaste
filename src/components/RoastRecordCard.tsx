import { useRouter } from 'next/navigation';
import RadarChart from '@/components/RadarChart';

export type RoastRecord = {
  id: string;
  created_at: string;
  roast_date: string;
  bean_name: string;
  origin: string;
  process: string;
  variety: string;
  roast_level: string;
  other_info: string;
  charge_weight: number | null;
  charge_temp: number | null;
  target_roast_level: string;
  charge_time: string;
  dry_end: string;
  yellow_start: string;
  maillard_start: string;
  first_crack: string;
  first_crack_peak: string;
  second_crack: string;
  drop_time: string;
  total_time: string;
  drop_temp: number | null;
  after_weight: number | null;
  color: number | null;
  acidity: number | null;
  sweetness: number | null;
  richness: number | null;
  body: number | null;
  balance: number | null;
  cleanliness: number | null;
  aftertaste: number | null;
  total_score: number | null;
  aroma_powder: number | null;
  aroma_powder_note?: string;
  aroma_liquid: number | null;
  aroma_liquid_note?: string;
  flavor: number | null;
  flavor_note?: string;
  strength: number | null;
  uniformity: number | null;
  cleanness: number | null;
  overall_total_score: number | null;
  personal_score: number | null;
  issues?: string;
  summary?: string;
};

type RoastRecordCardProps = {
  record: RoastRecord;
  onDelete?: (id: string) => Promise<void>;
};

// 日付フォーマット関数（YYYY/MM/DD形式、値がなければ'-'）
function formatDateOnly(timestamp?: string | Date | null) {
  if (!timestamp) return '-';
  let date: Date;
  if (typeof timestamp === 'string') {
    if (timestamp.length === 10 && timestamp.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(timestamp + 'T00:00:00');
    } else {
      date = new Date(timestamp);
    }
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return '-';
  }
  if (isNaN(date.getTime())) return '-';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}

export default function RoastRecordCard({ record, onDelete }: RoastRecordCardProps) {
  const router = useRouter();

  const radarData = {
    labels: ['香り（粉）', '香り（液）', '風味', '余韻'],
    datasets: [
      {
        label: 'テイスティング評価',
        data: [
          record.aroma_powder || 0,
          record.aroma_liquid || 0,
          record.flavor || 0,
          record.aftertaste || 0,
        ],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* 環境情報・コーヒー情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">環境情報</h3>
            <p className="mt-1 text-sm text-gray-900">
              {formatDateOnly(record.roast_date)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">コーヒー情報</h3>
            <p className="mt-1 text-sm text-gray-900">{record.bean_name}</p>
            <p className="text-sm text-gray-900">
              {record.origin}
              {record.variety && ` / ${record.variety}`}
              {record.roast_level && ` / ${record.roast_level}`}
            </p>
          </div>
        </div>

        {/* テイスティング評価（レーダーチャート） */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">テイスティング評価</h3>
          <div className="h-48">
            <RadarChart
              tasting={{
                acidity: record.aroma_powder || 0,
                sweetness: record.aroma_liquid || 0,
                richness: record.flavor || 0,
                body: 0,
                balance: 0,
                cleanliness: 0,
                aftertaste: record.aftertaste || 0,
              }}
              mode="default"
            />
          </div>
          <div className="mt-2 space-y-1">
            {record.aroma_powder_note && (
              <p className="text-xs text-gray-600">香り（粉）: {record.aroma_powder_note}</p>
            )}
            {record.aroma_liquid_note && (
              <p className="text-xs text-gray-600">香り（液）: {record.aroma_liquid_note}</p>
            )}
            {record.flavor_note && (
              <p className="text-xs text-gray-600">風味: {record.flavor_note}</p>
            )}
          </div>
        </div>

        {/* 総合評価 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">総合評価</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">評価点数:</span>
                <span className="text-lg font-bold text-gray-900">{record.overall_total_score}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">個人スコア:</span>
                <span className="text-lg font-bold text-gray-900">{record.personal_score}</span>
              </div>
            </div>
            {record.summary && (
              <p className="text-sm text-gray-600 flex-1">{record.summary}</p>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => router.push(`/records/roast/${record.id}`)}
            className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            詳細を見る →
          </button>
          <button
            onClick={() => router.push(`/records/roast/${record.id}/edit`)}
            className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm('この記録を削除してもよろしいですか？')) {
                  onDelete(record.id);
                }
              }}
              className="px-3 py-1.5 text-sm text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              削除
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 