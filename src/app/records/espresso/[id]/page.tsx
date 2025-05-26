"use client";

import { useRouter } from 'next/navigation';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import AromaSection from '@/components/AromaSection';
import RadarChart from '@/components/RadarChart';

// ダミーデータ（Supabase espresso_recordsに準拠）
const dummyRecord: EspressoRecord = {
  id: '1',
  environment: { date: '2025-05-21', time: '10:00', weather: '晴れ', temperature: 22, humidity: '50%', isAutoFetched: false },
  coffee: { name: 'CarlosAndres', origin: 'コロンビア', process: 'FullyWashed', variety: 'castillo', roastLevel: '中煎り', roastedAt: new Date(), roastDate: '2025-05-15', otherInfo: '' },
  brewing: { type: 'espresso', dripper: '', grinder: 'Timemore', grindSetting: '2.5', coffeeAmount: '18', yield: '36', brewTime: '0:30', temperature: '93', pressure: '9', notes: '良い抽出', flair: false, flairMemo: '' },
  crema: { color: 4, thickness: 4, persistence: 4, notes: 'きれいなクレマ' },
  tasting: { acidity: 4, sweetness: 4, richness: 4, body: 4, balance: 4, cleanliness: 4, aftertaste: 4, totalScore: 31 },
  nose: { positive: {}, negative: {}, notes: '' },
  aroma: { positive: {}, negative: {}, notes: '' },
  personalScore: 88,
  comments: 'バランス良し',
  notes: '',
  created_at: '2025-05-21T10:00:00Z',
};

export default function EspressoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const record = dummyRecord; // 本来はidで取得
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
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">エスプレッソ記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/espresso/${params.id}/edit`)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            戻る
          </button>
        </div>
      </div>
      <form className="space-y-6">
        <EnvironmentInfo formData={record as any} onChange={() => {}} mode="view" recordType="espresso" />
        <CoffeeInfo formData={record as any} onChange={() => {}} mode="view" />
        <AromaSection type="nose" formData={record as any} onChange={() => {}} mode="view" />
        <AromaSection type="aroma" formData={record as any} onChange={() => {}} mode="view" />
        <div className="my-4">
          <h3 className="font-bold">クレマ評価</h3>
          <RadarChart tasting={cremaTasting} mode="crema" />
        </div>
        <div className="my-4">
          <h3 className="font-bold">テイスティング評価</h3>
          <RadarChart tasting={record.tasting} mode="espresso-taste" />
        </div>
        <div className="my-4">
          <h3 className="font-bold">コメント</h3>
          <div className="bg-gray-100 rounded p-3 min-h-[48px]">{record.comments}</div>
        </div>
        {/* 抽出レシピ */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
              <div className="text-gray-900">{record.brewing.type || '-'}</div>
              {record.brewing.type === 'その他' && (
                <div className="text-gray-900 mt-1">{record.brewing.typeOther || '-'}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">豆（g）</label>
              <div className="text-gray-900">{record.brewing.coffeeAmount || '-'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">抽出量（ml）</label>
              <div className="text-gray-900">{record.brewing.yield || '-'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">温度（℃）</label>
              <div className="text-gray-900">{record.brewing.temperature || '-'}</div>
            </div>
            <div className="md:col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" checked={!!record.brewing.flair} readOnly className="mr-2" />
              <span className="text-sm font-medium text-gray-700">flair</span>
              {record.brewing.flairMemo && (
                <span className="ml-2 text-gray-900">{record.brewing.flairMemo}</span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
              <div className="text-gray-900 whitespace-pre-line">{record.brewing.notes || '-'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
              <div className="text-gray-900">{record.brewing.grinder || '-'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
              <div className="text-gray-900">{record.brewing.grindSetting || '-'}</div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間（分:秒）</label>
              <div className="text-gray-900">
                {record.brewing.brewTime
                  ? `${Math.floor(Number(record.brewing.brewTime) / 60)}分${Number(record.brewing.brewTime) % 60}秒`
                  : '-'}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
} 