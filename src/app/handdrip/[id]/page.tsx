"use client";

import RecordForm from '@/components/RecordForm';
import { useRouter, useParams } from 'next/navigation';
import { TastingRecord } from '@/types/tasting';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function HanddripDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = useParams();
  const [record, setRecord] = useState<TastingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchRecord = async () => {
      setLoading(true);
      setError(null);
      // handdrip_recordsから取得
      const { data, error } = await supabase
        .from('handdrip_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setError('記録の取得に失敗しました');
        setLoading(false);
        return;
      }
      // environment/coffee参照
      const [envRes, coffeeRes] = await Promise.all([
        supabase.from('environments').select('*').eq('id', data.environment_id).single(),
        supabase.from('coffees').select('*').eq('id', data.coffee_id).single(),
      ]);
      setRecord({
        ...data,
        environment: envRes.data || {},
        coffee: coffeeRes.data || {},
      });
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  const handleSubmit = async (data: TastingRecord) => {
    // 詳細表示時は何もしない
    return Promise.resolve();
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ハンドドリップ記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/handdrip/${id}/edit`)}
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
      <RecordForm 
        initialData={record} 
        onSubmit={() => Promise.resolve()} 
        loading={false} 
        error={null} 
        mode="view"
        readOnly={true}
      />
    </div>
  );
} 