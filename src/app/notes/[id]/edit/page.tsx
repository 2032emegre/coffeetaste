"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Note } from '@/types/tasting';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Note>>({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setError('ノートの取得に失敗しました');
        setLoading(false);
        return;
      }
      setForm({ title: data.title, content: data.content });
      setLoading(false);
    };
    if (id) fetchNote();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      setError('タイトルと内容は必須です');
      return;
    }
    const { error } = await supabase
      .from('notes')
      .update({
        title: form.title,
        content: form.content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (error) {
      setError('保存に失敗しました: ' + error.message);
      return;
    }
    router.push(`/notes/${id}`);
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ノート編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">タイトル</label>
          <input
            type="text"
            value={form.title ?? ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">内容</label>
          <textarea
            value={form.content ?? ''}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded px-2 py-1"
            rows={6}
            required
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