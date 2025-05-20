"use client";

import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import RoastingRecordForm from '@/components/RoastingRecordForm';
import { TastingRecord } from '@/types/tasting';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewRoastRecord() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (form: TastingRecord) => {
    setLoading(true);
    setError(null);
    if (!form.environment.date || !form.coffee.name) {
      setError('焙煎日と豆名は必須です');
      setLoading(false);
      return;
    }
    const { error } = await supabase
      .from('roast_records')
      .insert([
        {
          roasted_at: form.environment.date,
          bean_name: form.coffee.name,
          roast_level: form.coffee.roastLevel,
          color_meter: null, // 今後拡張
          notes: form.notes,
          user_id: form.id, // ユーザーIDの扱いは今後調整
        },
      ]);
    if (error) {
      setError('保存に失敗しました: ' + error.message);
      setLoading(false);
      return;
    }
    router.push('/roast_records');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">焙煎記録 新規作成</h1>
      <RoastingRecordForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
} 