import { useState } from 'react';
import { EspressoRecord } from '@/types/tasting';
import EnvironmentInfo from './EnvironmentInfo';
import CoffeeInfo from './CoffeeInfo';
import AromaSection from './AromaSection';

type EspressoFormProps = {
  initialData?: Partial<EspressoRecord>;
  onSubmit: (data: EspressoRecord) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  mode?: 'view' | 'edit' | 'new';
};

export default function EspressoForm({
  initialData,
  onSubmit,
  loading = false,
  error = null,
  mode = 'edit',
}: EspressoFormProps) {
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];
  const defaultTime = today.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });

  const [formData, setFormData] = useState<EspressoRecord>(() => ({
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
      variety: '',
      roast_level: '',
      roast_date: '',
      roaster: '',
      roaster_link: '',
      price: 0,
      notes: '',
      other_info: '',
    },
    brewing: initialData?.brewing || {
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
    crema: initialData?.crema || {
      color: 0,
      thickness: 0,
      persistence: 0,
      notes: '',
    },
    tasting: initialData?.tasting || {
      acidity: 0,
      sweetness: 0,
      richness: 0,
      body: 0,
      balance: 0,
      cleanliness: 0,
      aftertaste: 0,
      totalScore: 0,
    },
    nose: initialData?.nose || {
      positive: {},
      negative: {},
      notes: '',
    },
    aroma: initialData?.aroma || {
      positive: {},
      negative: {},
      notes: '',
    },
    personal_score: initialData?.personal_score || 0,
    comments: initialData?.comments || '',
    notes: initialData?.notes || '',
    created_at: initialData?.created_at || '',
  }));

  const [positiveOtherNoteNose, setPositiveOtherNoteNose] = useState(formData.nose.positive_other_note || '');
  const [negativeOtherNoteNose, setNegativeOtherNoteNose] = useState(formData.nose.negative_other_note || '');
  const [positiveOtherNoteAroma, setPositiveOtherNoteAroma] = useState(formData.aroma.positive_other_note || '');
  const [negativeOtherNoteAroma, setNegativeOtherNoteAroma] = useState(formData.aroma.negative_other_note || '');

  const handleEnvironmentChange = (key: keyof EspressoRecord['environment'], value: any) => {
    setFormData(prev => ({
      ...prev,
      environment: {
        ...prev.environment,
        [key]: value,
      },
    }));
  };

  const handleCoffeeChange = (key: keyof EspressoRecord['coffee'], value: any) => {
    setFormData(prev => ({
      ...prev,
      coffee: {
        ...prev.coffee,
        [key]: value,
      },
    }));
  };

  const handleBrewingChange = (key: keyof EspressoRecord['brewing'], value: any) => {
    setFormData(prev => ({
      ...prev,
      brewing: {
        ...prev.brewing,
        [key]: value,
      },
    }));
  };

  const handleCremaChange = (key: keyof EspressoRecord['crema'], value: number | string) => {
    setFormData(prev => ({
      ...prev,
      crema: {
        ...prev.crema,
        [key]: value,
      },
    }));
  };

  const handleTastingChange = (key: keyof EspressoRecord['tasting'], value: number) => {
    setFormData(prev => {
      const newTasting = {
        ...prev.tasting,
        [key]: value,
      };
      const totalScore = Object.entries(newTasting).reduce((sum, [k, v]) => {
        if (k !== 'totalScore' && typeof v === 'number') {
          return sum + v;
        }
        return sum;
      }, 0);
      return {
        ...prev,
        tasting: {
          ...newTasting,
          totalScore,
        },
      };
    });
  };

  const handleAromaChange = (type: 'nose' | 'aroma', field: 'positive' | 'negative' | 'notes', key: string, value: boolean | string) => {
    if (field === 'notes') {
      setFormData(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          notes: value as string,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 環境情報 */}
      <EnvironmentInfo
        formData={formData}
        onChange={handleEnvironmentChange}
        mode={mode}
      />

      {/* コーヒー情報 */}
      <CoffeeInfo
        formData={formData}
        onChange={handleCoffeeChange}
        mode={mode}
      />

      {/* 抽出レシピ */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">抽出レシピ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
            <select
              value={formData.brewing.type}
              onChange={e => handleBrewingChange('type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              disabled={mode === 'view'}
            >
              <option value="">選択してください</option>
              <option value="エスプレッソ">エスプレッソ</option>
              <option value="アメリカーノ">アメリカーノ</option>
              <option value="リストレット">リストレット</option>
              <option value="その他">その他</option>
            </select>
            {formData.brewing.type === 'その他' && (
              <input
                type="text"
                value={formData.brewing.typeOther || ''}
                onChange={e => handleBrewingChange('typeOther', e.target.value)}
                className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="その他の種類を記入"
                readOnly={mode === 'view'}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">豆（g）</label>
            <input
              type="number"
              value={formData.brewing.coffeeAmount}
              onChange={e => handleBrewingChange('coffeeAmount', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={mode === 'view'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出量（ml）</label>
            <input
              type="number"
              value={formData.brewing.yield}
              onChange={e => handleBrewingChange('yield', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={mode === 'view'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">温度（℃）</label>
            <input
              type="number"
              value={formData.brewing.temperature}
              onChange={e => handleBrewingChange('temperature', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              readOnly={mode === 'view'}
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="flair"
              checked={formData.brewing.flair}
              onChange={e => handleBrewingChange('flair', e.target.checked)}
              className="mr-2"
              disabled={mode === 'view'}
            />
            <label htmlFor="flair" className="text-sm font-medium text-gray-700">flair</label>
            {formData.brewing.flair && (
              <input
                type="text"
                value={formData.brewing.flairMemo || ''}
                onChange={e => handleBrewingChange('flairMemo', e.target.value)}
                className="w-full ml-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                placeholder="flairでの抽出に関するメモ"
                readOnly={mode === 'view'}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">グラインダー</label>
            <select
              value={formData.brewing.grinder}
              onChange={e => handleBrewingChange('grinder', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              disabled={mode === 'view'}
            >
              <option value="">選択してください</option>
              <option value="Timemore">Timemore</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">挽き目</label>
            <input
              type="text"
              value={formData.brewing.grindSetting}
              onChange={e => handleBrewingChange('grindSetting', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              placeholder="例: クリック数や目安"
              readOnly={mode === 'view'}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">抽出時間（分:秒）</label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                max="59"
                value={Math.floor(parseInt(formData.brewing.brewTime || '0') / 60)}
                onChange={e => {
                  const minutes = parseInt(e.target.value) || 0;
                  const seconds = parseInt(formData.brewing.brewTime || '0') % 60;
                  handleBrewingChange('brewTime', String(minutes * 60 + seconds));
                }}
                className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="分"
                readOnly={mode === 'view'}
              />
              <input
                type="number"
                min="0"
                max="59"
                value={parseInt(formData.brewing.brewTime || '0') % 60}
                onChange={e => {
                  const minutes = Math.floor(parseInt(formData.brewing.brewTime || '0') / 60);
                  const seconds = parseInt(e.target.value) || 0;
                  handleBrewingChange('brewTime', String(minutes * 60 + seconds));
                }}
                className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="秒"
                readOnly={mode === 'view'}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
            <textarea
              value={formData.brewing.notes}
              onChange={e => handleBrewingChange('notes', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={3}
              readOnly={mode === 'view'}
            />
          </div>
        </div>
      </section>

      {/* クレマ評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">クレマ評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: 'color', label: '色（淡→濃）' },
            { key: 'thickness', label: '厚み' },
            { key: 'persistence', label: '持続性' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleCremaChange(key as keyof EspressoRecord['crema'], v)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-semibold transition-colors ${
                      formData.crema[key as keyof EspressoRecord['crema']] === v
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                    style={{ aspectRatio: '1 / 1' }}
                    disabled={mode === 'view'}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">クレマノート</label>
          <textarea
            value={formData.crema.notes}
            onChange={e => handleCremaChange('notes', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            rows={2}
            readOnly={mode === 'view'}
          />
        </div>
      </section>

      {/* LE NEZ/LES AROMA */}
      <AromaSection
        type="nose"
        formData={formData}
        onChange={handleAromaChange}
        mode={mode}
        positiveOtherNote={positiveOtherNoteNose}
        onPositiveOtherNoteChange={value => {
          setPositiveOtherNoteNose(value);
          setFormData(prev => ({
            ...prev,
            nose: { ...prev.nose, positive_other_note: value }
          }));
        }}
        negativeOtherNote={negativeOtherNoteNose}
        onNegativeOtherNoteChange={value => {
          setNegativeOtherNoteNose(value);
          setFormData(prev => ({
            ...prev,
            nose: { ...prev.nose, negative_other_note: value }
          }));
        }}
      />
      <AromaSection
        type="aroma"
        formData={formData}
        onChange={handleAromaChange}
        mode={mode}
        positiveOtherNote={positiveOtherNoteAroma}
        onPositiveOtherNoteChange={value => {
          setPositiveOtherNoteAroma(value);
          setFormData(prev => ({
            ...prev,
            aroma: { ...prev.aroma, positive_other_note: value }
          }));
        }}
        negativeOtherNote={negativeOtherNoteAroma}
        onNegativeOtherNoteChange={value => {
          setNegativeOtherNoteAroma(value);
          setFormData(prev => ({
            ...prev,
            aroma: { ...prev.aroma, negative_other_note: value }
          }));
        }}
      />

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'acidity', label: '酸味' },
            { key: 'sweetness', label: '甘み' },
            { key: 'richness', label: '濃厚さ' },
            { key: 'body', label: 'ボディ' },
            { key: 'balance', label: 'バランス' },
            { key: 'cleanliness', label: 'クリーン度' },
            { key: 'aftertaste', label: '余韻' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange(key as keyof EspressoRecord['tasting'], v)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-semibold transition-colors ${
                      formData.tasting[key as keyof EspressoRecord['tasting']] === v
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                    style={{ aspectRatio: '1 / 1' }}
                    disabled={mode === 'view'}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
                disabled={mode === 'view'}
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
                disabled={mode === 'view'}
              />
              <span className="text-2xl font-bold text-gray-900 w-16 text-right">{formData.personal_score}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価点数（クレマ＋テイスティング合計）</label>
            <input
              type="number"
              value={formData.tasting.totalScore + (formData.crema.color + formData.crema.thickness + formData.crema.persistence)}
              readOnly
              className="w-full rounded-md border-gray-300 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">総合評価・コメント</label>
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
              readOnly={mode === 'view'}
            />
          </div>
        </div>
      </section>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {(mode === 'edit' || mode === 'new') && (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '保存中...' : mode === 'edit' ? '更新' : '記録を保存'}
          </button>
        </div>
      )}
    </form>
  );
} 