"use client";

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { Note } from '@/types/tasting';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError('取得に失敗しました: ' + error.message);
        setLoading(false);
        return;
      }
      setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('本当にこのノートを削除しますか？')) return;
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    if (error) {
      alert('削除に失敗しました: ' + error.message);
      return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ノート一覧</h1>
      <Link href="/notes/new" className="mb-4 inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700">新規作成</Link>
      {loading ? (
        <div className="text-center text-gray-500 py-12">読み込み中...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : (
        <table className="w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr>
              <th className="px-2 py-1 border">タイトル</th>
              <th className="px-2 py-1 border">作成日</th>
              <th className="px-2 py-1 border">更新日</th>
              <th className="px-2 py-1 border">操作</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n) => (
              <tr key={n.id} className="border-t">
                <td className="px-2 py-1">{n.title}</td>
                <td className="px-2 py-1">{n.created_at ? new Date(n.created_at).toLocaleDateString('ja-JP') : ''}</td>
                <td className="px-2 py-1">{n.updated_at ? new Date(n.updated_at).toLocaleDateString('ja-JP') : ''}</td>
                <td className="px-2 py-1">
                  <a href={`/notes/${n.id}`} className="text-blue-600 underline mr-2">詳細</a>
                  <a href={`/notes/${n.id}/edit`} className="text-green-600 underline mr-2">編集</a>
                  <button onClick={() => handleDelete(n.id)} className="text-red-600 underline">削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 