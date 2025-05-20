"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Note } from '@/types/tasting';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NoteDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
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
      setNote(data);
      setLoading(false);
    };
    if (id) fetchNote();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!note) return <div className="p-8 text-center">ノートが見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{note.title}</h1>
      <div className="mb-2 text-gray-600 text-xs">作成日: {note.created_at ? new Date(note.created_at).toLocaleString('ja-JP') : ''}</div>
      <div className="mb-4 text-gray-600 text-xs">更新日: {note.updated_at ? new Date(note.updated_at).toLocaleString('ja-JP') : ''}</div>
      <div className="mb-8 whitespace-pre-line text-gray-900 bg-white p-4 rounded shadow">{note.content}</div>
      <button
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/notes')}
      >一覧に戻る</button>
    </div>
  );
} 