"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { RoastRecord } from '@/types/tasting';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditRoastRecord() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<RoastRecord>>({
    roasted_at: new Date(),
    bean_name: '',
    roast_level: '',
    color_meter: null,
    notes: '',
    user_id: '',
  });
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
      setForm(data);
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.roasted_at || !form.bean_name) {
      setError('焙煎日と豆名は必須です');
      return;
    }
    const { error } = await supabase
      .from('roast_records')
      .update({
        roasted_at: form.roasted_at,
        bean_name: form.bean_name,
        roast_level: form.roast_level,
        color_meter: form.color_meter,
        notes: form.notes,
        user_id: form.user_id,
      })
      .eq('id', id);
    if (error) {
      setError('保存に失敗しました: ' + error.message);
      return;
    }
    router.push(`/roast_records/${id}`);
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">焙煎記録編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">焙煎日</label>
          <input
            type="date"
            value={form.roasted_at ? new Date(form.roasted_at).toISOString().split('T')[0] : ''}
            onChange={e => setForm({ ...form, roasted_at: new Date(e.target.value) })}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">豆名</label>
          <input
            type="text"
            value={form.bean_name ?? ''}
            onChange={e => setForm({ ...form, bean_name: e.target.value })}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">焙煎度</label>
          <input
            type="text"
            value={form.roast_level ?? ''}
            onChange={e => setForm({ ...form, roast_level: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">色度</label>
          <input
            type="number"
            value={form.color_meter ?? ''}
            onChange={e => setForm({ ...form, color_meter: e.target.value ? Number(e.target.value) : null })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">メモ</label>
          <textarea
            value={form.notes ?? ''}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >保存</button>
      </form>
    </div>
  );
} 