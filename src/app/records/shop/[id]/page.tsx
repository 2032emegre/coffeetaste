"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopVisitRecord } from "@/types/tasting";
import RadarChart from "@/components/RadarChart";
import { createClient } from '@supabase/supabase-js';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import TastingSection from '@/components/TastingSection';
import ShopVisitForm from '@/components/ShopVisitForm';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function mapRecordFromSupabase(row: any): ShopVisitRecord {
  return {
    id: row.id,
    environment: {
      date: row.date,
      time: row.time,
      weather: row.weather,
      temperature: row.temperature,
      humidity: row.humidity?.toString() ?? '',
      isAutoFetched: false,
    },
    shop: {
      name: row.shop_name,
      link: row.shop_link,
    },
    items: row.items || [],
    tasting: row.tasting || {
      acidity: 0,
      sweetness: 0,
      body: 0,
      richness: 0,
      balance: 0,
      cleanness: 0,
      aftertaste: 0,
      totalScore: 0,
    },
    comments: row.comments || '',
    staffInfo: row.staff_info || '',
    created_at: row.created_at,
  };
}

// ダミーデータ
const dummyRecord: ShopVisitRecord = {
  id: '1',
  environment: {
    date: '2024-06-01',
    time: '14:00',
    weather: '晴れ',
    temperature: 25,
    humidity: '50',
    isAutoFetched: false,
  },
  shop: { name: 'カフェ・ド・サンプル', link: 'https://samplecafe.com' },
  items: [
    { name: 'エチオピアコーヒー', price: 600, origin: 'エチオピア', roastLevel: '浅煎り', variety: 'Heirloom', method: 'ハンドドリップ' },
    { name: 'カフェラテ', price: 650, method: 'エスプレッソ' }
  ],
  tasting: {
    acidity: 4,
    sweetness: 3,
    body: 4,
    balance: 5,
    richness: 4,
    cleanliness: 4,
    aftertaste: 3,
    totalScore: 23,
  },
  comments: '明るい酸味と華やかな香りが印象的。店内も落ち着いた雰囲気で良かった。',
  staffInfo: '店主はとても親切',
  created_at: '2024-06-01T14:00:00Z',
};

export default function ShopVisitDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecord(dummyRecord);
    setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">店舗来店記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/shop/${record.id}/edit`)}
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
      <ShopVisitForm
        initialData={record}
        onSubmit={() => Promise.resolve()}
        isSubmitting={false}
        submitError={null}
        mode="view"
      />
    </div>
  );
} 