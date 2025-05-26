"use client";

import RecordForm from '@/components/RecordForm';
import { useRouter } from 'next/navigation';
import { TastingRecord } from '@/types/tasting';

// 仮のダミーデータ
const dummyRecord: TastingRecord = {
  id: '1',
  environment: { date: '2024-06-01', time: '10:00', weather: '晴れ', temperature: 22, humidity: '50', isAutoFetched: false },
  coffee: { 
    name: 'エチオピア', 
    origin: 'エチオピア', 
    process: 'ウォッシュド', 
    variety: 'ゲイシャ', 
    roastLevel: '浅煎り', 
    roastedAt: new Date(), 
    roastDate: '2024-06-01', 
    otherInfo: '' 
  },
  brewing: { dripper: 'V60', grinder: 'Timemore', grindSize: '中細挽き', grindSetting: '', temperature: '92', coffeeAmount: '15', waterAmount: '240', bloomAmount: '', bloomTime: '', brewTime: '180', notes: '' },
  tasting: { acidity: 4, sweetness: 4, richness: 3, body: 3, balance: 4, cleanliness: 4, aftertaste: 4, totalScore: 26 },
  nose: { positive: {}, negative: {}, notes: '' },
  aroma: { positive: {}, negative: {}, notes: '' },
  personalScore: 90,
  comments: '美味しかった',
  notes: '',
  created_at: '2024-06-01T10:00:00Z'
};

export default function HanddripEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // 本来はidでデータ取得
  const record = dummyRecord;

  const handleSubmit = async (data: TastingRecord) => {
    // 編集時の処理をここに実装
    console.log('編集データ:', data);
    // 更新後、カード一覧に戻る
    router.push('/records');
    return Promise.resolve();
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ハンドドリップ記録 編集</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>
      <RecordForm initialData={record} onSubmit={handleSubmit} loading={false} error={null} mode="edit" />
    </div>
  );
} 