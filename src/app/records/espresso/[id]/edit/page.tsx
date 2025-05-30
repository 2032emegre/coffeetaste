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

// ダミーデータ（Supabase espresso_recordsに準拠）
const dummyRecord: EspressoRecord = {
  id: '1',
  environment: { date: '2025-05-21', time: '10:00', weather: '晴れ', temperature: 22, humidity: '50%', isAutoFetched: false },
  coffee: { name: 'CarlosAndres', origin: 'コロンビア', process: 'FullyWashed', variety: 'castillo', roastLevel: '中煎り', roastedAt: new Date(), roastDate: '2025-05-15', otherInfo: '' },
  brewing: { type: 'espresso', dripper: '', grinder: 'Timemore', grindSetting: '2.5', coffeeAmount: '18', yield: '36', brewTime: '0:30', temperature: '93', pressure: '9', notes: '良い抽出', flair: false, flairMemo: '' },
  crema: { color: 4, thickness: 4, persistence: 4, notes: 'きれいなクレマ' },
  tasting: { acidity: 4, sweetness: 4, richness: 4, body: 4, balance: 4, cleanliness: 4, aftertaste: 4, totalScore: 31 },
  nose: { positive: {}, negative: {}, notes: '' },
  aroma: { positive: {}, negative: {}, notes: '' },
  personalScore: 88,
  comments: 'バランス良し',
  notes: '',
  created_at: '2025-05-21T10:00:00Z',
};

export default function EspressoEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [record, setRecord] = useState<EspressoRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
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
      }).eq('id', (record as any).environment_id);
      await supabase.from('coffees').update({
        name: data.coffee.name,
        origin: data.coffee.origin,
        process: data.coffee.process,
        variety: data.coffee.variety,
        roast_level: data.coffee.roastLevel,
        roasted_at: data.coffee.roastedAt,
        roast_date: data.coffee.roastDate,
        other_info: data.coffee.otherInfo,
      }).eq('id', (record as any).coffee_id);
      // espresso_records本体をupdate
      const { error } = await supabase.from('espresso_records').update({
        brewing: data.brewing,
        crema: data.crema,
        tasting: data.tasting,
        nose: data.nose,
        aroma: data.aroma,
        personalScore: data.personalScore,
        comments: data.comments,
        notes: data.notes,
      }).eq('id', params.id);
      setSaving(false);
      if (error) {
        setError('保存に失敗しました: ' + error.message);
        return;
      }
      router.push('/records/espresso');
    } catch (e: any) {
      setSaving(false);
      setError('保存に失敗しました: ' + (e.message || ''));
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
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>
      <EspressoForm
        initialData={record}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
} 