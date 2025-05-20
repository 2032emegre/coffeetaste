"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TastingRecord } from "@/types/tasting";
import { createClient } from '@supabase/supabase-js';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import AromaSection from '@/components/AromaSection';
import CoffeeInfo from '@/components/CoffeeInfo';

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

  const handleEnvironmentChange = (key: keyof TastingRecord['environment'], value: any) => {
    // 詳細表示モードでは変更を無視
  };

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative', key: string, value: boolean | string) => {
    // 詳細表示モードでは変更を無視
  };

  const handleCoffeeChange = (key: keyof TastingRecord['coffee'], value: any) => {
    // 詳細表示モードでは変更を無視
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">テイスティング記録詳細</h1>
      {record && (
        <>
          <EnvironmentInfo
            formData={record}
            onChange={handleEnvironmentChange}
            mode="view"
          />

          <CoffeeInfo
            formData={record}
            onChange={handleCoffeeChange}
            mode="view"
          />

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
          <AromaSection
            type="nose"
            formData={record}
            onChange={handleAromaChange}
            mode="view"
          />
          {/* アロマ（LES ARÔMES） */}
          <AromaSection
            type="aroma"
            formData={record}
            onChange={handleAromaChange}
            mode="view"
          />
          {/* 総合評価 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-1">個人スコア</span>
              <div className="text-lg font-bold text-gray-900">{record.personalScore} / 100</div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">評価・気づき</span>
              <div className="whitespace-pre-wrap text-gray-900">{record.comments || '記録なし'}</div>
            </div>
          </section>
        </>
      )}
      <button
        className="mt-8 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/records')}
      >
        一覧に戻る
      </button>
    </div>
  );
} 