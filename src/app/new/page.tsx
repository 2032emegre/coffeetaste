'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { TastingRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import AromaSection from '@/components/AromaSection';
import CoffeeInfo from '@/components/CoffeeInfo';

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewRecord() {
  const router = useRouter();
  const [recordType, setRecordType] = useState<'handdrip' | 'espresso' | 'roast' | 'shop'>('handdrip');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TastingRecord>({
    id: '',
    environment: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false }),
      weather: '',
      temperature: null,
      humidity: '',
      isAutoFetched: false,
    },
    coffee: {
      name: '',
      origin: '',
      process: '',
      variety: '',
      roastLevel: '',
      roastedAt: new Date(),
      roastDate: '',
      otherInfo: '',
    },
    brewing: {
      dripper: '',
      grinder: '',
      grindSize: '',
      grindSetting: '',
      temperature: '',
      coffeeAmount: '',
      waterAmount: '',
      brewTime: '',
      bloomTime: '',
      bloomAmount: '',
      notes: '',
    },
    tasting: {
      acidity: 0,
      sweetness: 0,
      richness: 0,
      body: 0,
      balance: 0,
      cleanliness: 0,
      aftertaste: 0,
      totalScore: 0,
    },
    nose: {
      positive: {
        nuts: false,
        redFruits: false,
        stoneFruits: false,
        herbs: false,
        tropicalFruits: false,
        citrus: false,
        flowers: false,
        spices: false,
        other: '',
      },
      negative: {
        tobacco: false,
        burnt: false,
        herbs: false,
        woody: false,
        other: '',
      },
      notes: '',
    },
    aroma: {
      positive: {
        nuts: false,
        redFruits: false,
        stoneFruits: false,
        herbs: false,
        tropicalFruits: false,
        citrus: false,
        flowers: false,
        spices: false,
        other: '',
      },
      negative: {
        tobacco: false,
        burnt: false,
        herbs: false,
        woody: false,
        other: '',
      },
      notes: '',
    },
    personalScore: 0,
    comments: '',
    notes: '',
  });

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

  const calculateTotalScore = (tastingScores: typeof formData.tasting) => {
    if (!tastingScores) return 0;
    return Object.values(tastingScores).reduce((sum, score) => {
      if (typeof score === 'number' && score !== tastingScores.totalScore) {
        return sum + score;
      }
      return sum;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // idを除外してinsertする
      const { id, ...insertData } = formData;
      const { data, error } = await supabase
        .from('tasting_records')
        .insert([
          {
            ...insertData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/records');
      }, 1500);
    } catch (error) {
      console.error('Error adding record: ', error);
      alert('記録の保存に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnvironmentChange = (key: keyof TastingRecord['environment'], value: any) => {
    setFormData(prev => ({
      ...prev,
      environment: {
        ...prev.environment,
        [key]: value
      }
    }));
  };

  const handleCoffeeChange = (key: keyof TastingRecord['coffee'], value: any) => {
    setFormData(prev => ({
      ...prev,
      coffee: {
        ...prev.coffee,
        [key]: value,
      },
    }));
  };

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative', key: string, value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: {
          ...prev[type][field],
          [key]: value,
        },
      },
    }));
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
      if (!res.ok) {
        const errText = await res.text();
        throw new Error('天気情報の取得に失敗しました: ' + errText);
      }
      const data = await res.json();
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

  // タイプ切り替え用タブUI
  const typeTabs = [
    { key: 'handdrip', label: 'ハンドドリップ' },
    { key: 'espresso', label: 'エスプレッソ' },
    { key: 'roast', label: '焙煎記録' },
    { key: 'shop', label: '店舗来店' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        新しいテイスティング記録
      </h1>
      {/* タイプ切り替えタブ */}
      <div className="flex gap-2 mb-8">
        {typeTabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            className={`px-4 py-2 rounded-t-md border-b-2 font-semibold transition-colors ${recordType === tab.key ? 'border-gray-900 text-gray-900 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:text-gray-900'}`}
            onClick={() => setRecordType(tab.key as typeof recordType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* handdrip用フォーム（現状のフォーム） */}
      {recordType === 'handdrip' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <EnvironmentInfo
            formData={formData}
            onChange={handleEnvironmentChange}
            mode="new"
          />

          <CoffeeInfo
            formData={formData}
            onChange={handleCoffeeChange}
            mode="new"
          />

          {/* 抽出レシピ */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              抽出レシピ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ドリッパー
                </label>
                <select
                  value={formData.brewing.dripper}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        dripper: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  <option value="">選択してください</option>
                  <option value="SilkDripper">SilkDripper</option>
                  <option value="FlowerDripper">FlowerDripper</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  グラインダー
                </label>
                <select
                  value={formData.brewing.grinder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        grinder: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  <option value="">選択してください</option>
                  <option value="Timemore">Timemore</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  挽き目
                </label>
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
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  温度
                </label>
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
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    コーヒー豆 (g)
                </label>
                <input
                    type="number"
                  value={formData.brewing.coffeeAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        coffeeAmount: e.target.value,
                      },
                    })
                  }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="例: 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    湯量 (ml)
                </label>
                <input
                    type="number"
                  value={formData.brewing.waterAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        waterAmount: e.target.value,
                      },
                    })
                  }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="例: 300"
                />
              </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    蒸らし量 (ml)
                </label>
                <input
                    type="number"
                    value={formData.brewing.bloomAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                          bloomAmount: e.target.value,
                      },
                    })
                  }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="例: 40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    蒸らし時間 (分:秒)
                </label>
                  <div className="flex space-x-2">
                <input
                      type="number"
                      min="0"
                      max="59"
                      value={Math.floor(parseInt(formData.brewing.bloomTime || '0') / 60)}
                      onChange={(e) => {
                        const minutes = parseInt(e.target.value) || 0;
                        const seconds = parseInt(formData.brewing.bloomTime || '0') % 60;
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                            bloomTime: String(minutes * 60 + seconds),
                      },
                        });
                      }}
                      className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      placeholder="分"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={parseInt(formData.brewing.bloomTime || '0') % 60}
                      onChange={(e) => {
                        const minutes = Math.floor(parseInt(formData.brewing.bloomTime || '0') / 60);
                        const seconds = parseInt(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          brewing: {
                            ...formData.brewing,
                            bloomTime: String(minutes * 60 + seconds),
                          },
                        });
                      }}
                      className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      placeholder="秒"
                />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  抽出時間 (分:秒)
                </label>
                <div className="flex space-x-2">
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={Math.floor(parseInt(formData.brewing.brewTime || '0') / 60)}
                    onChange={(e) => {
                      const minutes = parseInt(e.target.value) || 0;
                      const seconds = parseInt(formData.brewing.brewTime || '0') % 60;
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                          brewTime: String(minutes * 60 + seconds),
                        },
                      });
                    }}
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="分"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={parseInt(formData.brewing.brewTime || '0') % 60}
                    onChange={(e) => {
                      const minutes = Math.floor(parseInt(formData.brewing.brewTime || '0') / 60);
                      const seconds = parseInt(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        brewing: {
                          ...formData.brewing,
                          brewTime: String(minutes * 60 + seconds),
                      },
                      });
                    }}
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="秒"
                />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メモ
                </label>
                <textarea
                  value={formData.brewing.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brewing: {
                        ...formData.brewing,
                        notes: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* テイスティング評価 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              テイスティング評価
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tastingFields.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            tasting: {
                              ...formData.tasting,
                              [key]: value,
                              totalScore: calculateTotalScore({
                                ...formData.tasting,
                                [key]: value,
                              }),
                            },
                          })
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          formData.tasting[key] === value
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LE NEZ */}
          <AromaSection
            type="nose"
            formData={formData}
            onChange={handleAromaChange}
            mode="new"
          />

          {/* LES ARÔMES */}
          <AromaSection
            type="aroma"
            formData={formData}
            onChange={handleAromaChange}
            mode="new"
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

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '記録を保存'}
            </button>
          </div>
        </form>
      )}

      {/* espresso用フォーム */}
      {recordType === 'espresso' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 環境情報は共通で利用 */}
          <EnvironmentInfo
            formData={formData}
            onChange={handleEnvironmentChange}
            mode="new"
          />
          {/* エスプレッソ評価項目 */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">エスプレッソ評価</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">クレマ</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ボディ</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">酸味</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">苦味</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">後味</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
              <textarea className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={4} />
            </div>
          </section>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '記録を保存'}
            </button>
          </div>
        </form>
      )}

      {/* roast用フォーム */}
      {recordType === 'roast' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎記録</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">焙煎日</label>
                <input type="date" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">豆名</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">焙煎度</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">焙煎時間（秒）</label>
                <input type="number" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">焙煎温度（℃）</label>
                <input type="number" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
              <textarea className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={4} />
            </div>
          </section>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '記録を保存'}
            </button>
          </div>
        </form>
      )}

      {/* shop用フォーム */}
      {recordType === 'shop' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">店舗来店記録</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">店名</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">店リンク</label>
                <input type="url" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" placeholder="https://" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">飲んだもの（カンマ区切りで複数可）</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" placeholder="例: カフェラテ, エスプレッソ" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">酸味</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">甘味</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ボディ</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">バランス</label>
                <input type="number" min="1" max="5" className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
              <textarea className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={4} />
            </div>
          </section>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '記録を保存'}
            </button>
          </div>
        </form>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-gray-900">記録を保存しました！</p>
            <p className="text-sm text-gray-600 mt-2">記録一覧ページに移動します...</p>
          </div>
        </div>
      )}
    </div>
  );
} 