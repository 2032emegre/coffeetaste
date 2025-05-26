"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RadarChart from '@/components/RadarChart';

// ダミーデータ
const dummyRoastRecords: RoastRecord[] = [
  {
    id: 'dummy3',
    environment: {
      date: '2024-06-01',
      time: '10:00',
      weather: '晴れ',
      temperature: 25,
      isAutoFetched: false,
    },
    coffee: {
      name: 'ダミー豆',
      origin: 'コロンビア',
      process: 'ウォッシュド',
      variety: 'カトゥーラ',
      roastLevel: '中煎り',
      roastDate: '2024-06-01',
    },
    brewing: {
      dripper: '焙煎機',
    },
    tasting: {
      acidity: 3,
      sweetness: 4,
      richness: 3,
      body: 4,
      balance: 4,
      cleanliness: 3,
      aftertaste: 3,
      totalScore: 24,
      aromaPowder: 3,
      aromaPowderNote: 'ナッツ系',
      aromaLiquid: 4,
      aromaLiquidNote: 'フローラル',
      flavor: 4,
      flavorNote: 'チョコレート',
      strength: 3,
      uniformity: 4,
      cleanness: 3,
    },
    nose: { positive: {}, negative: {}, notes: '' },
    aroma: { positive: {}, negative: {}, notes: '' },
    personalScore: 85,
    comments: 'バランス良し',
    notes: '',
    created_at: '2024-06-01T10:00:00Z',
  },
];

export default function RoastRecordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<RoastRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ダミーデータから取得
    const found = dummyRoastRecords.find(r => r.id === id);
    if (found) {
      setRecord(found);
    } else {
      setError('記録が見つかりません');
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  // 日付フォーマット
  const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString('ja-JP') : '-';
  // 時間（秒 or mm:ss）
  const formatTime = (value?: string | number | null) => {
    if (value === undefined || value === null || value === '') return '-';
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(num)) return value;
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">焙煎記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/roast/${id}/edit`)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.push('/records?tab=roast')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            戻る
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
              {formatDate(record.coffee.roastDate)}
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
            <div className="text-gray-900">{record.coffee.name}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">産地</span>
            <div className="text-gray-900">{record.coffee.origin}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">品種</span>
            <div className="text-gray-900">{record.coffee.variety}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">精製方法</span>
            <div className="text-gray-900">{record.coffee.process}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎度</span>
            <div className="text-gray-900">{record.coffee.roastLevel}</div>
          </div>
        </div>
      </section>

      {/* 焙煎プロセス */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎プロセス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">投入量</span>
            <div className="text-gray-900">{record.brewing.chargeWeight ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">投入温度</span>
            <div className="text-gray-900">{record.brewing.chargeTemp ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">目標焙煎度</span>
            <div className="text-gray-900">{record.brewing.targetRoastLevel ?? record.coffee.roastLevel ?? '-'}</div>
          </div>
          {/* 必要に応じて他のプロセス項目も追加 */}
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">レーダーチャート</h3>
            <div className="h-96">
              <RadarChart tasting={record.tasting} mode="roast" />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">香り（粉）</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.tasting.aromaPowder}</div>
              {record.tasting.aromaPowderNote && (
                <div className="text-gray-700">{record.tasting.aromaPowderNote}</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">香り（液）</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.tasting.aromaLiquid}</div>
              {record.tasting.aromaLiquidNote && (
                <div className="text-gray-700">{record.tasting.aromaLiquidNote}</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">風味</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{record.tasting.flavor}</div>
              {record.tasting.flavorNote && (
                <div className="text-gray-700">{record.tasting.flavorNote}</div>
              )}
            </div>
            {/* 他のテイスティング項目も同様に表示可能 */}
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
              <div className="text-3xl font-bold text-gray-900">{record.tasting.totalScore}</div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">個人スコア</span>
              <div className="text-3xl font-bold text-gray-900">{record.personalScore}</div>
            </div>
          </div>
          <div>
            {record.comments && (
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700 mb-1">コメント</span>
                <div className="text-gray-900 whitespace-pre-wrap">{record.comments}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 