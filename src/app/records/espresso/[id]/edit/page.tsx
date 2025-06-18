"use client";

import { useRouter } from 'next/navigation';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import AromaSection from '@/components/AromaSection';
import RadarChart from '@/components/RadarChart';
import { useState, useEffect } from 'react';
import EspressoForm from '@/components/EspressoForm';
import { createClient } from '@supabase/supabase-js';

// UUIDの検証関数
const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export default function EspressoEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [record, setRecord] = useState<EspressoRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // UUIDの検証
    if (!isValidUUID(params.id)) {
      setError('無効なIDです');
      setLoading(false);
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchRecord = async () => {
      setLoading(true);
      setError(null);
      // espresso_recordsから取得
      const { data, error } = await supabase
        .from('espresso_records')
        .select('*')
        .eq('id', params.id)
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
        environment_id: data.environment_id,
        coffee_id: data.coffee_id,
        environment: envRes.data || {},
        coffee: coffeeRes.data || {},
      });
      setLoading(false);
    };
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (data: EspressoRecord) => {
    setSaving(true);
    setError(null);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    try {
      // environment/coffeeをupdate
      await supabase.from('environments').update({
        date: data.environment.date,
        time: data.environment.time,
        weather: data.environment.weather,
        temperature: data.environment.temperature,
        humidity: data.environment.humidity,
        is_auto_fetched: data.environment.isAutoFetched,
      }).eq('id', record!.environment_id);
      await supabase.from('coffees').update({
        name: data.coffee.name,
        origin: data.coffee.origin,
        process: data.coffee.process,
        variety: data.coffee.variety,
        roast_level: data.coffee.roast_level,
        roast_date: data.coffee.roast_date,
        other_info: data.coffee.other_info,
      }).eq('id', record!.coffee_id);
      // espresso_records本体をupdate
      const { error } = await supabase.from('espresso_records').update({
        brewing: data.brewing,
        crema: data.crema,
        tasting: data.tasting,
        nose: data.nose,
        aroma: data.aroma,
        personal_score: data.personal_score,
        comments: data.comments,
        notes: data.notes,
      }).eq('id', params.id);
      setSaving(false);
      if (error) {
        setError('保存に失敗しました: ' + error.message);
        return;
      }
      router.push('/records?tab=espresso');
    } catch (e: any) {
      setSaving(false);
      setError('保存に失敗しました: ' + (e.message || ''));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      // エスプレッソ記録を削除
      await supabase
        .from('espresso_records')
        .delete()
        .eq('id', params.id);
      
      // 環境情報を削除
      if (record?.environment_id) {
        await supabase
          .from('environments')
          .delete()
          .eq('id', record.environment_id);
      }
      
      // コーヒー情報を削除
      if (record?.coffee_id) {
        await supabase
          .from('coffees')
          .delete()
          .eq('id', record.coffee_id);
      }
      
      router.push('/records?tab=espresso');
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  const cremaTasting = {
    acidity: record.crema.color,
    sweetness: record.crema.thickness,
    richness: record.crema.persistence,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">エスプレッソ記録 編集</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            削除
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            キャンセル
          </button>
        </div>
      </div>
      <EspressoForm
        initialData={record}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
} 