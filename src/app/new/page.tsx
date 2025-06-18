'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { TastingRecord, ShopVisitRecord, EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import AromaSection from '@/components/AromaSection';
import CoffeeInfo from '@/components/CoffeeInfo';
import RoastingRecordForm from '@/components/RoastingRecordForm';
import ShopVisitForm from '@/components/ShopVisitForm';
import EspressoForm from '@/components/EspressoForm';

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

  // ハンドドリップ記録用の状態
  const [handdripFormData, setHanddripFormData] = useState<TastingRecord>({
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
      processingOther: '',
      variety: '',
      altitude: null,
      other_info: '',
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
      aromaPowder: 0,
      aromaPowderNote: '',
      aromaLiquid: 0,
      aromaLiquidNote: '',
      flavor: 0,
      flavorNote: '',
      strength: 0,
      uniformity: 0,
      cleanness: 0,
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
        other: false,
      },
      negative: {
        tobacco: false,
        burnt: false,
        herbs: false,
        woody: false,
        other: false,
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
        other: false,
      },
      negative: {
        tobacco: false,
        burnt: false,
        herbs: false,
        woody: false,
        other: false,
      },
      notes: '',
    },
    personal_score: 0,
    comments: '',
    notes: '',
  });

  // エスプレッソ記録用の状態
  const [espressoFormData, setEspressoFormData] = useState<EspressoRecord>({
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
      roast_level: '',
      roast_date: '',
      roaster: '',
      roaster_link: '',
      price: 0,
      notes: '',
      altitude: null,
      processingOther: '',
      other_info: '',
    },
    brewing: {
      type: '',
      typeOther: '',
      grinder: '',
      grindSetting: '',
      coffeeAmount: '',
      yield: '',
      brewTime: '',
      temperature: '',
      pressure: '',
      notes: '',
      dripper: '',
      flair: false,
      flairMemo: '',
    },
    crema: {
      color: 0,
      thickness: 0,
      persistence: 0,
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
      positive: {},
      negative: {},
      notes: '',
    },
    aroma: {
      positive: {},
      negative: {},
      notes: '',
    },
    personal_score: 0,
    comments: '',
    notes: '',
  });

  // ショップ訪問記録用の状態
  const [shopFormData, setShopFormData] = useState<ShopVisitRecord>({
    id: '',
    environment: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false }),
      weather: '',
      temperature: null,
      humidity: '',
      isAutoFetched: false,
    },
    shop: {
      name: '',
      link: '',
    },
    items: [],
    tasting: {
      acidity: 0,
      sweetness: 0,
      body: 0,
      balance: 0,
      cleanliness: 0,
      aftertaste: 0,
      richness: 0,
      totalScore: 0,
    },
    comments: '',
    staffInfo: '',
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

  const calculateTotalScore = (tastingScores: typeof handdripFormData.tasting) => {
    if (!tastingScores) return 0;
    return Object.entries(tastingScores).reduce((sum, [key, score]) => {
      if (key !== 'totalScore' && typeof score === 'number') {
        return sum + score;
      }
      return sum;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (recordType === 'handdrip') {
        // 1. 環境情報を保存
        const { data: envData, error: envError } = await supabase
          .from('environments')
          .insert([{
            date: handdripFormData.environment.date,
            time: handdripFormData.environment.time,
            weather: handdripFormData.environment.weather,
            temperature: handdripFormData.environment.temperature,
            humidity: handdripFormData.environment.humidity,
            is_auto_fetched: handdripFormData.environment.isAutoFetched,
          }])
          .select('id')
          .single();
        if (envError) throw envError;

        // 2. コーヒー情報を保存
        const { data: coffeeData, error: coffeeError } = await supabase
          .from('coffees')
          .insert([{
            name: handdripFormData.coffee.name,
            origin: handdripFormData.coffee.origin,
            process: handdripFormData.coffee.process,
            variety: handdripFormData.coffee.variety,
            roast_level: handdripFormData.coffee.roastLevel,
            roasted_at: handdripFormData.coffee.roastedAt,
            roast_date: handdripFormData.coffee.roastDate,
            altitude: handdripFormData.coffee.altitude,
            other_info: handdripFormData.coffee.other_info,
          }])
          .select('id')
          .single();
        if (coffeeError) throw coffeeError;

        // 3. ハンドドリップ記録を保存
        const handdripData = {
          environment_id: envData.id,
          coffee_id: coffeeData.id,
          brewing: {
            dripper: handdripFormData.brewing.dripper,
            grinder: handdripFormData.brewing.grinder,
            grindSetting: handdripFormData.brewing.grindSetting,
            temperature: handdripFormData.brewing.temperature,
            coffeeAmount: handdripFormData.brewing.coffeeAmount,
            waterAmount: handdripFormData.brewing.waterAmount,
            brewTime: handdripFormData.brewing.brewTime,
            bloomTime: handdripFormData.brewing.bloomTime,
            bloomAmount: handdripFormData.brewing.bloomAmount,
            notes: handdripFormData.brewing.notes,
          },
          tasting: {
            acidity: handdripFormData.tasting.acidity,
            sweetness: handdripFormData.tasting.sweetness,
            richness: handdripFormData.tasting.richness,
            body: handdripFormData.tasting.body,
            balance: handdripFormData.tasting.balance,
            cleanliness: handdripFormData.tasting.cleanliness,
            aftertaste: handdripFormData.tasting.aftertaste,
            totalScore: handdripFormData.tasting.totalScore,
            aromaPowder: handdripFormData.tasting.aromaPowder,
            aromaPowderNote: handdripFormData.tasting.aromaPowderNote,
            aromaLiquid: handdripFormData.tasting.aromaLiquid,
            aromaLiquidNote: handdripFormData.tasting.aromaLiquidNote,
            flavor: handdripFormData.tasting.flavor,
            flavorNote: handdripFormData.tasting.flavorNote,
            strength: handdripFormData.tasting.strength,
            uniformity: handdripFormData.tasting.uniformity,
            cleanness: handdripFormData.tasting.cleanness,
          },
          nose: {
            positive: { ...handdripFormData.nose.positive },
            negative: { ...handdripFormData.nose.negative },
            notes: handdripFormData.nose.notes,
            positive_other_note: handdripFormData.nose.positive_other_note,
            negative_other_note: handdripFormData.nose.negative_other_note,
          },
          aroma: {
            positive: { ...handdripFormData.aroma.positive },
            negative: { ...handdripFormData.aroma.negative },
            notes: handdripFormData.aroma.notes,
            positive_other_note: handdripFormData.aroma.positive_other_note,
            negative_other_note: handdripFormData.aroma.negative_other_note,
          },
          personal_score: handdripFormData.personal_score,
          comments: handdripFormData.comments,
          notes: handdripFormData.notes,
        };

        const { error: handdripError } = await supabase
          .from('handdrip_records')
          .insert([handdripData]);
        
        if (handdripError) {
          console.error('ハンドドリップ記録の保存エラー:', handdripError);
          throw new Error(`ハンドドリップ記録の保存に失敗しました: ${handdripError.message}`);
        }

        setShowSuccess(true);
        setTimeout(() => {
          router.push('/records');
        }, 1500);
      } else if (recordType === 'espresso') {
        // エスプレッソ記録の保存処理
        // 1. 環境情報を保存
        const { data: envData, error: envError } = await supabase
          .from('environments')
          .insert([{
            date: espressoFormData.environment.date,
            time: espressoFormData.environment.time,
            weather: espressoFormData.environment.weather,
            temperature: espressoFormData.environment.temperature,
            humidity: espressoFormData.environment.humidity,
            is_auto_fetched: espressoFormData.environment.isAutoFetched,
          }])
          .select('id')
        .single();
        if (envError) throw envError;

        // 2. コーヒー情報を保存
        const { data: coffeeData, error: coffeeError } = await supabase
          .from('coffees')
          .insert([{
            name: espressoFormData.coffee.name,
            origin: espressoFormData.coffee.origin,
            process: espressoFormData.coffee.process,
            variety: espressoFormData.coffee.variety,
            roast_level: espressoFormData.coffee.roast_level,
            roasted_at: espressoFormData.coffee.roasted_at,
            roast_date: espressoFormData.coffee.roast_date,
            altitude: espressoFormData.coffee.altitude,
            other_info: espressoFormData.coffee.other_info,
          }])
          .select('id')
          .single();
        if (coffeeError) throw coffeeError;

        // 3. エスプレッソ記録を保存
        const espressoData: Partial<EspressoRecord> = {
          environment_id: envData.id,
          coffee_id: coffeeData.id,
          environment: {
            date: espressoFormData.environment.date,
            time: espressoFormData.environment.time,
            weather: espressoFormData.environment.weather,
            temperature: espressoFormData.environment.temperature,
            humidity: espressoFormData.environment.humidity,
            isAutoFetched: espressoFormData.environment.isAutoFetched,
          },
          coffee: {
            name: espressoFormData.coffee.name,
            origin: espressoFormData.coffee.origin,
            process: espressoFormData.coffee.process,
            variety: espressoFormData.coffee.variety,
            roast_level: espressoFormData.coffee.roast_level,
            roast_date: espressoFormData.coffee.roast_date,
            roaster: espressoFormData.coffee.roaster,
            roaster_link: espressoFormData.coffee.roaster_link,
            price: espressoFormData.coffee.price,
            notes: espressoFormData.coffee.notes,
            altitude: espressoFormData.coffee.altitude,
            processingOther: espressoFormData.coffee.processingOther,
            other_info: espressoFormData.coffee.other_info,
          },
          brewing: {
            type: espressoFormData.brewing.type,
            typeOther: espressoFormData.brewing.typeOther,
            grinder: espressoFormData.brewing.grinder,
            grindSetting: espressoFormData.brewing.grindSetting,
            coffeeAmount: espressoFormData.brewing.coffeeAmount,
            yield: espressoFormData.brewing.yield,
            brewTime: espressoFormData.brewing.brewTime,
            temperature: espressoFormData.brewing.temperature,
            pressure: espressoFormData.brewing.pressure,
            notes: espressoFormData.brewing.notes,
            dripper: espressoFormData.brewing.dripper,
            flair: espressoFormData.brewing.flair,
            flairMemo: espressoFormData.brewing.flairMemo,
          },
          crema: {
            color: espressoFormData.crema.color,
            thickness: espressoFormData.crema.thickness,
            persistence: espressoFormData.crema.persistence,
            notes: espressoFormData.crema.notes,
          },
          tasting: {
            acidity: espressoFormData.tasting.acidity,
            sweetness: espressoFormData.tasting.sweetness,
            richness: espressoFormData.tasting.richness,
            body: espressoFormData.tasting.body,
            balance: espressoFormData.tasting.balance,
            cleanliness: espressoFormData.tasting.cleanliness,
            aftertaste: espressoFormData.tasting.aftertaste,
            totalScore: espressoFormData.tasting.totalScore,
          },
          nose: {
            positive: espressoFormData.nose.positive,
            negative: espressoFormData.nose.negative,
            notes: espressoFormData.nose.notes,
            positive_other_note: espressoFormData.nose.positive_other_note,
            negative_other_note: espressoFormData.nose.negative_other_note,
          },
          aroma: {
            positive: espressoFormData.aroma.positive,
            negative: espressoFormData.aroma.negative,
            notes: espressoFormData.aroma.notes,
            positive_other_note: espressoFormData.aroma.positive_other_note,
            negative_other_note: espressoFormData.aroma.negative_other_note,
          },
          personal_score: espressoFormData.personal_score,
          comments: espressoFormData.comments,
          notes: espressoFormData.notes,
        };

        const { data: insertedEspresso, error } = await supabase
          .from('espresso_records')
          .insert([espressoData])
          .select('id')
          .single();

        if (error) throw error;

        setShowSuccess(true);
        setTimeout(() => {
          router.push('/records?tab=espresso');
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving record:', error);
      setWeatherError(error instanceof Error ? error.message : '記録の保存中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnvironmentChange = (key: keyof TastingRecord['environment'], value: any) => {
    setHanddripFormData(prev => ({
      ...prev,
      environment: {
        ...prev.environment,
        [key]: value
      }
    }));
  };

  const handleCoffeeChange = (key: keyof TastingRecord['coffee'], value: any) => {
    setHanddripFormData(prev => ({
      ...prev,
      coffee: {
        ...prev.coffee,
        [key]: value,
      },
    }));
  };

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative' | 'notes', key: string, value: boolean | string) => {
    if (field === 'notes') {
      setHanddripFormData(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          notes: value,
        },
      }));
      return;
    }
    setHanddripFormData(prev => ({
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
      setHanddripFormData({
        ...handdripFormData,
        environment: {
          ...handdripFormData.environment,
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

  // クレマ・テイスティング評価の状態をuseStateで管理
  type CremaKey = 'color' | 'thickness' | 'persistence';
  type TastingKey = 'acidity' | 'bitterness' | 'sweetness' | 'body' | 'clarity' | 'balance' | 'aftertaste';
  const [cremaScores, setCremaScores] = useState<Record<CremaKey, number>>({ color: 0, thickness: 0, persistence: 0 });
  const [tastingScores, setTastingScores] = useState<Record<TastingKey, number>>({ acidity: 0, bitterness: 0, sweetness: 0, body: 0, clarity: 0, balance: 0, aftertaste: 0 });
  // 合計点自動計算
  const totalScore = Object.values(cremaScores).reduce((a, b) => a + b, 0) + Object.values(tastingScores).reduce((a, b) => a + b, 0);

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
            formData={handdripFormData}
            onChange={handleEnvironmentChange}
            mode="new"
          />

          <CoffeeInfo
            formData={handdripFormData}
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
                  value={handdripFormData.brewing.dripper}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.grinder}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.grindSetting}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.temperature}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.coffeeAmount}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.waterAmount}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                    value={handdripFormData.brewing.bloomAmount}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                      value={Math.floor(parseInt(handdripFormData.brewing.bloomTime || '0') / 60)}
                      onChange={(e) => {
                        const minutes = parseInt(e.target.value) || 0;
                        const seconds = parseInt(handdripFormData.brewing.bloomTime || '0') % 60;
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                      value={parseInt(handdripFormData.brewing.bloomTime || '0') % 60}
                      onChange={(e) => {
                        const minutes = Math.floor(parseInt(handdripFormData.brewing.bloomTime || '0') / 60);
                        const seconds = parseInt(e.target.value) || 0;
                        setHanddripFormData({
                          ...handdripFormData,
                          brewing: {
                            ...handdripFormData.brewing,
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
                    value={Math.floor(parseInt(handdripFormData.brewing.brewTime || '0') / 60)}
                    onChange={(e) => {
                      const minutes = parseInt(e.target.value) || 0;
                      const seconds = parseInt(handdripFormData.brewing.brewTime || '0') % 60;
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                    value={parseInt(handdripFormData.brewing.brewTime || '0') % 60}
                    onChange={(e) => {
                      const minutes = Math.floor(parseInt(handdripFormData.brewing.brewTime || '0') / 60);
                      const seconds = parseInt(e.target.value) || 0;
                      setHanddripFormData({
                        ...handdripFormData,
                        brewing: {
                          ...handdripFormData.brewing,
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
                  value={handdripFormData.brewing.notes}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
                      brewing: {
                        ...handdripFormData.brewing,
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
                          setHanddripFormData({
                            ...handdripFormData,
                            tasting: {
                              ...handdripFormData.tasting,
                              [key]: value,
                              totalScore: calculateTotalScore({
                                ...handdripFormData.tasting,
                                [key]: value,
                              }),
                            },
                          })
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          handdripFormData.tasting[key] === value
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
            formData={handdripFormData}
            onChange={handleAromaChange}
            mode="new"
            positiveOtherNote={handdripFormData.nose.positive_other_note || ''}
            onPositiveOtherNoteChange={value => setHanddripFormData(prev => ({ ...prev, nose: { ...prev.nose, positive_other_note: value } }))}
            negativeOtherNote={handdripFormData.nose.negative_other_note || ''}
            onNegativeOtherNoteChange={value => setHanddripFormData(prev => ({ ...prev, nose: { ...prev.nose, negative_other_note: value } }))}
          />

          {/* LES ARÔMES */}
          <AromaSection
            type="aroma"
            formData={handdripFormData}
            onChange={handleAromaChange}
            mode="new"
            positiveOtherNote={handdripFormData.aroma.positive_other_note || ''}
            onPositiveOtherNoteChange={value => setHanddripFormData(prev => ({ ...prev, aroma: { ...prev.aroma, positive_other_note: value } }))}
            negativeOtherNote={handdripFormData.aroma.negative_other_note || ''}
            onNegativeOtherNoteChange={value => setHanddripFormData(prev => ({ ...prev, aroma: { ...prev.aroma, negative_other_note: value } }))}
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
                    value={handdripFormData.personal_score}
                    onChange={(e) =>
                      setHanddripFormData({
                        ...handdripFormData,
                        personal_score: Number(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#111' }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={handdripFormData.personal_score}
                    onChange={(e) =>
                      setHanddripFormData({
                        ...handdripFormData,
                        personal_score: Number(e.target.value),
                      })
                    }
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-center"
                  />
                  <span className="text-2xl font-bold text-gray-900 w-16 text-right">{handdripFormData.personal_score}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">評価・気づき</label>
                <textarea
                  value={handdripFormData.comments}
                  onChange={(e) =>
                    setHanddripFormData({
                      ...handdripFormData,
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
        <EspressoForm
          initialData={espressoFormData}
          onSubmit={async (data) => {
            setEspressoFormData(data);
            await handleSubmit(new Event('submit') as any);
          }}
          loading={isSubmitting}
          error={weatherError}
          mode="new"
        />
      )}

      {/* roast用フォーム */}
      {recordType === 'roast' && (
        <RoastingRecordForm
          onSubmit={async (data) => {
            setIsSubmitting(true);
            try {
              // 必要に応じてデータ整形
              const { id, ...insertData } = data;
              const { error } = await supabase
                .from('roast_records')
                .insert([
                  {
                    ...insertData,
                    created_at: new Date().toISOString(),
                  },
                ]);
              if (error) throw error;
              setShowSuccess(true);
              setTimeout(() => {
                router.push('/roast_records');
              }, 1500);
            } catch (error) {
              alert('焙煎記録の保存に失敗しました。もう一度お試しください。');
            } finally {
              setIsSubmitting(false);
            }
          }}
          loading={isSubmitting}
          error={weatherError}
          mode="new"
        />
      )}

      {/* shop用フォーム */}
      {recordType === 'shop' && (
        <ShopVisitForm
          initialData={shopFormData}
          onSubmit={async (data) => {
            setIsSubmitting(true);
            try {
              // 環境情報を保存
              const { data: envData, error: envError } = await supabase
                .from('environments')
                .insert([{
                  date: data.environment.date,
                  time: data.environment.time,
                  weather: data.environment.weather,
                  temperature: data.environment.temperature,
                  humidity: data.environment.humidity,
                  is_auto_fetched: data.environment.isAutoFetched,
                }])
                .select('id')
                .single();
              if (envError) throw envError;

              // shop_visits本体を保存
              const { id, ...insertData } = data;
              const { toSupabaseRow } = await import('@/utils/supabase');
              const row = toSupabaseRow({ ...insertData, environment: data.environment });
              const { error } = await supabase
                .from('shop_visits')
                .insert([
                  {
                    ...row,
                    environment_id: envData.id,
                    created_at: new Date().toISOString(),
                  },
                ]);
              if (error) throw error;
              setShowSuccess(true);
              setTimeout(() => {
                router.push('/records?tab=shop');
              }, 1500);
            } catch (error) {
              alert('店舗来店記録の保存に失敗しました。もう一度お試しください。');
            } finally {
              setIsSubmitting(false);
            }
          }}
          isSubmitting={isSubmitting}
          submitError={weatherError}
          mode="new"
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-900">記録を保存しました！</p>
          </div>
        </div>
      )}
    </div>
  );
} 