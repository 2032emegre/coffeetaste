"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TastingRecord } from "@/types/tasting";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RecordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<TastingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasting_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setError('記録の取得に失敗しました' + (error?.message ? ': ' + error.message : '') + (error?.details ? ' ' + error.details : ''));
        setLoading(false);
        return;
      }
      setRecord(data);
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">テイスティング記録詳細</h1>
      {/* 環境情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><span className="block text-sm font-medium text-gray-700 mb-1">日付</span>{record.environment?.date}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">天気</span>{record.environment?.weather}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">気温</span>{record.environment?.temperature}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">時間帯</span>{record.environment?.timeOfDay}</div>
        </div>
      </section>
      {/* コーヒー情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">コーヒー情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><span className="block text-sm font-medium text-gray-700 mb-1">コーヒー名</span>{record.coffee?.name}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">産地</span>{record.coffee?.origin}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">精製方式</span>{record.coffee?.process}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">品種</span>{record.coffee?.variety}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">焙煎日</span>{record.coffee?.roastDate}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">その他の情報</span>{record.coffee?.otherInfo}</div>
        </div>
      </section>
      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><span className="block text-sm font-medium text-gray-700 mb-1">ドリッパー</span>{record.brewing?.dripper}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">グラインダー</span>{record.brewing?.grinder}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">挽き目</span>{record.brewing?.grindSetting}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">温度</span>{record.brewing?.temperature}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">コーヒー豆 (g)</span>{record.brewing?.coffeeAmount}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">湯量 (ml)</span>{record.brewing?.waterAmount}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">抽出時間</span>{record.brewing?.brewTime}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">蒸らし時間</span>{record.brewing?.bloomTime}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">蒸らし量</span>{record.brewing?.bloomAmount}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>{record.brewing?.notes}</div>
        </div>
      </section>
      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><span className="block text-sm font-medium text-gray-700 mb-1">酸味</span>{record.tasting?.acidity}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">甘味</span>{record.tasting?.sweetness}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">濃厚さ</span>{record.tasting?.richness}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">ボディ</span>{record.tasting?.body}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">バランス</span>{record.tasting?.balance}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">クリーン度</span>{record.tasting?.cleanliness}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">余韻</span>{record.tasting?.aftertaste}</div>
          <div><span className="block text-sm font-medium text-gray-700 mb-1">合計スコア</span>{record.tasting?.totalScore} / 35</div>
        </div>
      </section>
      {/* 香り（LE NEZ） */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">LE NEZ（香り）</h2>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">ポジティブノート</span>{Object.entries(record.nose?.positive || {}).filter(([k,v])=>v && k!=="other").map(([k])=>k).join('、')}{record.nose?.positive?.other ? `、その他: ${record.nose.positive.other}` : ''}</div>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">ネガティブノート</span>{Object.entries(record.nose?.negative || {}).filter(([k,v])=>v && k!=="other").map(([k])=>k).join('、')}{record.nose?.negative?.other ? `、その他: ${record.nose.negative.other}` : ''}</div>
        <div><span className="block text-sm font-medium text-gray-700 mb-1">ノート</span>{record.nose?.notes}</div>
      </section>
      {/* アロマ（LES ARÔMES） */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">LES ARÔMES（アロマ）</h2>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">ポジティブノート</span>{Object.entries(record.aroma?.positive || {}).filter(([k,v])=>v && k!=="other").map(([k])=>k).join('、')}{record.aroma?.positive?.other ? `、その他: ${record.aroma.positive.other}` : ''}</div>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">ネガティブノート</span>{Object.entries(record.aroma?.negative || {}).filter(([k,v])=>v && k!=="other").map(([k])=>k).join('、')}{record.aroma?.negative?.other ? `、その他: ${record.aroma.negative.other}` : ''}</div>
        <div><span className="block text-sm font-medium text-gray-700 mb-1">ノート</span>{record.aroma?.notes}</div>
      </section>
      {/* 総合評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">個人スコア</span>{record.personalScore} / 100</div>
        <div className="mb-2"><span className="block text-sm font-medium text-gray-700 mb-1">コメント</span>{record.comments}</div>
        <div><span className="block text-sm font-medium text-gray-700 mb-1">気付き・改善点・比較</span>{record.notes}</div>
      </section>
      <button
        className="mt-8 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/records')}
      >
        一覧に戻る
      </button>
    </div>
  );
} 