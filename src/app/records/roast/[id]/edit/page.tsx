"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RoastForm from '@/components/forms/RoastForm';
import { createClient } from '@supabase/supabase-js';

export default function EditRoastRecord() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<RoastRecord | null>(null);
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
      // roast_recordsから取得
      const { data, error } = await supabase
        .from('roast_records')
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
    fetchRecord();
  }, [id]);

  const handleSubmit = async (updatedRecord: RoastRecord) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    // environment更新
    const { error: envError } = await supabase
      .from('environments')
      .update(updatedRecord.environment)
      .eq('id', updatedRecord.environment_id);
    if (envError) {
      setError('環境情報の更新に失敗しました');
      return;
    }
    // coffee更新
    const { error: coffeeError } = await supabase
      .from('coffees')
      .update(updatedRecord.coffee)
      .eq('id', updatedRecord.coffee_id);
    if (coffeeError) {
      setError('コーヒー情報の更新に失敗しました');
      return;
    }
    // roast_records更新
    const { error: recordError } = await supabase
      .from('roast_records')
      .update({
        roast_date: updatedRecord.roast_date,
        roast_level: updatedRecord.roast_level,
        roast_time: updatedRecord.roast_time,
        roast_weight_before: updatedRecord.roast_weight_before,
        roast_weight_after: updatedRecord.roast_weight_after,
        roast_notes: updatedRecord.roast_notes,
        roast_aroma: updatedRecord.roast_aroma,
        roast_brewing: updatedRecord.roast_brewing,
        roast_tasting: updatedRecord.roast_tasting,
        updated_at: new Date().toISOString(),
      })
      .eq('id', updatedRecord.id);
    if (recordError) {
      setError('記録の更新に失敗しました');
      return;
    }
    router.push(`/records/roast/${updatedRecord.id}`);
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">焙煎記録の編集</h1>
      <RoastForm initialData={record} onSubmit={handleSubmit} />
    </div>
  );
} 