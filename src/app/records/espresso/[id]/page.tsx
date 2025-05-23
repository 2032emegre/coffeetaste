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
            onClick={() => router.push('/records/espresso')}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            一覧に戻る
          </button>
        </div>
      </div>

      {/* 環境情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">環境情報</h2>
        <EnvironmentInfo formData={record} onChange={() => {}} mode="view" recordType="espresso" />
      </section>

      {/* コーヒー情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">コーヒー情報</h2>
        <CoffeeInfo formData={record} onChange={() => {}} mode="view" />
      </section>

      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">種類</span>
            <div className="text-gray-900">
              {record.brewing.type === 'other' ? record.brewing.typeOther : record.brewing.type}
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">グラインダー</span>
            <div className="text-gray-900">{record.brewing.grinder}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">挽き目</span>
            <div className="text-gray-900">{record.brewing.grindSetting}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">豆量 (g)</span>
            <div className="text-gray-900">{record.brewing.coffeeAmount}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出量 (g)</span>
            <div className="text-gray-900">{record.brewing.yield}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">抽出時間</span>
            <div className="text-gray-900">{record.brewing.brewTime}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">温度</span>
            <div className="text-gray-900">{record.brewing.temperature}</div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">圧力</span>
            <div className="text-gray-900">{record.brewing.pressure}</div>
          </div>
          {record.brewing.notes && (
            <div className="col-span-full">
              <span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>
              <div className="text-gray-900 whitespace-pre-wrap">{record.brewing.notes}</div>
            </div>
          )}
        </div>
      </section>

      {/* クレマ評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">クレマ評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">色</span>
                <div className="text-gray-900">{record.crema.color}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">厚さ</span>
                <div className="text-gray-900">{record.crema.thickness}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">持続性</span>
                <div className="text-gray-900">{record.crema.persistence}/5</div>
              </div>
            </div>
            {record.crema.notes && (
              <div className="mt-4">
                <span className="block text-sm font-medium text-gray-700 mb-1">メモ</span>
                <div className="text-gray-900 whitespace-pre-wrap">{record.crema.notes}</div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <div className="w-64 h-64">
              <RadarChart tasting={cremaTasting} />
            </div>
          </div>
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">酸味</span>
                <div className="text-gray-900">{record.tasting.acidity}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">甘味</span>
                <div className="text-gray-900">{record.tasting.sweetness}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">コク</span>
                <div className="text-gray-900">{record.tasting.richness}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">ボディ</span>
                <div className="text-gray-900">{record.tasting.body}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">バランス</span>
                <div className="text-gray-900">{record.tasting.balance}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">クリーン度</span>
                <div className="text-gray-900">{record.tasting.cleanliness}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">余韻</span>
                <div className="text-gray-900">{record.tasting.aftertaste}/5</div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">総合評価</span>
                <div className="text-gray-900">{record.tasting.totalScore}/35</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-64 h-64">
              <RadarChart tasting={record.tasting} />
            </div>
          </div>
        </div>
      </section>

      {/* 香り評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">香り評価</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">LE NEZ</h3>
            <AromaSection type="nose" formData={record} onChange={() => {}} mode="view" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">LES ARÔMES</h3>
            <AromaSection type="aroma" formData={record} onChange={() => {}} mode="view" />
          </div>
        </div>
      </section>

      {/* コメント */}
      {record.comments && (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">コメント</h2>
          <div className="text-gray-900 whitespace-pre-wrap">{record.comments}</div>
        </section>
      )}

      {/* メモ */}
      {record.notes && (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">メモ</h2>
          <div className="text-gray-900 whitespace-pre-wrap">{record.notes}</div>
        </section>
      )}
    </div>
  );
} 