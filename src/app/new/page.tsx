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

  // ShopVisitRecord型の初期値
  const [shopFormData, setShopFormData] = useState<ShopVisitRecord>({
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
      richness: 0,
      body: 0,
      balance: 0,
      cleanliness: 0,
      aftertaste: 0,
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

  const calculateTotalScore = (tastingScores: typeof formData.tasting) => {
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
            date: formData.environment.date,
            time: formData.environment.time,
            weather: formData.environment.weather,
            temperature: formData.environment.temperature,
            humidity: formData.environment.humidity,
            is_auto_fetched: formData.environment.isAutoFetched,
          }])
          .select('id')
          .single();
        if (envError) throw envError;

        // 2. コーヒー情報を保存
        const { data: coffeeData, error: coffeeError } = await supabase
          .from('coffees')
          .insert([{
            name: formData.coffee.name,
            origin: formData.coffee.origin,
            process: formData.coffee.process,
            variety: formData.coffee.variety,
            roast_level: formData.coffee.roastLevel,
            roasted_at: formData.coffee.roastedAt,
            roast_date: formData.coffee.roastDate,
            altitude: formData.coffee.altitude,
            other_info: formData.coffee.other_info,
          }])
          .select('id')
          .single();
        if (coffeeError) throw coffeeError;

        // 3. ハンドドリップ記録を保存
        const handdripData = {
          environment_id: envData.id,
          coffee_id: coffeeData.id,
          brewing: {
            dripper: formData.brewing.dripper,
            grinder: formData.brewing.grinder,
            grindSetting: formData.brewing.grindSetting,
            temperature: formData.brewing.temperature,
            coffeeAmount: formData.brewing.coffeeAmount,
            waterAmount: formData.brewing.waterAmount,
            brewTime: formData.brewing.brewTime,
            bloomTime: formData.brewing.bloomTime,
            bloomAmount: formData.brewing.bloomAmount,
            notes: formData.brewing.notes,
          },
          tasting: {
            acidity: formData.tasting.acidity,
            sweetness: formData.tasting.sweetness,
            richness: formData.tasting.richness,
            body: formData.tasting.body,
            balance: formData.tasting.balance,
            cleanliness: formData.tasting.cleanliness,
            aftertaste: formData.tasting.aftertaste,
            totalScore: formData.tasting.totalScore,
            aromaPowder: formData.tasting.aromaPowder,
            aromaPowderNote: formData.tasting.aromaPowderNote,
            aromaLiquid: formData.tasting.aromaLiquid,
            aromaLiquidNote: formData.tasting.aromaLiquidNote,
            flavor: formData.tasting.flavor,
            flavorNote: formData.tasting.flavorNote,
            strength: formData.tasting.strength,
            uniformity: formData.tasting.uniformity,
            cleanness: formData.tasting.cleanness,
          },
          nose: {
            positive: { ...formData.nose.positive },
            negative: { ...formData.nose.negative },
            notes: formData.nose.notes,
            positive_other_note: formData.nose.positive_other_note,
            negative_other_note: formData.nose.negative_other_note,
          },
          aroma: {
            positive: { ...formData.aroma.positive },
            negative: { ...formData.aroma.negative },
            notes: formData.aroma.notes,
            positive_other_note: formData.aroma.positive_other_note,
            negative_other_note: formData.aroma.negative_other_note,
          },
          personal_score: formData.personal_score,
          comments: formData.comments,
          notes: formData.notes,
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
            date: formData.environment.date,
            time: formData.environment.time,
            weather: formData.environment.weather,
            temperature: formData.environment.temperature,
            humidity: formData.environment.humidity,
            is_auto_fetched: formData.environment.isAutoFetched,
          }])
          .select('id')
        .single();
        if (envError) throw envError;

        // 2. コーヒー情報を保存
        const { data: coffeeData, error: coffeeError } = await supabase
          .from('coffees')
          .insert([{
            name: formData.coffee.name,
            origin: formData.coffee.origin,
            process: formData.coffee.process,
            variety: formData.coffee.variety,
            roast_level: formData.coffee.roastLevel,
            roasted_at: formData.coffee.roastedAt,
            roast_date: formData.coffee.roastDate,
            other_info: formData.coffee.other_info,
          }])
          .select('id')
          .single();
        if (coffeeError) throw coffeeError;

        // 3. エスプレッソ記録を保存
        const espressoData: Partial<EspressoRecord> = {
          environment: {
            date: formData.environment.date,
            time: formData.environment.time,
            weather: formData.environment.weather,
            temperature: formData.environment.temperature,
            humidity: formData.environment.humidity,
            isAutoFetched: formData.environment.isAutoFetched,
          },
          coffee: {
            name: formData.coffee.name,
            origin: formData.coffee.origin,
            process: formData.coffee.process,
            variety: formData.coffee.variety,
            roastLevel: formData.coffee.roastLevel,
            roastedAt: formData.coffee.roastedAt,
            roastDate: formData.coffee.roastDate,
            other_info: formData.coffee.other_info,
          },
          brewing: {
            type: formData.brewing.dripper,
            grinder: formData.brewing.grinder,
            grindSetting: formData.brewing.grindSetting,
            coffeeAmount: formData.brewing.coffeeAmount,
            brewTime: formData.brewing.brewTime,
            temperature: formData.brewing.temperature,
            notes: formData.brewing.notes,
            dripper: formData.brewing.dripper,
          },
          crema: {
            color: 0,
            thickness: 0,
            persistence: 0,
          },
          tasting: {
            acidity: formData.tasting.acidity,
            sweetness: formData.tasting.sweetness,
            richness: formData.tasting.richness,
            body: formData.tasting.body,
            balance: formData.tasting.balance,
            cleanliness: formData.tasting.cleanliness,
            aftertaste: formData.tasting.aftertaste,
            totalScore: formData.tasting.totalScore,
            aromaPowder: formData.tasting.aromaPowder,
            aromaPowderNote: formData.tasting.aromaPowderNote,
            aromaLiquid: formData.tasting.aromaLiquid,
            aromaLiquidNote: formData.tasting.aromaLiquidNote,
            flavor: formData.tasting.flavor,
            flavorNote: formData.tasting.flavorNote,
            strength: formData.tasting.strength,
            uniformity: formData.tasting.uniformity,
            cleanness: formData.tasting.cleanness,
          },
          nose: {
            positive: formData.nose.positive,
            negative: formData.nose.negative,
            notes: formData.nose.notes,
          },
          aroma: {
            positive: formData.aroma.positive,
            negative: formData.aroma.negative,
            notes: formData.aroma.notes,
          },
          personal_score: formData.personal_score,
          comments: formData.comments,
          notes: formData.notes,
        };

        const { error } = await supabase
          .from('espresso_records')
          .insert([{
            environment_id: envData.id,
            coffee_id: coffeeData.id,
            ...espressoData,
          }]);
      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
          router.push('/records/espresso');
      }, 1500);
      }
    } catch (error) {
      console.error('保存処理でエラーが発生しました:', error);
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

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative' | 'notes', key: string, value: boolean | string) => {
    if (field === 'notes') {
      setFormData(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          notes: value,
        },
      }));
      return;
    }
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

  // クレマ・テイスティング評価の状態をuseStateで管理
  type CremaKey = 'color' | 'thickness' | 'persistence';
  type TastingKey = 'acidity' | 'bitterness' | 'sweetness' | 'body' | 'clarity' | 'balance' | 'aftertaste';
  const [cremaScores, setCremaScores] = useState<Record<CremaKey, number>>({ color: 0, thickness: 0, persistence: 0 });
  const [tastingScores, setTastingScores] = useState<Record<TastingKey, number>>({ acidity: 0, bitterness: 0, sweetness: 0, body: 0, clarity: 0, balance: 0, aftertaste: 0 });
  // 合計点自動計算
  const totalScore = Object.values(cremaScores).reduce((a, b) => a + b, 0) + Object.values(tastingScores).reduce((a, b) => a + b, 0);

  const handleEspressoSubmit = async (data: EspressoRecord) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('espresso_records')
        .insert([{
          environment_date: data.environment.date,
          environment_time: data.environment.time,
          environment_weather: data.environment.weather,
          environment_temperature: data.environment.temperature,
          environment_humidity: data.environment.humidity,
          environment_is_auto_fetched: data.environment.isAutoFetched,
          coffee_name: data.coffee.name,
          coffee_origin: data.coffee.origin,
          coffee_process: data.coffee.process,
          coffee_variety: data.coffee.variety,
          coffee_roast_level: data.coffee.roastLevel,
          coffee_roasted_at: data.coffee.roastedAt,
          coffee_roast_date: data.coffee.roastDate,
          coffee_other_info: data.coffee.other_info,
          brewing_type: data.brewing.type,
          brewing_type_other: data.brewing.typeOther,
          brewing_grinder: data.brewing.grinder,
          brewing_grind_setting: data.brewing.grindSetting,
          brewing_coffee_amount: data.brewing.coffeeAmount,
          brewing_yield: data.brewing.yield,
          brewing_brew_time: data.brewing.brewTime,
          brewing_temperature: data.brewing.temperature,
          brewing_pressure: data.brewing.pressure,
          brewing_notes: data.brewing.notes,
          brewing_flair: data.brewing.flair,
          brewing_flair_memo: data.brewing.flairMemo,
          crema_color: data.crema.color,
          crema_thickness: data.crema.thickness,
          crema_persistence: data.crema.persistence,
          crema_notes: data.crema.notes,
          tasting_acidity: data.tasting.acidity,
          tasting_sweetness: data.tasting.sweetness,
          tasting_richness: data.tasting.richness,
          tasting_body: data.tasting.body,
          tasting_balance: data.tasting.balance,
          tasting_cleanliness: data.tasting.cleanliness,
          tasting_aftertaste: data.tasting.aftertaste,
          tasting_total_score: data.tasting.totalScore,
          nose_positive: data.nose.positive,
          nose_negative: data.nose.negative,
          nose_notes: data.nose.notes,
          aroma_positive: data.aroma.positive,
          aroma_negative: data.aroma.negative,
          aroma_notes: data.aroma.notes,
          personal_score: data.personal_score,
          comments: data.comments,
          notes: data.notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }]);
      if (error) throw error;
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/records/espresso');
      }, 1500);
    } catch (error) {
      console.error('Error adding record: ', error);
      alert('記録の保存に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            positiveOtherNote={formData.nose.positive_other_note || ''}
            onPositiveOtherNoteChange={value => setFormData(prev => ({ ...prev, nose: { ...prev.nose, positive_other_note: value } }))}
            negativeOtherNote={formData.nose.negative_other_note || ''}
            onNegativeOtherNoteChange={value => setFormData(prev => ({ ...prev, nose: { ...prev.nose, negative_other_note: value } }))}
          />

          {/* LES ARÔMES */}
          <AromaSection
            type="aroma"
            formData={formData}
            onChange={handleAromaChange}
            mode="new"
            positiveOtherNote={formData.aroma.positive_other_note || ''}
            onPositiveOtherNoteChange={value => setFormData(prev => ({ ...prev, aroma: { ...prev.aroma, positive_other_note: value } }))}
            negativeOtherNote={formData.aroma.negative_other_note || ''}
            onNegativeOtherNoteChange={value => setFormData(prev => ({ ...prev, aroma: { ...prev.aroma, negative_other_note: value } }))}
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
                    value={formData.personal_score}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                    value={formData.personal_score}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personal_score: Number(e.target.value),
                      })
                    }
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-center"
                  />
                  <span className="text-2xl font-bold text-gray-900 w-16 text-right">{formData.personal_score}</span>
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
        <EspressoForm
          onSubmit={handleEspressoSubmit}
          loading={isSubmitting}
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