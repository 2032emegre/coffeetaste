"use client";

import RecordForm from '@/components/RecordForm';
import { useRouter, useParams } from 'next/navigation';
import { TastingRecord } from '@/types/tasting';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function HanddripEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = useParams();
  const [record, setRecord] = useState<TastingRecord | null>(null);
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
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      // environmentsテーブル更新
      const { error: envError } = await supabase
        .from('environments')
        .update({
          date: data.environment.date,
          time: data.environment.time,
          weather: data.environment.weather,
          temperature: data.environment.temperature,
          humidity: data.environment.humidity,
          is_auto_fetched: data.environment.isAutoFetched,
        })
        .eq('id', record?.environment_id);
      if (envError) throw envError;

      // coffeesテーブル更新
      const { error: coffeeError } = await supabase
        .from('coffees')
        .update({
          name: data.coffee.name,
          origin: data.coffee.origin,
          process: data.coffee.process,
          variety: data.coffee.variety,
          roast_level: data.coffee.roastLevel,
          roast_date: data.coffee.roastDate,
          altitude: data.coffee.altitude,
          other_info: data.coffee.other_info,
        })
        .eq('id', record?.coffee_id);
      if (coffeeError) throw coffeeError;

      // handdrip_records本体をupdate
      const { error: recordError } = await supabase
        .from('handdrip_records')
        .update({
          brewing: data.brewing,
          tasting: data.tasting,
          nose: data.nose,
          aroma: data.aroma,
          personal_score: data.personal_score,
          comments: data.comments,
          notes: data.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (recordError) throw recordError;

      router.push('/records');
    } catch (e: any) {
      setError('保存に失敗しました: ' + (e.message || e.toString()));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

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
      <RecordForm initialData={record} onSubmit={handleSubmit} loading={saving} error={error} mode="edit" />
    </div>
  );
} 