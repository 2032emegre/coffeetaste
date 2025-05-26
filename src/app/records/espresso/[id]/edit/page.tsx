"use client";

import { useRouter } from 'next/navigation';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import AromaSection from '@/components/AromaSection';
import RadarChart from '@/components/RadarChart';
import { useState } from 'react';

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

export default function EspressoEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [record, setRecord] = useState<EspressoRecord>(dummyRecord);

  const handleChange = (key: keyof EspressoRecord, value: any) => {
    setRecord(prev => ({ ...prev, [key]: value }));
  };

  // AromaSection用
  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative', key: string, value: boolean | string) => {
    setRecord(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: {
          ...prev[type][field],
          [key]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 編集時の処理をここに実装（現状はダミー）
    // 更新後、元のカード一覧に戻る
    router.back();
  };

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
        <h1 className="text-2xl font-bold">エスプレッソ記録 編集</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <EnvironmentInfo formData={record as any} onChange={(key, value) => handleChange('environment', value)} mode="edit" recordType="espresso" />
        <CoffeeInfo formData={record as any} onChange={(key, value) => handleChange('coffee', value)} mode="edit" />
        <AromaSection type="nose" formData={record as any} onChange={handleAromaChange} mode="edit" />
        <AromaSection type="aroma" formData={record as any} onChange={handleAromaChange} mode="edit" />
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
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            rows={4}
            value={record.comments}
            onChange={e => setRecord(prev => ({ ...prev, comments: e.target.value }))}
          />
        </div>
        {/* 抽出レシピ */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.type}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, type: e.target.value } }))}
              >
                <option value="">選択してください</option>
                <option value="エスプレッソ">エスプレッソ</option>
                <option value="アメリカーノ">アメリカーノ</option>
                <option value="リストレット">リストレット</option>
                <option value="その他">その他</option>
              </select>
              {record.brewing.type === 'その他' && (
                <input
                  type="text"
                  className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  placeholder="その他の種類を記入"
                  value={record.brewing.typeOther || ''}
                  onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, typeOther: e.target.value } }))}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">豆量（g）</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.coffeeAmount || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, coffeeAmount: e.target.value } }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">抽出量（ml）</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.yield || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, yield: e.target.value } }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">温度（℃）</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.temperature || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, temperature: e.target.value } }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.grinder || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, grinder: e.target.value } }))}
              >
                <option value="">選択してください</option>
                <option value="Timemore">Timemore</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.grindSetting || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, grindSetting: e.target.value } }))}
                placeholder="例: クリック数や目安"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間（秒）</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={record.brewing.brewTime || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, brewTime: e.target.value } }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
              <textarea
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                rows={3}
                value={record.brewing.notes || ''}
                onChange={e => setRecord(prev => ({ ...prev, brewing: { ...prev.brewing, notes: e.target.value } }))}
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
} 