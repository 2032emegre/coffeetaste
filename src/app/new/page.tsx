'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { TastingRecord } from '@/types/tasting';

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewRecord() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TastingRecord>({
    id: '',
    environment: {
      date: new Date().toISOString().split('T')[0],
      weather: '',
      temperature: '',
      humidity: '',
      timeOfDay: '',
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
          temperature: data.temperature !== '' ? `${data.temperature}℃` : '',
        },
      });
    } catch (e: any) {
      setWeatherError(e.message || '天気情報の取得に失敗しました');
    } finally {
      setWeatherLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        新しいテイスティング記録
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 環境情報 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            環境情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                value={formData.environment.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    environment: {
                      ...formData.environment,
                      date: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                天気
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={formData.environment.weather}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      environment: {
                        ...formData.environment,
                        weather: e.target.value,
                      },
                    })
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
                <ActionButton onClick={fetchWeather}>
                  {weatherLoading ? '取得中...' : '自動取得'}
                </ActionButton>
              </div>
              {weatherError && (
                <div className="text-red-500 text-xs mt-1">
                  {weatherError}
                  <button
                    type="button"
                    className="ml-2 underline text-blue-600"
                    onClick={fetchWeather}
                  >
                    再試行
                  </button>
                  <div className="mt-1 text-gray-500">APIキーやネットワーク設定をご確認ください。</div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                気温
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={formData.environment.temperature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      environment: {
                        ...formData.environment,
                        temperature: e.target.value,
                      },
                    })
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
                <ActionButton onClick={fetchWeather}>
                  {weatherLoading ? '取得中...' : '自動取得'}
                </ActionButton>
              </div>
              {weatherError && (
                <div className="text-red-500 text-xs mt-1">
                  {weatherError}
                  <button
                    type="button"
                    className="ml-2 underline text-blue-600"
                    onClick={fetchWeather}
                  >
                    再試行
                  </button>
                  <div className="mt-1 text-gray-500">APIキーやネットワーク設定をご確認ください。</div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                時間帯
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.environment.timeOfDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      environment: {
                        ...formData.environment,
                        timeOfDay: e.target.value,
                      },
                    })
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
                <ActionButton onClick={() => {
                  const hour = new Date().getHours();
                  let timeOfDay = '';
                  if (hour >= 5 && hour < 11) timeOfDay = '朝';
                  else if (hour >= 11 && hour < 14) timeOfDay = '昼';
                  else if (hour >= 14 && hour < 17) timeOfDay = '午後';
                  else if (hour >= 17 && hour < 22) timeOfDay = '夕方';
                  else timeOfDay = '夜';
                  setFormData({
                    ...formData,
                    environment: {
                      ...formData.environment,
                      timeOfDay,
                    },
                  });
                }}>
                  自動設定
                </ActionButton>
              </div>
            </div>
          </div>
        </section>

        {/* コーヒー情報 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            コーヒー情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                コーヒー名
              </label>
              <div className="flex gap-2">
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
                    })
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
                <ActionButton onClick={() => {
                  // TODO: 過去のコーヒー情報を表示
                }}>
                  履歴
                </ActionButton>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                産地
              </label>
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
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  精製方式
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['ウォッシュド', 'ナチュラル', 'ハニー', 'その他'].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="processing"
                        value={method}
                        checked={formData.coffee.process === method}
                        onChange={(e) => setFormData({ ...formData, coffee: { ...formData.coffee, process: e.target.value } })}
                        className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
                {formData.coffee.process === 'その他' && (
                  <input
                    type="text"
                    value={formData.coffee.processingOther || ''}
                    onChange={(e) => setFormData({ ...formData, coffee: { ...formData.coffee, processingOther: e.target.value } })}
                    placeholder="精製方式を入力"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  品種
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['ティピカ', 'ブルボン', 'カトゥアイ', 'その他'].map((variety) => (
                    <label key={variety} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="variety"
                        value={variety}
                        checked={formData.coffee.variety === variety}
                        onChange={(e) => setFormData({ ...formData, coffee: { ...formData.coffee, variety: e.target.value } })}
                        className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      />
                      <span className="text-sm text-gray-700">{variety}</span>
                    </label>
                  ))}
                </div>
                {formData.coffee.variety === 'その他' && (
                  <input
                    type="text"
                    value={formData.coffee.varietyOther || ''}
                    onChange={(e) => setFormData({ ...formData, coffee: { ...formData.coffee, varietyOther: e.target.value } })}
                    placeholder="品種を入力"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                焙煎日
              </label>
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
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                その他の情報
              </label>
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
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </div>
        </section>

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
                  コーヒー量 (ml)
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
                  湯量 (g)
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

        {/* 香り（ネ） */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            LE NEZ
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">ポジティブ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {positiveAromas.map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.nose.positive[key] === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nose: {
                            ...formData.nose,
                            positive: {
                              ...formData.nose.positive,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="その他"
                    value={typeof formData.nose.positive.other === 'string' ? formData.nose.positive.other : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nose: {
                          ...formData.nose,
                          positive: {
                            ...formData.nose.positive,
                            other: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">ネガティブ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {negativeAromas.map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.nose.negative[key] === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nose: {
                            ...formData.nose,
                            negative: {
                              ...formData.nose.negative,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="その他"
                    value={typeof formData.nose.negative.other === 'string' ? formData.nose.negative.other : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nose: {
                          ...formData.nose,
                          negative: {
                            ...formData.nose.negative,
                            other: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ノート
              </label>
              <input
                type="text"
                value={formData.nose.notes || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nose: {
                      ...formData.nose,
                      notes: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </div>
        </section>

        {/* アロマ */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            LES ARÔMES
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">ポジティブ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {positiveAromas.map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.aroma.positive[key] === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aroma: {
                            ...formData.aroma,
                            positive: {
                              ...formData.aroma.positive,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="その他"
                    value={typeof formData.aroma.positive.other === 'string' ? formData.aroma.positive.other : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aroma: {
                          ...formData.aroma,
                          positive: {
                            ...formData.aroma.positive,
                            other: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">ネガティブ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {negativeAromas.map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.aroma.negative[key] === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aroma: {
                            ...formData.aroma,
                            negative: {
                              ...formData.aroma.negative,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="その他"
                    value={typeof formData.aroma.negative.other === 'string' ? formData.aroma.negative.other : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aroma: {
                          ...formData.aroma,
                          negative: {
                            ...formData.aroma.negative,
                            other: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ノート
              </label>
              <input
                type="text"
                value={formData.aroma.notes || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    aroma: {
                      ...formData.aroma,
                      notes: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </div>
        </section>

        {/* 総合評価 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            総合評価
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                評価合計
              </label>
              <div className="text-2xl font-bold text-gray-900">
                {formData.tasting.totalScore} / 35
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                個人スコア (0-100)
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                コメント
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comments: e.target.value,
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                気付き・改善点・比較
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                rows={4}
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