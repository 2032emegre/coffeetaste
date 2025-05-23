'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import RadarChart from '@/components/RadarChart';
import AromaSection from '@/components/AromaSection';

export default function EspressoRecordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<EspressoRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('espresso_records')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('記録の取得に失敗:', error);
        setLoading(false);
        return;
      }

      if (data) {
        // データの形式をEspressoRecord型に変換
        const formattedRecord: EspressoRecord = {
          id: data.id,
          environment: {
            date: data.environment_date,
            time: data.environment_time,
            weather: data.environment_weather,
            temperature: data.environment_temperature,
            humidity: data.environment_humidity,
            isAutoFetched: data.environment_is_auto_fetched
          },
          coffee: {
            name: data.coffee_name,
            origin: data.coffee_origin,
            process: data.coffee_process,
            variety: data.coffee_variety,
            roastLevel: data.coffee_roast_level,
            roastedAt: data.coffee_roasted_at,
            roastDate: data.coffee_roast_date,
            otherInfo: data.coffee_other_info
          },
          brewing: {
            type: data.brewing_type,
            typeOther: data.brewing_type_other,
            grinder: data.brewing_grinder,
            grindSetting: data.brewing_grind_setting,
            coffeeAmount: data.brewing_coffee_amount,
            yield: data.brewing_yield,
            brewTime: data.brewing_brew_time,
            temperature: data.brewing_temperature,
            pressure: data.brewing_pressure,
            notes: data.brewing_notes
          },
          crema: {
            color: data.crema_color,
            thickness: data.crema_thickness,
            persistence: data.crema_persistence,
            notes: data.crema_notes
          },
          tasting: {
            acidity: data.tasting_acidity,
            sweetness: data.tasting_sweetness,
            richness: data.tasting_richness,
            body: data.tasting_body,
            balance: data.tasting_balance,
            cleanliness: data.tasting_cleanliness,
            aftertaste: data.tasting_aftertaste,
            totalScore: data.tasting_total_score
          },
          nose: {
            positive: data.nose_positive,
            negative: data.nose_negative,
            notes: data.nose_notes
          },
          aroma: {
            positive: data.aroma_positive,
            negative: data.aroma_negative,
            notes: data.aroma_notes
          },
          personalScore: data.personal_score,
          comments: data.comments,
          notes: data.notes,
          created_at: data.created_at
        };
        setRecord(formattedRecord);
      }
      setLoading(false);
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 py-12">読み込み中...</div>;
  }

  if (!record) {
    return <div className="text-center text-gray-500 py-12">記録が見つかりません</div>;
  }

  // クレマのレーダーチャート用データ
  const cremaTasting = {
    acidity: record.crema.color,
    sweetness: record.crema.thickness,
    richness: record.crema.persistence,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">エスプレッソ記録詳細</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/records/espresso/${id}/edit`)}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            編集
          </button>
          <button
            onClick={() => router.push('/records?tab=espresso')}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            一覧に戻る
          </button>
        </div>
      </div>

      {/* 環境情報 */}
      <EnvironmentInfo formData={record} onChange={() => {}} mode="view" recordType="espresso" />

      {/* コーヒー情報 */}
      <CoffeeInfo formData={record} onChange={() => {}} mode="view" />

      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">種類</span>
            <div className="text-gray-900">{record.brewing.type === 'その他' ? record.brewing.typeOther : record.brewing.type}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">豆（g）</span>
            <div className="text-gray-900">{record.brewing.coffeeAmount}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出量（ml）</span>
            <div className="text-gray-900">{record.brewing.yield}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">温度（℃）</span>
            <div className="text-gray-900">{record.brewing.temperature}</div>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>
            <div className="text-gray-900 whitespace-pre-wrap">{record.brewing.notes}</div>
          </div>
        </div>
      </section>

      {/* LE NEZ（香り） */}
      <AromaSection type="nose" formData={record} onChange={() => {}} mode="view" />

      {/* LES ARÔMES（アロマ） */}
      <AromaSection type="aroma" formData={record} onChange={() => {}} mode="view" />

      {/* クレマ評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">クレマ評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: 'color', label: '色（淡→濃）', value: record.crema.color },
            { key: 'thickness', label: '厚み', value: record.crema.thickness },
            { key: 'persistence', label: '持続性', value: record.crema.persistence },
          ].map(({ key, label, value }) => (
            <div key={key}>
              <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
              <div className="text-gray-900">{value}/5</div>
            </div>
          ))}
          <div className="md:col-span-3 flex justify-center items-center">
            <div className="w-64 h-64">
              <RadarChart tasting={cremaTasting} mode="crema" />
            </div>
          </div>
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'acidity', label: '酸味', value: record.tasting.acidity },
            { key: 'bitterness', label: '苦味', value: record.tasting.bitterness },
            { key: 'sweetness', label: '甘み', value: record.tasting.sweetness },
            { key: 'body', label: 'ボディ', value: record.tasting.body },
            { key: 'clarity', label: 'クリア度', value: record.tasting.clarity },
            { key: 'balance', label: 'バランス', value: record.tasting.balance },
            { key: 'aftertaste', label: '余韻', value: record.tasting.aftertaste },
          ].map(({ key, label, value }) => (
            <div key={key}>
              <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
              <div className="text-gray-900">{value}/5</div>
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center items-center">
            <div className="w-64 h-64">
              <RadarChart tasting={record.tasting} mode="espresso-taste" />
            </div>
          </div>
        </div>
      </section>

      {/* 総合評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
        <div className="space-y-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">個人スコア (0-100)</span>
            <div className="text-2xl font-bold text-gray-900">{record.personalScore}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">評価点数（クレマ＋テイスティング合計）</span>
            <div className="text-2xl font-bold text-gray-900">{(record.crema.color + record.crema.thickness + record.crema.persistence + record.tasting.acidity + record.tasting.bitterness + record.tasting.sweetness + record.tasting.body + record.tasting.clarity + record.tasting.balance + record.tasting.aftertaste) || 0}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">評価・気づき</span>
            <div className="text-gray-900 whitespace-pre-wrap">{record.comments || '記録なし'}</div>
          </div>
        </div>
      </section>
    </div>
  );
} 