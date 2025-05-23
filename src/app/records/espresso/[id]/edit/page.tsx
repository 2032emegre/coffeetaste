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
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">環境情報</h2>
        <EnvironmentInfo formData={record} onChange={handleChange} mode="edit" recordType="espresso" />
      </section>

      {/* コーヒー情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">コーヒー情報</h2>
        <CoffeeInfo formData={record} onChange={handleChange} mode="edit" />
      </section>

      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
            <select
              value={record.brewing.type}
              onChange={(e) => handleChange('brewing.type', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
              <option value="single">シングル</option>
              <option value="double">ダブル</option>
              <option value="ristretto">リストレット</option>
              <option value="lungo">ルンゴ</option>
              <option value="other">その他</option>
            </select>
            {record.brewing.type === 'other' && (
              <input
                type="text"
                value={record.brewing.typeOther || ''}
                onChange={(e) => handleChange('brewing.typeOther', e.target.value)}
                placeholder="種類を入力"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
            <input
              type="text"
              value={record.brewing.grinder}
              onChange={(e) => handleChange('brewing.grinder', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
            <input
              type="text"
              value={record.brewing.grindSetting}
              onChange={(e) => handleChange('brewing.grindSetting', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">豆量 (g)</label>
            <input
              type="number"
              value={record.brewing.coffeeAmount}
              onChange={(e) => handleChange('brewing.coffeeAmount', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出量 (g)</label>
            <input
              type="number"
              value={record.brewing.yield}
              onChange={(e) => handleChange('brewing.yield', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間</label>
            <input
              type="text"
              value={record.brewing.brewTime}
              onChange={(e) => handleChange('brewing.brewTime', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">温度</label>
            <input
              type="number"
              value={record.brewing.temperature}
              onChange={(e) => handleChange('brewing.temperature', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">圧力</label>
            <input
              type="number"
              value={record.brewing.pressure}
              onChange={(e) => handleChange('brewing.pressure', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
            <textarea
              value={record.brewing.notes || ''}
              onChange={(e) => handleChange('brewing.notes', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>
      </section>

      {/* クレマ評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">クレマ評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">色</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.crema.color}
                  onChange={(e) => handleChange('crema.color', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">厚さ</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.crema.thickness}
                  onChange={(e) => handleChange('crema.thickness', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">持続性</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.crema.persistence}
                  onChange={(e) => handleChange('crema.persistence', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
              <textarea
                value={record.crema.notes || ''}
                onChange={(e) => handleChange('crema.notes', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">酸味</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.acidity}
                  onChange={(e) => handleChange('tasting.acidity', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">甘味</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.sweetness}
                  onChange={(e) => handleChange('tasting.sweetness', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">コク</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.richness}
                  onChange={(e) => handleChange('tasting.richness', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ボディ</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.body}
                  onChange={(e) => handleChange('tasting.body', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">バランス</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.balance}
                  onChange={(e) => handleChange('tasting.balance', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">クリーン度</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.cleanliness}
                  onChange={(e) => handleChange('tasting.cleanliness', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">余韻</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={record.tasting.aftertaste}
                  onChange={(e) => handleChange('tasting.aftertaste', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">総合評価</label>
                <div className="mt-1 text-gray-900">
                  {record.tasting.totalScore}/35
                </div>
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
            <AromaSection type="nose" formData={record} onChange={handleChange} mode="edit" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">LES ARÔMES</h3>
            <AromaSection type="aroma" formData={record} onChange={handleChange} mode="edit" />
          </div>
        </div>
      </section>

      {/* コメント */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">コメント</h2>
        <textarea
          value={record.comments || ''}
          onChange={(e) => handleChange('comments', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        />
      </section>

      {/* メモ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">メモ</h2>
        <textarea
          value={record.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        />
      </section>
    </form>
  );
} 