"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RoastingRecordForm from '@/components/RoastingRecordForm';

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

export default function EditRoastRecord() {
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

  const handleSubmit = async (formData: Partial<RoastRecord>) => {
    // ダミーなので何もしない
    router.push(`/records/roast/${id}`);
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">焙煎記録 編集</h1>
        <button
          onClick={() => router.push(`/records/roast/${id}`)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>

      <RoastingRecordForm
        initialData={record}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
} 