"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopVisitRecord } from "@/types/tasting";
import RadarChart from "@/components/RadarChart";
import { createClient } from '@supabase/supabase-js';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import TastingSection from '@/components/TastingSection';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function mapRecordFromSupabase(row: any): ShopVisitRecord {
  return {
    id: row.id,
    environment: {
      date: row.date,
      time: row.time,
      weather: row.weather,
      temperature: row.temperature,
      humidity: row.humidity?.toString() ?? '',
      isAutoFetched: false,
    },
    shop: {
      name: row.shop_name,
      link: row.shop_link,
    },
    items: row.items || [],
    tasting: row.tasting || {
      acidity: 0,
      sweetness: 0,
      body: 0,
      richness: 0,
      balance: 0,
      cleanness: 0,
      aftertaste: 0,
      totalScore: 0,
    },
    comments: row.comments || '',
    staffInfo: row.staff_info || '',
    created_at: row.created_at,
  };
}

export default function ShopVisitDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('shop_visit_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setRecord(null);
        setLoading(false);
        return;
      }
      setRecord(mapRecordFromSupabase(data));
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">店舗来店記録 詳細</h1>
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* 環境情報 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">環境情報</h2>
          <EnvironmentInfo formData={record} onChange={() => {}} mode="view" recordType="shop" />
        </div>
        {/* 店舗情報 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">店舗情報</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="text-lg font-bold text-gray-900">{record.shop.name}</div>
            {record.shop.link && (
              <a href={record.shop.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline ml-2">店舗リンク</a>
            )}
          </div>
        </div>
        {/* 飲み物リスト */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">飲み物リスト</h2>
          <ul className="list-disc list-inside space-y-1">
            {record.items.map((item, idx) => (
              <li key={idx} className="font-normal">
                <span className="font-bold">{item.name}</span>
                {item.price && <span className="ml-2 text-gray-500">(¥{item.price})</span>}
                {item.type === 'coffee' && item.origin && (
                  <span className="ml-2 text-xs text-gray-500">{item.origin} / {item.roastLevel} / {item.variety}</span>
                )}
                {item.method && <span className="ml-2 text-xs text-gray-500">({item.method}{item.methodOther ? `: ${item.methodOther}` : ''})</span>}
              </li>
            ))}
          </ul>
        </div>
        {/* テイスティング評価 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">テイスティング評価</h2>
          <TastingSection tasting={record.tasting} onChange={() => {}} />
          <div className="flex justify-center items-center my-6">
            <RadarChart tasting={{
              acidity: record.tasting.acidity,
              sweetness: record.tasting.sweetness,
              richness: record.tasting.richness ?? 0,
              body: record.tasting.body,
              balance: record.tasting.balance,
              cleanliness: record.tasting.cleanliness ?? 0,
              aftertaste: record.tasting.aftertaste,
            }} />
          </div>
        </div>
        {/* コメント・スタッフ情報 */}
        <div className="mb-4">
          <div className="font-bold text-gray-900 mb-1">コメント</div>
          <div className="whitespace-pre-wrap text-gray-700">{record.comments}</div>
        </div>
        {record.staffInfo && (
          <div className="mb-2 text-gray-500">
            <span className="font-medium">スタッフ情報: </span>{record.staffInfo}
          </div>
        )}
      </section>
      <button
        className="mt-8 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/records?tab=shop')}
      >
        一覧に戻る
      </button>
    </div>
  );
} 