"use client";

import { useState, useEffect, useCallback } from "react";
import { TastingRecord } from '@/types/tasting';
import { searchOrigins } from '@/data/coffee-origins';
import { useDebounce } from '@/hooks/useDebounce';
import AromaSection from '@/components/AromaSection';

export type RecordFormProps = {
  initialData: TastingRecord;
  onSubmit: (data: TastingRecord) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  mode?: 'new' | 'edit' | 'view';
  readOnly?: boolean;
};

const DRIPPERS = ["SilkDripper", "FlowerDripper", "その他"];
const GRINDERS = ["Timemore", "その他"];
const PROCESSES = ["ウォッシュド", "ナチュラル", "ハニー", "その他"];
const VARIETIES = ["ティピカ", "ブルボン", "カトゥアイ", "その他"];
const ROAST_LEVELS = ["浅煎り", "中煎り", "深煎り"];
const NOSE_POSITIVE = ["ナッツ", "赤い果実", "核果", "草葉", "トロピカルフルーツ", "柑橘類", "花", "スパイス", "その他"] as const;
const NOSE_NEGATIVE = ["タバコ", "焦げ臭", "草葉", "樹木", "その他"] as const;
const AROMA_POSITIVE = NOSE_POSITIVE;
const AROMA_NEGATIVE = NOSE_NEGATIVE;

const TASTING_KEYS = [
  'acidity',
  'sweetness',
  'richness',
  'body',
  'balance',
  'cleanliness',
  'aftertaste',
] as const;

export default function RecordForm({ initialData, onSubmit, loading, error, mode = 'new', readOnly = false }: RecordFormProps) {
  const [formData, setFormData] = useState<TastingRecord>(initialData);
  const [localError, setLocalError] = useState<string | null>(null);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const debouncedCoffeeName = useDebounce(formData.coffee.name, 500);

  const handleChange = (key: keyof TastingRecord, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // 必須項目のバリデーション
    const missingFields: string[] = [];

    if (!formData.environment.date) {
      missingFields.push('日付');
    }
    if (!formData.environment.time) {
      missingFields.push('時刻');
    }
    if (!formData.coffee.name) {
      missingFields.push('コーヒー名');
    }
    if (!formData.comments) {
      missingFields.push('コメント');
    }

    if (missingFields.length > 0) {
      setLocalError(`以下の項目は必須です: ${missingFields.join(', ')}`);
      return;
    }

    await onSubmit({ ...formData, environment_id: initialData.environment_id, coffee_id: initialData.coffee_id });
  };

  // コーヒー名が変更されたときに過去の情報を取得（履歴プリフィル強化）
  useEffect(() => {
    const fetchCoffeeHistory = async () => {
      if (!debouncedCoffeeName || debouncedCoffeeName.length < 2) return;
      setIsLoadingHistory(true);
      try {
        const response = await fetch(`/api/coffee-history?query=${encodeURIComponent(debouncedCoffeeName)}`);
        const { data, error } = await response.json();
        if (error) throw new Error(error);
        if (data) {
          setFormData(prev => ({
            ...prev,
            coffee: {
              ...prev.coffee,
              ...data, // name以外も全てプリフィル
              name: prev.coffee.name // 入力中のnameは維持
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching coffee history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchCoffeeHistory();
  }, [debouncedCoffeeName]);

  // 産地の検索とサジェスト表示
  const handleOriginChange = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      coffee: {
        ...prev.coffee,
        origin: value
      }
    }));
    if (value.length >= 1) {
      const suggestions = searchOrigins(value);
      setOriginSuggestions(suggestions);
      setShowOriginSuggestions(true);
    } else {
      setShowOriginSuggestions(false);
    }
  }, []);
  const handleOriginSelect = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      coffee: {
        ...prev.coffee,
        origin: suggestion
      }
    }));
    setShowOriginSuggestions(false);
  };

  // truthyバグ修正用: チェックボックスの値を厳密にbooleanで管理
  const handleNoseAromaCheck = (section: 'nose'|'aroma', type: 'positive'|'negative'|'notes', key: string, value: boolean|string) => {
    if (type === 'notes') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          notes: value as string
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [type]: {
            ...prev[section][type],
            [key]: value as boolean
          }
        }
      }));
    }
  };

  // テイスティング合計自動計算
  const calcTotalScore = (tasting: typeof formData.tasting) => {
    return [
      tasting.acidity,
      tasting.sweetness,
      tasting.richness,
      tasting.body,
      tasting.balance,
      tasting.cleanliness,
      tasting.aftertaste
    ].reduce((sum, score) => sum + (score || 0), 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* --- 環境情報 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日付 <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              value={formData.environment.date} 
              onChange={e => setFormData(prev => ({ ...prev, environment: { ...prev.environment, date: e.target.value } }))} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              required 
              disabled={mode === 'view' || readOnly}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              時刻 <span className="text-red-500">*</span>
            </label>
            <input 
              type="time" 
              value={formData.environment.time} 
              onChange={e => setFormData(prev => ({ ...prev, environment: { ...prev.environment, time: e.target.value } }))} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">天気</label>
            <input type="text" value={formData.environment.weather ?? ''} onChange={e => setFormData({ ...formData, environment: { ...formData.environment, weather: e.target.value } })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">気温（℃）</label>
            <input type="number" value={formData.environment.temperature ?? ''} onChange={e => setFormData({ ...formData, environment: { ...formData.environment, temperature: e.target.value === '' ? null : Number(e.target.value) } })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
        </div>
      </section>

      {/* --- コーヒー情報 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">コーヒー情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="coffeeName" className="block text-sm font-medium text-gray-700">
              コーヒー名 <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="coffeeName" 
              name="coffeeName" 
              value={formData.coffee.name} 
              onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, name: e.target.value } }))} 
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="例: エチオピア イルガチェフェ" 
              required 
            />
            {isLoadingHistory && (<div className="absolute right-2 top-1/2 -translate-y-1/2"><div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div></div>)}
          </div>
          <div className="relative">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">産地</label>
            <input type="text" id="origin" value={formData.coffee.origin ?? ''} onChange={e => handleOriginChange(e.target.value)} onFocus={() => formData.coffee.origin && setShowOriginSuggestions(true)} onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="例: エチオピア イルガチェフェ" />
            {showOriginSuggestions && originSuggestions.length > 0 && (<div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">{originSuggestions.map((suggestion, index) => (<div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" onMouseDown={() => handleOriginSelect(suggestion)}>{suggestion}</div>))}</div>)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">標高（m）</label>
            <input
              type="number"
              value={formData.coffee.altitude ?? ''}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                coffee: { 
                  ...prev.coffee, 
                  altitude: e.target.value === '' ? null : Number(e.target.value) 
                } 
              }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              placeholder="例: 1500"
              readOnly={readOnly}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">精製方式</label>
            <select value={formData.coffee.process ?? ''} onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, process: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500">
              <option value="">選択してください</option>
              {PROCESSES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">品種</label>
            <select value={formData.coffee.variety ?? ''} onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, variety: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500">
              <option value="">選択してください</option>
              {VARIETIES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">焙煎日</label>
            <input type="date" value={formData.coffee.roastDate ?? ''} onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, roastDate: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">その他の情報</label>
            <input 
              type="text" 
              value={formData.coffee.other_info ?? ''} 
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                coffee: { 
                  ...prev.coffee, 
                  other_info: e.target.value 
                } 
              }))} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={readOnly}
            />
          </div>
        </div>
      </section>

      {/* --- 抽出レシピ --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ドリッパー</label>
            <select value={formData.brewing.dripper ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, dripper: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500">
              <option value="">選択してください</option>
              {DRIPPERS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
            <select value={formData.brewing.grinder ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, grinder: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500">
              <option value="">選択してください</option>
              {GRINDERS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
            <input 
              type="text" 
              value={formData.brewing.grindSetting ?? ''} 
              onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, grindSetting: e.target.value } }))} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={readOnly}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">温度</label>
            <input type="text" value={formData.brewing.temperature ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, temperature: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">コーヒー豆 (g)</label>
            <input type="text" value={formData.brewing.coffeeAmount ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, coffeeAmount: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">湯量 (ml)</label>
            <input type="text" value={formData.brewing.waterAmount ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, waterAmount: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">蒸らし量 (ml)</label>
            <input type="text" value={formData.brewing.bloomAmount ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, bloomAmount: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">蒸らし時間 (分:秒)</label>
            <input type="text" value={formData.brewing.bloomTime ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, bloomTime: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間 (分:秒)</label>
            <input type="text" value={formData.brewing.brewTime ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, brewTime: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
            <textarea value={formData.brewing.notes ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, notes: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={2} />
          </div>
        </div>
      </section>

      {/* --- テイスティング評価 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'acidity', label: '酸味' },
            { key: 'sweetness', label: '甘味' },
            { key: 'richness', label: '濃厚さ' },
            { key: 'body', label: 'ボディ' },
            { key: 'balance', label: 'バランス' },
            { key: 'cleanliness', label: 'クリーン度' },
            { key: 'aftertaste', label: '余韻' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      tasting: {
                        ...prev.tasting,
                        [key]: value,
                        totalScore: calcTotalScore(prev.tasting)
                      }
                    }))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${formData.tasting[key as keyof typeof formData.tasting] === value ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- LE NEZ --- */}
      <AromaSection
        type="nose"
        formData={formData}
        onChange={handleNoseAromaCheck}
        mode={mode}
        positiveOtherNote={formData.nose.positive_other_note || ''}
        onPositiveOtherNoteChange={(value: string) => setFormData(prev => ({ ...prev, nose: { ...prev.nose, positive_other_note: value } }))}
        negativeOtherNote={formData.nose.negative_other_note || ''}
        onNegativeOtherNoteChange={(value: string) => setFormData(prev => ({ ...prev, nose: { ...prev.nose, negative_other_note: value } }))}
      />

      {/* --- LES ARÔMES --- */}
      <AromaSection
        type="aroma"
        formData={formData}
        onChange={handleNoseAromaCheck}
        mode={mode}
        positiveOtherNote={formData.aroma.positive_other_note || ''}
        onPositiveOtherNoteChange={(value: string) => setFormData(prev => ({ ...prev, aroma: { ...prev.aroma, positive_other_note: value } }))}
        negativeOtherNote={formData.aroma.negative_other_note || ''}
        onNegativeOtherNoteChange={(value: string) => setFormData(prev => ({ ...prev, aroma: { ...prev.aroma, negative_other_note: value } }))}
      />

      {/* --- 総合評価 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">総合評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価合計</label>
            <div className="text-lg font-bold">{calcTotalScore(formData.tasting)} / 35</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">個人スコア (0-100)</label>
            <input 
              type="number" 
              min={0} 
              max={100} 
              value={formData.personal_score} 
              onChange={e => setFormData(prev => ({ ...prev, personal_score: Number(e.target.value) }))} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={readOnly}
            />
          </div>
        </div>
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            コメント <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="comments" 
            name="comments" 
            value={formData.comments ?? ''} 
            onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
            rows={3} 
            required 
            placeholder="コメントや気づき、改善点などを記入してください"
            readOnly={readOnly}
          />
        </div>
      </section>

      {(localError || error) && <div className="text-red-500 text-sm">{localError || error}</div>}
      {mode !== 'view' && (
        <div className="flex justify-end mt-8">
          <button 
            type="submit" 
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? '保存中...' : mode === 'edit' ? '更新' : '記録を保存'}
          </button>
        </div>
      )}
    </form>
  );
} 