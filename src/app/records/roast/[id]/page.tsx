"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RadarChart from '@/components/RadarChart';
import { createClient } from '@supabase/supabase-js';

export default function RoastRecordDetail() {
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

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  // 日付フォーマット
  const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString('ja-JP') : '-';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">焙煎記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/roast/${id}/edit`)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.push('/records?tab=roast')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            戻る
          </button>
        </div>
      </div>

      {/* 環境情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎日</span>
            <div className="text-gray-900">
              {formatDate(record.roast_date)}
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">場所</span>
            <div className="text-gray-900">{record.environment?.location ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">気温</span>
            <div className="text-gray-900">{record.environment?.temperature ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">湿度</span>
            <div className="text-gray-900">{record.environment?.humidity ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">気圧</span>
            <div className="text-gray-900">{record.environment?.pressure ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>
            <div className="text-gray-900">{record.environment?.notes ?? '-'}</div>
          </div>
        </div>
      </section>

      {/* コーヒー情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">コーヒー情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">豆名</span>
            <div className="text-gray-900">{record.coffee?.name ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">産地</span>
            <div className="text-gray-900">{record.coffee?.origin ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">品種</span>
            <div className="text-gray-900">{record.coffee?.variety ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">精製方法</span>
            <div className="text-gray-900">{record.coffee?.process ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">農園</span>
            <div className="text-gray-900">{record.coffee?.farm ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">標高</span>
            <div className="text-gray-900">{record.coffee?.elevation ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">収穫日</span>
            <div className="text-gray-900">{formatDate(record.coffee?.harvest_date)}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>
            <div className="text-gray-900">{record.coffee?.notes ?? '-'}</div>
          </div>
        </div>
      </section>

      {/* 焙煎プロセス */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎プロセス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎度</span>
            <div className="text-gray-900">{record.roast_level ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎時間（分）</span>
            <div className="text-gray-900">{record.roast_time ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎前重量（g）</span>
            <div className="text-gray-900">{record.roast_weight_before ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎後重量（g）</span>
            <div className="text-gray-900">{record.roast_weight_after ?? '-'}</div>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-gray-700 mb-1">焙煎メモ</span>
            <div className="text-gray-900 whitespace-pre-wrap">{record.roast_notes ?? '-'}</div>
          </div>
        </div>
      </section>

      {/* 焙煎後の抽出 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎後の抽出</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出方法</span>
            <div className="text-gray-900">{record.roast_brewing?.method ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">粉の粗さ</span>
            <div className="text-gray-900">{record.roast_brewing?.grind_size ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">お湯の温度（℃）</span>
            <div className="text-gray-900">{record.roast_brewing?.water_temp ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">粉水比</span>
            <div className="text-gray-900">{record.roast_brewing?.ratio ?? '-'}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出時間（秒）</span>
            <div className="text-gray-900">{record.roast_brewing?.extraction_time ?? '-'}</div>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出メモ</span>
            <div className="text-gray-900 whitespace-pre-wrap">{record.roast_brewing?.notes ?? '-'}</div>
          </div>
        </div>
      </section>

      {/* 焙煎後のアロマ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎後のアロマ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(record.roast_aroma || {}).map(([key, value]) => (
            <div key={key}>
              <span className="block text-sm font-medium text-gray-700 mb-1">{key}</span>
              <div className="text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">レーダーチャート</h3>
            <div className="h-96">
              <RadarChart tasting={record.roast_tasting} mode="roast" />
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(record.roast_tasting || {}).map(([key, value]) => (
              key === 'notes' ? (
                <div key={key}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">メモ</h3>
                  <div className="text-gray-700 whitespace-pre-wrap">{value}</div>
            </div>
              ) : (
                <div key={key}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{key}</h3>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            </div>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 