import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RadarChart from '@/components/RadarChart';

export default function RoastRecordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<RoastRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`/api/roast_records/${id}`);
        if (!res.ok) {
          throw new Error('記録の取得に失敗しました');
        }
        const data = await res.json();
        setRecord(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  // 焙煎プロセスの時間をフォーマット
  const formatTime = (seconds: number | null) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">焙煎記録詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/roast/${id}/edit`)}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.push('/records?tab=roast')}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            一覧に戻る
          </button>
        </div>
      </div>

      {/* 環境情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎日</span>
            <div className="text-gray-900">
              {new Date(record.roasted_at).toLocaleDateString('ja-JP')}
            </div>
          </div>
        </div>
      </section>

      {/* コーヒー情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">コーヒー情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">豆名</span>
            <div className="text-gray-900">{record.bean_name}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">産地</span>
            <div className="text-gray-900">{record.origin}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">品種</span>
            <div className="text-gray-900">{record.variety}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">精製方法</span>
            <div className="text-gray-900">{record.process}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎度</span>
            <div className="text-gray-900">{record.roast_level}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">その他の情報</span>
            <div className="text-gray-900">{record.other_info}</div>
          </div>
        </div>
      </section>

      {/* 焙煎プロセス */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎プロセス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">投入量</span>
            <div className="text-gray-900">{record.charge_weight}g</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">投入温度</span>
            <div className="text-gray-900">{record.charge_temp}℃</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">目標焙煎度</span>
            <div className="text-gray-900">{record.target_roast_level}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">投入時間</span>
            <div className="text-gray-900">{formatTime(record.charge_time)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">ドライエンド</span>
            <div className="text-gray-900">{formatTime(record.dry_end)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">イエローフェーズスタート</span>
            <div className="text-gray-900">{formatTime(record.yellow_start)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">メイラードフェーズスタート</span>
            <div className="text-gray-900">{formatTime(record.maillard_start)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">ファーストクラック</span>
            <div className="text-gray-900">{formatTime(record.first_crack)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">ファーストクラックピーク</span>
            <div className="text-gray-900">{formatTime(record.first_crack_peak)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">セカンドクラック</span>
            <div className="text-gray-900">{formatTime(record.second_crack)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">排出時間</span>
            <div className="text-gray-900">{formatTime(record.drop_time)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">総時間</span>
            <div className="text-gray-900">{formatTime(record.total_time)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">排出温度</span>
            <div className="text-gray-900">{record.drop_temp}℃</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎後重量</span>
            <div className="text-gray-900">{record.after_weight}g</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">色度</span>
            <div className="text-gray-900">{record.color_meter}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">DTR</span>
            <div className="text-gray-900">{record.dtr}%</div>
          </div>
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">レーダーチャート</h3>
            <div className="h-96">
              <RadarChart
                tasting={{
                  acidity: record.aroma_powder || 0,
                  sweetness: record.aroma_liquid || 0,
                  richness: record.flavor || 0,
                  body: record.strength || 0,
                  balance: record.uniformity || 0,
                  cleanliness: record.cleanness || 0,
                  aftertaste: record.aftertaste || 0,
                }}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">香り（粉）</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.aroma_powder}</div>
              {record.aroma_powder_note && (
                <div className="text-gray-700">{record.aroma_powder_note}</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">香り（液）</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.aroma_liquid}</div>
              {record.aroma_liquid_note && (
                <div className="text-gray-700">{record.aroma_liquid_note}</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">風味</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.flavor}</div>
              {record.flavor_note && (
                <div className="text-gray-700">{record.flavor_note}</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">強度</h3>
              <div className="text-2xl font-bold text-gray-900">{record.strength}</div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">均一性</h3>
              <div className="text-2xl font-bold text-gray-900">{record.uniformity}</div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">クリーン度</h3>
              <div className="text-2xl font-bold text-gray-900">{record.cleanness}</div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">余韻</h3>
              <div className="text-2xl font-bold text-gray-900">{record.aftertaste}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 総合評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-1">評価点数</span>
              <div className="text-3xl font-bold text-gray-900">{record.overall_total_score}</div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">個人スコア</span>
              <div className="text-3xl font-bold text-gray-900">{record.personal_score}</div>
            </div>
          </div>
          <div>
            {record.issues && (
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700 mb-1">課題</span>
                <div className="text-gray-900 whitespace-pre-wrap">{record.issues}</div>
              </div>
            )}
            {record.summary && (
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">サマリー</span>
                <div className="text-gray-900 whitespace-pre-wrap">{record.summary}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 