import { useState } from "react";
import EnvironmentInfo from "./EnvironmentInfo";
import CoffeeInfo from "./CoffeeInfo";
import { TastingRecord } from '@/types/tasting';

// --- 型定義 ---
type RoastBefore = {
  chargeWeight: string;
  chargeTemp: string;
  targetRoastLevel: string;
};
type RoastAfter = {
  chargeTime: string;
  dryEnd: string;
  yellowStart: string;
  maillardStart: string;
  firstCrack: string;
  firstCrackPeak: string;
  secondCrack: string;
  dropTime: string;
  totalTime: string;
  dropTemp: string;
  afterWeight: string;
  color: number; // 1-20
};
type Tasting = {
  acidity: number;
  sweetness: number;
  richness: number;
  body: number;
  balance: number;
  cleanliness: number;
  aftertaste: number;
  totalScore: number;
  aromaPowder?: number;
  aromaPowderNote?: string;
  aromaLiquid?: number;
  aromaLiquidNote?: string;
  flavor?: number;
  flavorNote?: string;
  strength?: number;
  uniformity?: number;
  cleanness?: number;
};
type Overall = {
  totalScore: number;
  personalScore: number;
  issues: string;
  summary: string;
};

type RoastingRecordFormProps = {
  initialData?: Partial<TastingRecord>;
  onSubmit?: (data: TastingRecord & { roastBefore: RoastBefore; roastAfter: RoastAfter; tasting: Tasting; overall: Overall }) => void;
  loading?: boolean;
  error?: string | null;
};

export default function RoastingRecordForm({ initialData, onSubmit, loading, error }: RoastingRecordFormProps) {
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];
  const defaultTime = today.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
  const [form, setForm] = useState<TastingRecord>({
    id: '',
    environment: initialData?.environment || {
      date: defaultDate,
      time: defaultTime,
      weather: '',
      temperature: null,
      humidity: '',
      isAutoFetched: false,
    },
    coffee: initialData?.coffee || {
      name: '',
      origin: '',
      process: '',
      processingOther: '',
      variety: '',
      varietyOther: '',
      roastLevel: '',
      roastedAt: undefined,
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
      bloomAmount: '',
      bloomTime: '',
      brewTime: '',
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
      positive: {},
      negative: {},
      notes: '',
    },
    aroma: {
      positive: {},
      negative: {},
      notes: '',
    },
    personalScore: 0,
    comments: '',
    notes: '',
    created_at: '',
  });

  // --- 各セクションのstate ---
  const [roastBefore, setRoastBefore] = useState<RoastBefore>({
    chargeWeight: '',
    chargeTemp: '',
    targetRoastLevel: '',
  });
  const [roastAfter, setRoastAfter] = useState<RoastAfter>({
    chargeTime: '',
    dryEnd: '',
    yellowStart: '',
    maillardStart: '',
    firstCrack: '',
    firstCrackPeak: '',
    secondCrack: '',
    dropTime: '',
    totalTime: '',
    dropTemp: '',
    afterWeight: '',
    color: 10,
  });
  const [tasting, setTasting] = useState<Tasting>({
    acidity: 0,
    sweetness: 0,
    richness: 0,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
    totalScore: 0,
  });
  const [aromaPowder, setAromaPowder] = useState(0);
  const [aromaPowderNote, setAromaPowderNote] = useState('');
  const [aromaLiquid, setAromaLiquid] = useState(0);
  const [aromaLiquidNote, setAromaLiquidNote] = useState('');
  const [flavor, setFlavor] = useState(0);
  const [flavorNote, setFlavorNote] = useState('');
  const [strength, setStrength] = useState(0);
  const [uniformity, setUniformity] = useState(0);
  const [cleanness, setCleanness] = useState(0);
  const [overall, setOverall] = useState<Overall>({
    totalScore: 0,
    personalScore: 0,
    issues: '',
    summary: '',
  });

  // --- 自動計算 ---
  // 焙煎原料率
  const materialYield = (() => {
    const before = parseFloat(roastBefore.chargeWeight);
    const after = parseFloat(roastAfter.afterWeight);
    if (!before || !after) return '';
    return ((after / before) * 100).toFixed(1);
  })();
  // DTR
  const dtr = (() => {
    const total = parseFloat(roastAfter.totalTime);
    const dev = parseFloat(roastAfter.dropTime) - parseFloat(roastAfter.firstCrack);
    if (!total || isNaN(dev)) return '';
    return ((dev / total) * 100).toFixed(1);
  })();
  // 評価スコア合計
  const totalScore = [
    aromaPowder,
    aromaLiquid,
    flavor,
    tasting.aftertaste,
    tasting.acidity,
    strength,
    tasting.body,
    uniformity,
    tasting.balance,
    cleanness,
    tasting.sweetness,
  ].reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

  // --- ハンドラ ---
  const handleEnvironmentChange = (key: keyof TastingRecord['environment'], value: any) => {
    setForm((prev) => ({ ...prev, environment: { ...prev.environment, [key]: value } }));
  };
  const handleCoffeeChange = (key: keyof TastingRecord['coffee'], value: any) => {
    setForm((prev) => ({ ...prev, coffee: { ...prev.coffee, [key]: value } }));
  };
  const handleRoastBeforeChange = (key: keyof RoastBefore, value: string) => {
    setRoastBefore((prev) => ({ ...prev, [key]: value }));
  };
  const handleRoastAfterChange = (key: keyof RoastAfter, value: string | number) => {
    setRoastAfter((prev) => ({ ...prev, [key]: value }));
  };
  const handleTastingChange = (key: keyof Tasting, value: string | number) => {
    setTasting((prev) => ({ ...prev, [key]: value }));
  };
  const handleOverallChange = (key: keyof Overall, value: string | number) => {
    setOverall((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, roastBefore, roastAfter, tasting, overall: { ...overall, totalScore } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 環境情報セクション */}
      <EnvironmentInfo formData={form} onChange={handleEnvironmentChange} mode="new" />
      {/* コーヒー情報セクション */}
      <CoffeeInfo formData={form} onChange={handleCoffeeChange} mode="new" />

      {/* --- 焙煎前セクション --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎前</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">投入量 (g)</label>
            <input type="number" value={roastBefore.chargeWeight} onChange={e => handleRoastBeforeChange('chargeWeight', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">投入温度 (℃)</label>
            <input type="number" value={roastBefore.chargeTemp} onChange={e => handleRoastBeforeChange('chargeTemp', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">目標焙煎度</label>
            <input type="text" value={roastBefore.targetRoastLevel} onChange={e => handleRoastBeforeChange('targetRoastLevel', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
        </div>
      </section>

      {/* --- 焙煎後セクション --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">焙煎後</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">投入時間 (秒)</label>
            <input type="number" value={roastAfter.chargeTime} onChange={e => handleRoastAfterChange('chargeTime', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ドライエンド (秒)</label>
            <input type="number" value={roastAfter.dryEnd} onChange={e => handleRoastAfterChange('dryEnd', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">イエローフェーズスタート (秒)</label>
            <input type="number" value={roastAfter.yellowStart} onChange={e => handleRoastAfterChange('yellowStart', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メイラードフェーズスタート (秒)</label>
            <input type="number" value={roastAfter.maillardStart} onChange={e => handleRoastAfterChange('maillardStart', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1ハゼ時間 (秒)</label>
            <input type="number" value={roastAfter.firstCrack} onChange={e => handleRoastAfterChange('firstCrack', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1ハゼピーク (秒)</label>
            <input type="number" value={roastAfter.firstCrackPeak} onChange={e => handleRoastAfterChange('firstCrackPeak', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">2ハゼ時間 (秒)</label>
            <input type="number" value={roastAfter.secondCrack} onChange={e => handleRoastAfterChange('secondCrack', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排出時間 (秒)</label>
            <input type="number" value={roastAfter.dropTime} onChange={e => handleRoastAfterChange('dropTime', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">総合時間 (秒)</label>
            <input type="number" value={roastAfter.totalTime} onChange={e => handleRoastAfterChange('totalTime', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排出温度 (℃)</label>
            <input type="number" value={roastAfter.dropTemp} onChange={e => handleRoastAfterChange('dropTemp', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">焙煎後重量 (g)</label>
            <input type="number" value={roastAfter.afterWeight} onChange={e => handleRoastAfterChange('afterWeight', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">焙煎原料率 (%)</label>
            <input type="text" value={materialYield} readOnly className="w-full rounded-md border-gray-300 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DTR (%)</label>
            <input type="text" value={dtr} readOnly className="w-full rounded-md border-gray-300 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">色味（1-20）</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={20}
                value={roastAfter.color}
                onChange={e => handleRoastAfterChange('color', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#111' }}
              />
              <span className="text-2xl font-bold text-gray-900 w-12 text-right">{roastAfter.color}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- テイスティング評価 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 香り（粉） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">香り（粉）</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAromaPowder(v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${aromaPowder === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <textarea value={aromaPowderNote} onChange={e => setAromaPowderNote(e.target.value)} className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={1} placeholder="ノート" />
          </div>
          {/* 香り（液） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">香り（液）</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAromaLiquid(v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${aromaLiquid === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <textarea value={aromaLiquidNote} onChange={e => setAromaLiquidNote(e.target.value)} className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={1} placeholder="ノート" />
          </div>
          {/* 風味 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">風味</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setFlavor(v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${flavor === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <textarea value={flavorNote} onChange={e => setFlavorNote(e.target.value)} className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={1} placeholder="ノート" />
          </div>
          {/* 余韻 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">余韻</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('aftertaste', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.aftertaste === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* 酸味 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">酸味</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('acidity', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.acidity === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* 濃さ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">濃さ</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('strength', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.strength === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* ボディ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ボディ</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('body', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.body === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* 均一性 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">均一性</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setUniformity(v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${uniformity === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* バランス */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">バランス</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('balance', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.balance === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* カップの綺麗さ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カップの綺麗さ</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setCleanness(v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${cleanness === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* 甘み */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">甘み</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleTastingChange('sweetness', v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${tasting.sweetness === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 総合評価 --- */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">総合評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価スコア（合計）</label>
            <input type="text" value={totalScore} readOnly className="w-full rounded-md border-gray-300 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">個人スコア (0-100)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={overall.personalScore}
                onChange={e => handleOverallChange('personalScore', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#111' }}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={overall.personalScore}
                onChange={e => handleOverallChange('personalScore', Number(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-center"
              />
              <span className="text-2xl font-bold text-gray-900 w-16 text-right">{overall.personalScore}</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">問題点・改善点</label>
            <textarea value={overall.issues} onChange={e => handleOverallChange('issues', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={2} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">総合</label>
            <textarea value={overall.summary} onChange={e => handleOverallChange('summary', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={2} />
          </div>
        </div>
      </section>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-700" disabled={loading}>
        {loading ? "保存中..." : "保存"}
      </button>
    </form>
  );
} 