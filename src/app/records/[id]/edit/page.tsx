"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { TastingRecord } from "@/types/tasting";
import { createClient } from '@supabase/supabase-js';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import AromaSection from '@/components/AromaSection';
import CoffeeInfo from '@/components/CoffeeInfo';
// Firestore連携やAPI取得は後で追加

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditRecord() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 仮の初期値（本来はAPIやDBから取得）
  const [formData, setFormData] = useState<TastingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // テイスティング項目
  const tastingFields = [
    { key: 'acidity' as const, label: '酸味' },
    { key: 'sweetness' as const, label: '甘味' },
    { key: 'richness' as const, label: '濃厚さ' },
    { key: 'body' as const, label: 'ボディ' },
    { key: 'balance' as const, label: 'バランス' },
    { key: 'cleanliness' as const, label: 'クリーン度' },
    { key: 'aftertaste' as const, label: '余韻' },
  ];
  const positiveAromas = [
    { key: 'nuts' as const, label: 'ナッツ' },
    { key: 'redFruits' as const, label: '赤い果実' },
    { key: 'stoneFruits' as const, label: '核果' },
    { key: 'herbs' as const, label: '草葉' },
    { key: 'tropicalFruits' as const, label: 'トロピカルフルーツ' },
    { key: 'citrus' as const, label: '柑橘類' },
    { key: 'flowers' as const, label: '花' },
    { key: 'spices' as const, label: 'スパイス' },
  ];
  const negativeAromas = [
    { key: 'tobacco' as const, label: 'タバコ' },
    { key: 'burnt' as const, label: '焦げ臭' },
    { key: 'herbs' as const, label: '草葉' },
    { key: 'woody' as const, label: '樹木' },
  ];

  // 合計スコア計算
  const calculateTotalScore = (tastingScores: TastingRecord['tasting']) => {
    if (!tastingScores) return 0;
    return Object.values(tastingScores).reduce((sum, score) => {
      if (typeof score === 'number' && score !== tastingScores.totalScore) {
        return sum + score;
      }
      return sum;
    }, 0);
  };

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasting_records')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        alert('記録の取得に失敗しました');
        setLoading(false);
        return;
      }
      setFormData(data);
      setLoading(false);
    };
    if (id) fetchRecord();
  }, [id]);

  if (loading || !formData) return <div>読み込み中...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    // idを除外してupdateする
    const { id, ...updateData } = formData;
    const { error } = await supabase
      .from('tasting_records')
      .update({
        environment: updateData.environment,
        coffee: updateData.coffee,
        brewing: updateData.brewing,
        tasting: updateData.tasting,
        nose: updateData.nose,
        aroma: updateData.aroma,
        personalScore: updateData.personalScore,
        comments: updateData.comments,
        notes: updateData.notes,
      })
      .eq('id', id);
    if (error) {
      alert('編集内容の保存に失敗しました: ' + (error.message || error.details || ''));
      console.error('編集エラー:', error);
      return;
    }
    alert('編集内容を保存しました');
    window.location.href = '/records';
  };

  const ActionButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
    >
      {children}
    </button>
  );

  // 天気・気温自動取得
  const fetchWeather = async () => {
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const res = await fetch('/api/weather');
      if (!res.ok) throw new Error('天気情報の取得に失敗しました');
      const data = await res.json();
      if (!formData) return;
      setFormData({
        ...formData,
        environment: {
          ...formData.environment,
          weather: data.weather || '',
          temperature: data.temperature !== '' ? Number(data.temperature) : null,
        },
      });
    } catch (e: any) {
      setWeatherError(e.message || '天気情報の取得に失敗しました');
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleEnvironmentChange = (key: keyof TastingRecord['environment'], value: any) => {
    if (!formData) return;
    setFormData(prev => ({
      ...prev!,
      environment: {
        ...prev!.environment,
        [key]: value
      }
    }));
  };

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative', key: string, value: boolean | string) => {
    if (!formData) return;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [type]: {
          ...prev[type],
          [field]: {
            ...prev[type][field],
            [key]: value,
          },
        },
      } as TastingRecord;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">記録の編集</h1>
      {formData && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <EnvironmentInfo
            formData={formData}
            onChange={handleEnvironmentChange}
            mode="edit"
          />
          {/* コーヒー情報 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">コーヒー情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">コーヒー名</label>
                <input
                  type="text"
                  value={formData.coffee.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        name: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">産地</label>
                <input
                  type="text"
                  value={formData.coffee.origin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        origin: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">精製方式</label>
                <input
                  type="text"
                  value={formData.coffee.process}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        process: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">品種</label>
                <input
                  type="text"
                  value={formData.coffee.variety}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        variety: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">焙煎日</label>
                <input
                  type="date"
                  value={formData.coffee.roastDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        roastDate: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">その他の情報</label>
                <input
                  type="text"
                  value={formData.coffee.otherInfo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coffee: {
                        ...formData.coffee,
                        otherInfo: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>
          </section>

          {/* 抽出レシピ */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ドリッパー</label>
                <input
                  type="text"
                  value={formData.brewing.dripper}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        dripper: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
                <input
                  type="text"
                  value={formData.brewing.grinder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        grinder: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
                <input
                  type="text"
                  value={formData.brewing.grindSetting}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        grindSetting: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">温度</label>
                <input
                  type="text"
                  value={formData.brewing.temperature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        temperature: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">コーヒー豆 (g)</label>
                <input
                  type="text"
                  value={formData.brewing.coffeeAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        coffeeAmount: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">湯量 (ml)</label>
                <input
                  type="text"
                  value={formData.brewing.waterAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        waterAmount: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間</label>
                <input
                  type="text"
                  value={formData.brewing.brewTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        brewTime: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">蒸らし時間</label>
                <input
                  type="text"
                  value={formData.brewing.bloomTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        bloomTime: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">蒸らし量</label>
                <input
                  type="text"
                  value={formData.brewing.bloomAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        bloomAmount: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
                <textarea
                  value={formData.brewing.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        notes: e.target.value,
                      },
                    } as TastingRecord)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* テイスティング評価 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tastingFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData.tasting[field.key]}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        tasting: {
                          ...formData.tasting,
                          [field.key]: newValue,
                          totalScore: calculateTotalScore({
                            ...formData.tasting,
                            [field.key]: newValue,
                          }),
                        },
                      } as TastingRecord);
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合計スコア</label>
                <input
                  type="number"
                  value={formData.tasting.totalScore}
                  readOnly
                  className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
              </div>
            </div>
          </section>

          {/* LE NEZ */}
          <AromaSection
            type="nose"
            formData={formData}
            onChange={handleAromaChange}
            mode="edit"
          />

          {/* LES ARÔMES */}
          <AromaSection
            type="aroma"
            formData={formData}
            onChange={handleAromaChange}
            mode="edit"
          />

          {/* 総合評価 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                    value={formData.personalScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalScore: Number(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#111' }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.personalScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalScore: Number(e.target.value),
                      })
                    }
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-center"
                  />
                  <span className="text-2xl font-bold text-gray-900 w-16 text-right">{formData.personalScore}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">評価・気づき</label>
                <textarea
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      comments: e.target.value,
                    })
                  }
                  placeholder="コメントや気づき、改善点などを記入してください"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  rows={6}
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/records')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              保存
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 