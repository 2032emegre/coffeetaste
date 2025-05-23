'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import RadarChart from '@/components/RadarChart';
import AromaSection from '@/components/AromaSection';

export default function EditEspressoRecord() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<EspressoRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (field: string, value: any) => {
    if (!record) return;

    const newRecord = { ...record };
    const fields = field.split('.');
    let current: any = newRecord;

    for (let i = 0; i < fields.length - 1; i++) {
      current = current[fields[i]];
    }

    current[fields[fields.length - 1]] = value;
    setRecord(newRecord);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;

    setSaving(true);
    const { error } = await supabase
      .from('espresso_records')
      .update({
        environment_date: record.environment.date,
        environment_time: record.environment.time,
        environment_weather: record.environment.weather,
        environment_temperature: record.environment.temperature,
        environment_humidity: record.environment.humidity,
        environment_is_auto_fetched: record.environment.isAutoFetched,
        coffee_name: record.coffee.name,
        coffee_origin: record.coffee.origin,
        coffee_process: record.coffee.process,
        coffee_variety: record.coffee.variety,
        coffee_roast_level: record.coffee.roastLevel,
        coffee_roasted_at: record.coffee.roastedAt,
        coffee_roast_date: record.coffee.roastDate,
        coffee_other_info: record.coffee.otherInfo,
        brewing_type: record.brewing.type,
        brewing_type_other: record.brewing.typeOther,
        brewing_grinder: record.brewing.grinder,
        brewing_grind_setting: record.brewing.grindSetting,
        brewing_coffee_amount: record.brewing.coffeeAmount,
        brewing_yield: record.brewing.yield,
        brewing_brew_time: record.brewing.brewTime,
        brewing_temperature: record.brewing.temperature,
        brewing_pressure: record.brewing.pressure,
        brewing_notes: record.brewing.notes,
        crema_color: record.crema.color,
        crema_thickness: record.crema.thickness,
        crema_persistence: record.crema.persistence,
        crema_notes: record.crema.notes,
        tasting_acidity: record.tasting.acidity,
        tasting_sweetness: record.tasting.sweetness,
        tasting_richness: record.tasting.richness,
        tasting_body: record.tasting.body,
        tasting_balance: record.tasting.balance,
        tasting_cleanliness: record.tasting.cleanliness,
        tasting_aftertaste: record.tasting.aftertaste,
        tasting_total_score: record.tasting.totalScore,
        nose_positive: record.nose.positive,
        nose_negative: record.nose.negative,
        nose_notes: record.nose.notes,
        aroma_positive: record.aroma.positive,
        aroma_negative: record.aroma.negative,
        aroma_notes: record.aroma.notes,
        personal_score: record.personalScore,
        comments: record.comments,
        notes: record.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('記録の更新に失敗:', error);
      setSaving(false);
      return;
    }

    router.push(`/records/espresso/${id}`);
  };

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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">エスプレッソ記録編集</h1>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/records/espresso/${id}`)}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            キャンセル
          </button>
        </div>
      </div>

      {/* 環境情報 */}
      <EnvironmentInfo formData={record} onChange={handleChange} mode="edit" recordType="espresso" />

      {/* コーヒー情報 */}
      <CoffeeInfo formData={record} onChange={handleChange} mode="edit" />

      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
            <select
              value={record.brewing.type}
              onChange={e => handleChange('brewing.type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
              <option value="">選択してください</option>
              <option value="エスプレッソ">エスプレッソ</option>
              <option value="アメリカーノ">アメリカーノ</option>
              <option value="リストレット">リストレット</option>
              <option value="その他">その他</option>
            </select>
            {record.brewing.type === 'その他' && (
              <input
                type="text"
                value={record.brewing.typeOther || ''}
                onChange={e => handleChange('brewing.typeOther', e.target.value)}
                placeholder="その他の種類を記入"
                className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">豆（g）</label>
            <input
              type="number"
              value={record.brewing.coffeeAmount}
              onChange={e => handleChange('brewing.coffeeAmount', parseFloat(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出量（ml）</label>
            <input
              type="number"
              value={record.brewing.yield}
              onChange={e => handleChange('brewing.yield', parseFloat(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">温度（℃）</label>
            <input
              type="number"
              value={record.brewing.temperature}
              onChange={e => handleChange('brewing.temperature', parseFloat(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input type="checkbox" id="flair" className="mr-2" />
            <label htmlFor="flair" className="text-sm font-medium text-gray-700">flair</label>
            <input type="text" className="w-full ml-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" placeholder="flairでの抽出に関するメモ" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
            <textarea
              value={record.brewing.notes || ''}
              onChange={e => handleChange('brewing.notes', e.target.value)}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>
      </section>

      {/* LE NEZ（香り） */}
      <AromaSection type="nose" formData={record} onChange={handleChange} mode="edit" />

      {/* LES ARÔMES（アロマ） */}
      <AromaSection type="aroma" formData={record} onChange={handleChange} mode="edit" />

      {/* クレマ評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">クレマ評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: 'color', label: '色（淡→濃）' },
            { key: 'thickness', label: '厚み' },
            { key: 'persistence', label: '持続性' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-semibold transition-colors ${record.crema[key] === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                    style={{ aspectRatio: '1 / 1' }}
                    onClick={() => handleChange(`crema.${key}`, v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'acidity', label: '酸味' },
            { key: 'bitterness', label: '苦味' },
            { key: 'sweetness', label: '甘み' },
            { key: 'body', label: 'ボディ' },
            { key: 'clarity', label: 'クリア度' },
            { key: 'balance', label: 'バランス' },
            { key: 'aftertaste', label: '余韻' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-semibold transition-colors ${record.tasting[key] === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                    style={{ aspectRatio: '1 / 1' }}
                    onClick={() => handleChange(`tasting.${key}`, v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 総合評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">個人スコア (0-100)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={record.personalScore}
                onChange={e => handleChange('personalScore', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#111' }}
              />
              <input
                type="number"
                min="0"
                max="100"
                value={record.personalScore}
                onChange={e => handleChange('personalScore', Number(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-center"
              />
              <span className="text-2xl font-bold text-gray-900 w-16 text-right">{record.personalScore}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価・気づき</label>
            <textarea
              value={record.comments || ''}
              onChange={e => handleChange('comments', e.target.value)}
              placeholder="コメントや気づき、改善点などを記入してください"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={6}
            />
          </div>
        </div>
      </section>
    </form>
  );
} 