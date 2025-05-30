"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopVisitRecord } from "@/types/tasting";
import ShopVisitForm from "@/components/ShopVisitForm";
import { createClient } from '@supabase/supabase-js';
import { toSupabaseRow, fromSupabaseRow } from '@/utils/supabase';

export default function ShopVisitEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = useParams();
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchRecord = async () => {
      setLoading(true);
      // shop_visits本体取得
      const { data, error } = await supabase
        .from('shop_visits')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setRecord(null);
        setLoading(false);
        return;
      }
      // environment参照
      let environment = undefined;
      if (data.environment_id) {
        const { data: envData } = await supabase
          .from('environments')
          .select('*')
          .eq('id', data.environment_id)
          .single();
        environment = envData;
      }
      // fromSupabaseRowで変換し、environmentを上書き
      const recordObj = fromSupabaseRow(data);
      if (environment) {
        recordObj.environment = {
          date: environment.date,
          time: environment.time,
          weather: environment.weather,
          temperature: environment.temperature,
          humidity: environment.humidity,
          isAutoFetched: environment.is_auto_fetched,
        };
      }
      setRecord(recordObj);
    setLoading(false);
    };
    fetchRecord();
  }, [id]);

  const handleSubmit = async (data: ShopVisitRecord) => {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      // environmentsテーブル更新
      const { data: envUpdateData, error: envError } = await supabase
        .from('environments')
        .update({
          date: data.environment.date,
          time: data.environment.time,
          weather: data.environment.weather,
          temperature: data.environment.temperature,
          humidity: data.environment.humidity,
          is_auto_fetched: data.environment.isAutoFetched,
        })
        .eq('id', (record as any)?.environment_id)
        .select('id')
        .single();
      if (envError) throw envError;
      // shop_visits本体更新
      const row = toSupabaseRow(data);
      const { error: shopError } = await supabase
        .from('shop_visits')
        .update({
          ...row,
          environment_id: envUpdateData.id,
        })
        .eq('id', id);
      if (shopError) throw shopError;
      router.push('/records?tab=shop');
    } catch (e: any) {
      setError('保存に失敗しました: ' + (e.message || e.toString()));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">店舗来店記録 編集</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>
      <ShopVisitForm
        initialData={record}
        onSubmit={handleSubmit}
        isSubmitting={saving}
        submitError={error}
        mode="edit"
      />
    </div>
  );
} 