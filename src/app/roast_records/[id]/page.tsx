"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { RoastRecord } from '@/types/tasting';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RoastRecordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<RoastRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('roast_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setError('焙煎記録の取得に失敗しました');
        setLoading(false);
        return;
      }
      setRecord(data);
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">焙煎記録が見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">焙煎記録詳細</h1>
      <div className="mb-2 text-gray-700">焙煎日: {record.roasted_at ? new Date(record.roasted_at).toLocaleDateString('ja-JP') : ''}</div>
      <div className="mb-2 text-gray-700">豆名: {record.bean_name}</div>
      <div className="mb-2 text-gray-700">焙煎度: {record.roast_level}</div>
      <div className="mb-2 text-gray-700">色度: {record.color_meter}</div>
      <div className="mb-4 text-gray-700">メモ: {record.notes}</div>
      <button
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/roast_records')}
      >一覧に戻る</button>
    </div>
  );
} 