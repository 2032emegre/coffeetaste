"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import { ShopVisitRecord } from '@/types/tasting';
import ShopVisitForm from '@/components/ShopVisitForm';
import { toSupabaseRow, fromSupabaseRow } from '@/utils/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditShopVisitRecord({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('shop_visit_records')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        setError('記録の取得に失敗しました: ' + error.message);
        setLoading(false);
        return;
      }

      if (data) {
        setRecord(fromSupabaseRow(data));
      }
      setLoading(false);
    };

    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (data: ShopVisitRecord) => {
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('shop_visit_records')
      .update(toSupabaseRow(data))
      .eq('id', params.id);

    setSaving(false);

    if (error) {
      setError('保存に失敗しました: ' + error.message);
      return;
    }

    router.push('/records?tab=shop');
  };

  if (loading) {
  return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">読み込み中...</div>
            </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
            </div>
    );
  }

  if (!record) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">記録が見つかりませんでした</div>
            </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">店舗来店記録の編集</h1>
      <ShopVisitForm
        initialData={record}
        onSubmit={handleSubmit}
        isSubmitting={saving}
        submitError={error}
      />
    </div>
  );
} 