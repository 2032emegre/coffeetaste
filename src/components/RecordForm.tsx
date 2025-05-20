import { useState, useEffect, useCallback } from "react";
import { TastingRecord } from '@/types/tasting';
import { searchOrigins } from '@/data/coffee-origins';
import { useDebounce } from '@/hooks/useDebounce';

export type RecordFormProps = {
  initialData: TastingRecord;
  onSubmit: (data: TastingRecord) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  mode?: 'new' | 'edit';
};

const DRIPPERS = ["SilkDripper", "FlowerDripper", "その他"];
const GRINDERS = ["Timemore", "その他"];
const PROCESSES = ["ウォッシュド", "ナチュラル", "ハニー", "その他"];
const VARIETIES = ["ティピカ", "ブルボン", "カトゥアイ", "その他"];
const ROAST_LEVELS = ["浅煎り", "中煎り", "深煎り"];
const NOSE_POSITIVE = ["ナッツ", "赤い果実", "核果", "草葉", "トロピカルフルーツ", "柑橘類", "花", "スパイス"];
const NOSE_NEGATIVE = ["タバコ", "焦げ臭", "草葉", "樹木"];
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

export default function RecordForm({ initialData, onSubmit, loading, error, mode = 'new' }: RecordFormProps) {
  const [formData, setFormData] = useState<TastingRecord>(initialData);
  const [localError, setLocalError] = useState<string | null>(null);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const debouncedCoffeeName = useDebounce(formData.coffee.name, 500);

  // datetime-local用の値変換
  const toDatetimeLocal = (date: Date | string | null) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const handleChange = (key: keyof TastingRecord, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!formData.brewed_at || !formData.coffee.name) {
      setLocalError('日付とコーヒー名は必須です');
      return;
    }
    await onSubmit(formData);
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
  const handleNoseAromaCheck = (section: 'nose'|'aroma', type: 'positive'|'negative', key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: {
          ...prev[section][type],
          [key]: checked
        }
      }
    }));
  };

  // テイスティング合計自動計算
  const calcTotalScore = () => {
    const t = formData.tasting;
    return (t.acidity + t.sweetness + t.richness + t.body + t.balance + t.cleanliness + t.aftertaste);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* --- 環境情報 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">環境情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出日時</label>
            <input type="datetime-local" value={toDatetimeLocal(formData.brewed_at)} onChange={e => handleChange('brewed_at', new Date(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" required />
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
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">コーヒー情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="coffeeName" className="block text-sm font-medium text-gray-700">コーヒー名</label>
            <input type="text" id="coffeeName" value={formData.coffee.name} onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, name: e.target.value } }))} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="例: エチオピア イルガチェフェ" />
            {isLoadingHistory && (<div className="absolute right-2 top-1/2 -translate-y-1/2"><div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div></div>)}
          </div>
          <div className="relative">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">産地</label>
            <input type="text" id="origin" value={formData.coffee.origin ?? ''} onChange={e => handleOriginChange(e.target.value)} onFocus={() => formData.coffee.origin && setShowOriginSuggestions(true)} onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="例: エチオピア イルガチェフェ" />
            {showOriginSuggestions && originSuggestions.length > 0 && (<div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">{originSuggestions.map((suggestion, index) => (<div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" onMouseDown={() => handleOriginSelect(suggestion)}>{suggestion}</div>))}</div>)}
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
            <input type="text" value={formData.coffee.otherInfo ?? ''} onChange={e => setFormData(prev => ({ ...prev, coffee: { ...prev.coffee, otherInfo: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
        </div>
      </section>

      {/* --- 抽出レシピ --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
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
            <input type="text" value={formData.brewing.grindSize ?? ''} onChange={e => setFormData(prev => ({ ...prev, brewing: { ...prev.brewing, grindSize: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
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
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TASTING_KEYS.map((key) => (
            <div key={key} className="flex items-center space-x-4">
              <label className="block text-sm font-medium text-gray-700 w-20">
                {key === 'acidity' ? '酸味' : key === 'sweetness' ? '甘味' : key === 'richness' ? '濃厚さ' : key === 'body' ? 'ボディ' : key === 'balance' ? 'バランス' : key === 'cleanliness' ? 'クリーン度' : '余韻'}
              </label>
              <input type="range" min={0} max={5} step={1} value={formData.tasting[key]} onChange={e => setFormData(prev => ({ ...prev, tasting: { ...prev.tasting, [key]: Number(e.target.value) } }))} className="flex-1" />
              <span className="w-6 text-center">{formData.tasting[key]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- LE NEZ --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">LE NEZ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-gray-700 mb-1">ポジティブ</div>
            <div className="flex flex-wrap gap-2">
              {NOSE_POSITIVE.map(key => (
                <label key={key} className="inline-flex items-center">
                  <input type="checkbox" checked={!!formData.nose.positive[key]} onChange={e => handleNoseAromaCheck('nose','positive',key,e.target.checked)} className="mr-1" />{key}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">ネガティブ</div>
            <div className="flex flex-wrap gap-2">
              {NOSE_NEGATIVE.map(key => (
                <label key={key} className="inline-flex items-center">
                  <input type="checkbox" checked={!!formData.nose.negative[key]} onChange={e => handleNoseAromaCheck('nose','negative',key,e.target.checked)} className="mr-1" />{key}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ノート</label>
          <textarea value={formData.nose.notes ?? ''} onChange={e => setFormData(prev => ({ ...prev, nose: { ...prev.nose, notes: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={2} />
        </div>
      </section>

      {/* --- LES ARÔMES --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">LES ARÔMES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-gray-700 mb-1">ポジティブ</div>
            <div className="flex flex-wrap gap-2">
              {AROMA_POSITIVE.map(key => (
                <label key={key} className="inline-flex items-center">
                  <input type="checkbox" checked={!!formData.aroma.positive[key]} onChange={e => handleNoseAromaCheck('aroma','positive',key,e.target.checked)} className="mr-1" />{key}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">ネガティブ</div>
            <div className="flex flex-wrap gap-2">
              {AROMA_NEGATIVE.map(key => (
                <label key={key} className="inline-flex items-center">
                  <input type="checkbox" checked={!!formData.aroma.negative[key]} onChange={e => handleNoseAromaCheck('aroma','negative',key,e.target.checked)} className="mr-1" />{key}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ノート</label>
          <textarea value={formData.aroma.notes ?? ''} onChange={e => setFormData(prev => ({ ...prev, aroma: { ...prev.aroma, notes: e.target.value } }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={2} />
        </div>
      </section>

      {/* --- 総合評価 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">総合評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価合計</label>
            <div className="text-lg font-bold">{calcTotalScore()} / 35</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">個人スコア (0-100)</label>
            <input type="number" min={0} max={100} value={formData.personalScore} onChange={e => setFormData(prev => ({ ...prev, personalScore: Number(e.target.value) }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">コメント・気付き・改善点・比較</label>
          <textarea value={formData.comment ?? ''} onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={3} />
        </div>
      </section>

      {(localError || error) && <div className="text-red-500 text-sm">{localError || error}</div>}
      <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" disabled={loading}>
        {loading ? '保存中...' : mode === 'edit' ? '更新' : '保存'}
      </button>
    </form>
  );
} 