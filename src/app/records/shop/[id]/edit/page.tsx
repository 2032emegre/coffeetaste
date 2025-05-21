"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopVisitRecord } from "@/types/tasting";
import ShopVisitForm from "@/components/ShopVisitForm";
import { createClient } from '@supabase/supabase-js';
import { toSupabaseRow, fromSupabaseRow } from '@/utils/supabase';

// ダミーデータ（本来はSupabase等から取得）
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
    { name: 'エチオピアコーヒー', price: 600, isCoffee: true, origin: 'エチオピア', roastLevel: '浅煎り', variety: 'Heirloom', method: 'ハンドドリップ' },
    { name: 'カフェラテ', price: 650, isCoffee: false, method: 'エスプレッソ' }
  ],
  tasting: {
    acidity: 4,
    sweetness: 3,
    body: 4,
    balance: 5,
    cleanness: 4,
    aftertaste: 3,
    totalScore: 23,
  },
  comments: '明るい酸味と華やかな香りが印象的。店内も落ち着いた雰囲気で良かった。',
  staffInfo: '店主はとても親切',
  created_at: '2024-06-01T14:00:00Z',
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ShopVisitEdit() {
  const { id } = useParams();
  const router = useRouter();
  // TODO: 本来はidでデータ取得
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('shop_visit_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setRecord(null);
        setLoading(false);
        return;
      }
      setRecord(fromSupabaseRow(data));
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  const handleSubmit = async (data: ShopVisitRecord) => {
    setSaving(true);
    const { error } = await supabase
      .from('shop_visit_records')
      .update(toSupabaseRow(data))
      .eq('id', id);
    setSaving(false);
    if (!error) {
      router.push('/records?tab=shop');
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">店舗来店記録 編集</h1>
      <ShopVisitForm
        initialData={record}
        onSubmit={handleSubmit}
        isSubmitting={saving}
        submitError={null}
      />
      <button
        className="mt-8 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
        onClick={() => router.push(`/records/shop/${id}`)}
        disabled={saving}
      >
        キャンセル
      </button>
    </div>
  );
} 