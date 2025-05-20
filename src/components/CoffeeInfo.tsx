import { useState, useEffect, useCallback } from 'react';
import { TastingRecord } from '@/types/tasting';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 代表的な産地リスト
const COMMON_ORIGINS = [
  'エチオピア',
  'グアテマラ',
  'ケニア',
  'コロンビア',
  'ブラジル',
  'コスタリカ',
  'パナマ',
  'インドネシア',
  'タンザニア',
  'ルワンダ',
  'メキシコ',
  'ペルー',
  'ボリビア',
  'ホンジュラス',
  'ニカラグア',
  'エルサルバドル',
  'ジャマイカ',
  'ハワイ',
  'インド',
  'ベトナム',
] as const;

// 代表的な品種リスト
const COMMON_VARIETIES = [
  'ティピカ',
  'ブルボン',
  'カトゥアイ',
  'カツアイ',
  'ムンドノーボ',
  'パカマラ',
  'ゲイシャ',
  'パカス',
  'カツーラ',
  'カツアイ・アマレロ',
  'カツアイ・ベルメーリョ',
  'カツアイ・ロッソ',
  'カツアイ・イエロー',
  'カツアイ・レッド',
  'カツアイ・オレンジ',
  'カツアイ・ピンク',
  'カツアイ・ブラウン',
  'カツアイ・ブラック',
  'カツアイ・ホワイト',
  'カツアイ・グリーン',
] as const;

type CoffeeInfoProps = {
  formData: TastingRecord;
  onChange: (key: keyof TastingRecord['coffee'], value: any) => void;
  mode?: 'new' | 'edit' | 'view';
};

type CoffeeHistory = {
  name: string;
  origin: string;
  process: string;
  variety: string;
  roastLevel: string;
  roastDate: string;
  otherInfo: string;
  count: number;
};

export default function CoffeeInfo({ formData, onChange, mode = 'new' }: CoffeeInfoProps) {
  const [coffeeHistories, setCoffeeHistories] = useState<CoffeeHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedOrigins, setSuggestedOrigins] = useState<string[]>([]);
  const [suggestedVarieties, setSuggestedVarieties] = useState<string[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showVarietySuggestions, setShowVarietySuggestions] = useState(false);
  const isViewMode = mode === 'view';

  // コーヒー履歴の取得
  const fetchCoffeeHistories = useCallback(async () => {
    const { data, error } = await supabase
      .from('tasting_records')
      .select('coffee')
      .not('coffee', 'is', null);

    if (error) {
      console.error('コーヒー履歴の取得に失敗:', error);
      return;
    }

    // コーヒー情報を集計
    const historyMap = new Map<string, CoffeeHistory>();
    data.forEach((record: any) => {
      const coffee = record.coffee;
      if (!coffee?.name) return;

      const key = `${coffee.name}-${coffee.origin}-${coffee.process}-${coffee.variety}`;
      if (historyMap.has(key)) {
        const existing = historyMap.get(key)!;
        historyMap.set(key, { ...existing, count: existing.count + 1 });
      } else {
        historyMap.set(key, {
          name: coffee.name,
          origin: coffee.origin || '',
          process: coffee.process || '',
          variety: coffee.variety || '',
          roastLevel: coffee.roastLevel || '',
          roastDate: coffee.roastDate || '',
          otherInfo: coffee.otherInfo || '',
          count: 1,
        });
      }
    });

    setCoffeeHistories(Array.from(historyMap.values()).sort((a, b) => b.count - a.count));
  }, []);

  useEffect(() => {
    if (!isViewMode) {
      fetchCoffeeHistories();
    }
  }, [isViewMode, fetchCoffeeHistories]);

  // 産地のサジェスト
  const handleOriginInput = (value: string) => {
    onChange('origin', value);
    setSearchTerm(value);
    
    if (value.length > 0) {
      const suggestions = COMMON_ORIGINS.filter(origin =>
        origin.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedOrigins(suggestions);
      setShowOriginSuggestions(true);
    } else {
      setShowOriginSuggestions(false);
    }
  };

  // 品種のサジェスト
  const handleVarietyInput = (value: string) => {
    onChange('variety', value);
    setSearchTerm(value);
    
    if (value.length > 0) {
      const suggestions = COMMON_VARIETIES.filter(variety =>
        variety.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedVarieties(suggestions);
      setShowVarietySuggestions(true);
    } else {
      setShowVarietySuggestions(false);
    }
  };

  // 履歴からの選択
  const handleHistorySelect = (history: CoffeeHistory) => {
    onChange('name', history.name);
    onChange('origin', history.origin);
    onChange('process', history.process);
    onChange('variety', history.variety);
    onChange('roastLevel', history.roastLevel);
    onChange('roastDate', history.roastDate);
    onChange('otherInfo', history.otherInfo);
    setShowHistory(false);
  };

  // 検索に基づく履歴のフィルタリング
  const filteredHistories = coffeeHistories.filter(history => {
    const searchLower = searchTerm.toLowerCase();
    return (
      history.name.toLowerCase().includes(searchLower) ||
      history.origin.toLowerCase().includes(searchLower) ||
      history.process.toLowerCase().includes(searchLower) ||
      history.variety.toLowerCase().includes(searchLower) ||
      history.roastLevel.toLowerCase().includes(searchLower)
    );
  });

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">コーヒー情報</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* コーヒー名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            コーヒー名
          </label>
          <div className="relative">
            {isViewMode ? (
              <div className="text-gray-900">{formData.coffee.name}</div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.coffee.name}
                  onChange={(e) => {
                    onChange('name', e.target.value);
                    setSearchTerm(e.target.value);
                  }}
                  onFocus={() => setShowHistory(true)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  placeholder="コーヒー名を入力"
                />
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  履歴
                </button>
              </div>
            )}
            {/* 履歴ドロップダウン */}
            {showHistory && !isViewMode && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredHistories.length > 0 ? (
                  filteredHistories.map((history, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleHistorySelect(history)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      <div className="font-medium">{history.name}</div>
                      <div className="text-sm text-gray-500">
                        {[history.origin, history.process, history.variety]
                          .filter(Boolean)
                          .join(' / ')}
                      </div>
                      <div className="text-xs text-gray-400">
                        使用回数: {history.count}回
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">履歴が見つかりません</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 産地 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            産地
          </label>
          <div className="relative">
            {isViewMode ? (
              <div className="text-gray-900">{formData.coffee.origin}</div>
            ) : (
              <input
                type="text"
                value={formData.coffee.origin}
                onChange={(e) => handleOriginInput(e.target.value)}
                onFocus={() => setShowOriginSuggestions(true)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="産地を入力"
              />
            )}
            {/* 産地サジェスト */}
            {showOriginSuggestions && !isViewMode && suggestedOrigins.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestedOrigins.map((origin, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      onChange('origin', origin);
                      setShowOriginSuggestions(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {origin}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 精製方式 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            精製方式
          </label>
          {isViewMode ? (
            <div className="text-gray-900">{formData.coffee.process}</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {['ウォッシュド', 'ナチュラル', 'ハニー', 'その他'].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="process"
                    value={method}
                    checked={formData.coffee.process === method}
                    onChange={(e) => onChange('process', e.target.value)}
                    className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          )}
          {!isViewMode && formData.coffee.process === 'その他' && (
            <input
              type="text"
              value={formData.coffee.processingOther || ''}
              onChange={(e) => onChange('processingOther', e.target.value)}
              placeholder="精製方式を入力"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            />
          )}
        </div>

        {/* 品種 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            品種
          </label>
          <div className="relative">
            {isViewMode ? (
              <div className="text-gray-900">{formData.coffee.variety}</div>
            ) : (
              <input
                type="text"
                value={formData.coffee.variety}
                onChange={(e) => handleVarietyInput(e.target.value)}
                onFocus={() => setShowVarietySuggestions(true)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="品種を入力"
              />
            )}
            {/* 品種サジェスト */}
            {showVarietySuggestions && !isViewMode && suggestedVarieties.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestedVarieties.map((variety, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      onChange('variety', variety);
                      setShowVarietySuggestions(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {variety}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 焙煎日 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            焙煎日
          </label>
          {isViewMode ? (
            <div className="text-gray-900">{formData.coffee.roastDate}</div>
          ) : (
            <input
              type="date"
              value={formData.coffee.roastDate}
              onChange={(e) => onChange('roastDate', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          )}
        </div>

        {/* その他の情報 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            その他の情報
          </label>
          {isViewMode ? (
            <div className="text-gray-900">{formData.coffee.otherInfo}</div>
          ) : (
            <input
              type="text"
              value={formData.coffee.otherInfo}
              onChange={(e) => onChange('otherInfo', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          )}
        </div>
      </div>
    </section>
  );
} 