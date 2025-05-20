"use client";

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { RoastRecord } from '@/types/tasting';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RoastRecordList() {
  const [records, setRecords] = useState<RoastRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('roast_records')
        .select('*')
        .order('roasted_at', { ascending: false });
      if (error) {
        setError('取得に失敗しました: ' + error.message);
        setLoading(false);
        return;
      }
      setRecords(data || []);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('本当にこの焙煎記録を削除しますか？')) return;
    const { error } = await supabase
      .from('roast_records')
      .delete()
      .eq('id', id);
    if (error) {
      alert('削除に失敗しました: ' + error.message);
      return;
    }
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">焙煎記録一覧</h1>
      <Link href="/roast_records/new" className="mb-4 inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700">新規作成</Link>
      {loading ? (
        <div className="text-center text-gray-500 py-12">読み込み中...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : (
        <table className="w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr>
              <th className="px-2 py-1 border">焙煎日</th>
              <th className="px-2 py-1 border">豆名</th>
              <th className="px-2 py-1 border">焙煎度</th>
              <th className="px-2 py-1 border">色度</th>
              <th className="px-2 py-1 border">メモ</th>
              <th className="px-2 py-1 border">操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-2 py-1">{r.roasted_at ? new Date(r.roasted_at).toLocaleDateString('ja-JP') : ''}</td>
                <td className="px-2 py-1">{r.bean_name}</td>
                <td className="px-2 py-1">{r.roast_level}</td>
                <td className="px-2 py-1">{r.color_meter}</td>
                <td className="px-2 py-1">{r.notes}</td>
                <td className="px-2 py-1">
                  <a href={`/roast_records/${r.id}`} className="text-blue-600 underline mr-2">詳細</a>
                  <a href={`/roast_records/${r.id}/edit`} className="text-green-600 underline mr-2">編集</a>
                  <button onClick={() => handleDelete(r.id)} className="text-red-600 underline">削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 