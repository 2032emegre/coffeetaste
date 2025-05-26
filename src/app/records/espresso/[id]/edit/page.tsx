"use client";

import { useRouter } from 'next/navigation';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import AromaSection from '@/components/AromaSection';
import RadarChart from '@/components/RadarChart';
import { useState } from 'react';
import EspressoForm from '@/components/EspressoForm';

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

  const handleSubmit = async (data: EspressoRecord) => {
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
      <EspressoForm
        initialData={record}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
} 