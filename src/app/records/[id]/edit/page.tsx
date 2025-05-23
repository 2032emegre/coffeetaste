"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import { ShopVisitRecord } from '@/types/tasting';
import ShopVisitForm from '@/components/ShopVisitForm';
import { toSupabaseRow, fromSupabaseRow } from '@/utils/supabase';
import { TastingRecord } from '@/types/tasting';
import RecordForm from '@/components/RecordForm';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditRecord({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<TastingRecord | ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecord = async () => {
      // まずハンドドリップ記録を検索
      const { data: tastingData, error: tastingError } = await supabase
        .from('tasting_records')
        .select('*')
        .eq('id', params.id)
        .single();

      if (tastingData) {
        setRecord(tastingData);
        setLoading(false);
        return;
      }

      // ハンドドリップ記録が見つからない場合は店舗来店記録を検索
      const { data: shopData, error: shopError } = await supabase
        .from('shop_visit_records')
        .select('*')
        .eq('id', params.id)
        .single();

      if (shopError) {
        setError('記録の取得に失敗しました: ' + shopError.message);
        setLoading(false);
        return;
      }

      if (shopData) {
        setRecord(fromSupabaseRow(shopData));
      }
      setLoading(false);
    };

    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (data: TastingRecord | ShopVisitRecord) => {
    setSaving(true);
    setError(null);

    if ('type' in data && data.type === 'shop') {
      // 店舗来店記録の更新
      const { error } = await supabase
        .from('shop_visit_records')
        .update(toSupabaseRow(data as ShopVisitRecord))
        .eq('id', params.id);

      setSaving(false);

      if (error) {
        setError('保存に失敗しました: ' + error.message);
        return;
      }

      router.push('/records?tab=shop');
    } else {
      // ハンドドリップ記録の更新
      const tastingData = data as TastingRecord;
      const { error } = await supabase
        .from('tasting_records')
        .update({
          environment: tastingData.environment,
          coffee: tastingData.coffee,
          brewing: tastingData.brewing,
          tasting: tastingData.tasting,
          nose: tastingData.nose,
          aroma: tastingData.aroma,
          personalScore: tastingData.personalScore,
          comments: tastingData.comments,
          notes: tastingData.notes,
        })
        .eq('id', params.id);

      setSaving(false);

      if (error) {
        setError('保存に失敗しました: ' + error.message);
        return;
      }

      router.push('/records');
    }
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

  // レコードの種類に応じて適切なフォームを表示
  if ('type' in record && record.type === 'shop') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">店舗来店記録の編集</h1>
        <ShopVisitForm
          initialData={record as ShopVisitRecord}
          onSubmit={handleSubmit}
          isSubmitting={saving}
          submitError={error}
        />
      </div>
    );
  }

  // ハンドドリップ記録の編集フォーム
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ハンドドリップ記録の編集</h1>
      <RecordForm
        initialData={record as TastingRecord}
        onSubmit={handleSubmit}
        loading={saving}
        error={error}
        mode="edit"
      />
    </div>
  );
} 