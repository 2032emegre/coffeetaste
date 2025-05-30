"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopVisitRecord } from "@/types/tasting";
import RadarChart from "@/components/RadarChart";
import { createClient } from '@supabase/supabase-js';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import TastingSection from '@/components/TastingSection';
import ShopVisitForm from '@/components/ShopVisitForm';
import { fromSupabaseRow } from '@/utils/supabase';

export default function ShopVisitDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = useParams();
  const [record, setRecord] = useState<ShopVisitRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchRecord = async () => {
      setLoading(true);
      // shop_visits本体取得
      const { data, error } = await supabase
        .from('shop_visits')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setRecord(null);
        setLoading(false);
        return;
      }
      // environment参照
      let environment = undefined;
      if (data.environment_id) {
        const { data: envData } = await supabase
          .from('environments')
          .select('*')
          .eq('id', data.environment_id)
          .single();
        environment = envData;
      }
      // fromSupabaseRowで変換し、environmentを上書き
      const recordObj = fromSupabaseRow(data);
      if (environment) {
        recordObj.environment = {
          date: environment.date,
          time: environment.time,
          weather: environment.weather,
          temperature: environment.temperature,
          humidity: environment.humidity,
          isAutoFetched: environment.is_auto_fetched,
        };
      }
      setRecord(recordObj);
    setLoading(false);
    };
    fetchRecord();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">店舗来店記録 詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/shop/${record.id}/edit`)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            戻る
          </button>
        </div>
      </div>
      <ShopVisitForm
        initialData={record}
        onSubmit={() => Promise.resolve()}
        isSubmitting={false}
        submitError={null}
        mode="view"
      />
    </div>
  );
} 