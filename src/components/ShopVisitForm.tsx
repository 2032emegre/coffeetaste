import { useState, useEffect } from 'react';
import { ShopVisitRecord } from '@/types/tasting';
import EnvironmentInfo from './EnvironmentInfo';
import TastingSection from './TastingSection';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ShopVisitFormProps = {
  initialData?: ShopVisitRecord;
  onSubmit: (data: ShopVisitRecord) => Promise<void>;
  isSubmitting?: boolean;
  submitError?: string | null;
};

export default function ShopVisitForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitError = null,
}: ShopVisitFormProps) {
  const [formData, setFormData] = useState<ShopVisitRecord>(() => ({
    environment: {
      date: '',
      time: '',
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
    ...initialData,
  }));

  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // 天気・気温自動取得
  const fetchWeather = async () => {
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const res = await fetch('/api/weather');
      if (!res.ok) throw new Error('天気情報の取得に失敗しました');
      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        environment: {
          ...prev.environment,
          weather: data.weather || '',
          temperature: data.temperature !== '' ? Number(data.temperature) : null,
          isAutoFetched: true,
        },
      }));
    } catch (e: any) {
      setWeatherError(e.message || '天気情報の取得に失敗しました');
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleEnvironmentChange = (key: keyof ShopVisitRecord['environment'], value: any) => {
    setFormData(prev => ({
      ...prev,
      environment: {
        ...prev.environment,
        [key]: value,
      },
    }));
  };

  const handleShopChange = (key: keyof ShopVisitRecord['shop'], value: string) => {
    setFormData(prev => ({
      ...prev,
      shop: {
        ...prev.shop,
        [key]: value,
      },
    }));
  };

  const handleItemAdd = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: '',
          price: 0,
          attributes: {
            acidity: 0,
            sweetness: 0,
            richness: 0,
            body: 0,
            balance: 0,
            cleanliness: 0,
            aftertaste: 0,
          },
        },
      ],
    }));
  };

  const handleItemChange = (index: number, key: keyof ShopVisitRecord['items'][0], value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]: value,
            }
          : item
      ),
    }));
  };

  const handleItemRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleTastingChange = (key: keyof ShopVisitRecord['tasting'], value: number) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 環境情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">環境情報</h2>
        <EnvironmentInfo
          formData={formData}
          onChange={handleEnvironmentChange}
          mode="edit"
          recordType="shop"
        />
      </section>

      {/* 店舗情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">店舗情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店舗名</label>
            <input
              type="text"
              value={formData.shop.name}
              onChange={e => handleShopChange('name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店舗リンク</label>
            <input
              type="url"
              value={formData.shop.link}
              onChange={e => handleShopChange('link', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* 飲み物リスト */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">飲み物リスト</h2>
          <button
            type="button"
            onClick={handleItemAdd}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            追加
          </button>
        </div>
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">飲み物名</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => handleItemChange(index, 'name', e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">価格</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={e => handleItemChange(index, 'price', Number(e.target.value))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">飲み物種別</label>
                    <select
                      value={item.type || ''}
                      onChange={e => handleItemChange(index, 'type', e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="coffee">コーヒー</option>
                      <option value="tea">紅茶</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">淹れ方</label>
                    <select
                      value={item.method || ''}
                      onChange={e => handleItemChange(index, 'method', e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="ハンドドリップ">ハンドドリップ</option>
                      <option value="エスプレッソ">エスプレッソ</option>
                      <option value="フレンチプレス">フレンチプレス</option>
                      <option value="サイフォン">サイフォン</option>
                      <option value="エアロプレス">エアロプレス</option>
                      <option value="その他">その他</option>
                    </select>
                    {item.method === 'その他' && (
                      <input
                        type="text"
                        value={item.methodOther || ''}
                        onChange={e => handleItemChange(index, 'methodOther', e.target.value)}
                        className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                        placeholder="その他の淹れ方を記入"
                      />
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleItemRemove(index)}
                  className="ml-4 p-1 text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* コーヒーの場合のみ属性入力欄を表示 */}
              {item.type === 'coffee' && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">コーヒー属性</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">産地</label>
                      <input
                        type="text"
                        value={item.origin || ''}
                        onChange={e => handleItemChange(index, 'origin', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                        placeholder="例: エチオピア"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">焙煎度</label>
                      <input
                        type="text"
                        value={item.roastLevel || ''}
                        onChange={e => handleItemChange(index, 'roastLevel', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                        placeholder="例: 浅煎り"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">品種</label>
                      <input
                        type="text"
                        value={item.variety || ''}
                        onChange={e => handleItemChange(index, 'variety', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                        placeholder="例: ブルボン"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* テイスティング評価 */}
      <TastingSection
        tasting={formData.tasting}
        onChange={handleTastingChange}
      />

      {/* コメント・スタッフ情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">その他の情報</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
            <textarea
              value={formData.comments}
              onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={4}
              placeholder="店舗の雰囲気や印象、気づきなどを記入してください"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">スタッフ情報</label>
            <textarea
              value={formData.staffInfo}
              onChange={e => setFormData(prev => ({ ...prev, staffInfo: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={2}
              placeholder="スタッフの対応や印象などを記入してください"
            />
          </div>
        </div>
      </section>

      {/* エラーメッセージ */}
      {submitError && (
        <div className="text-red-500 text-sm">{submitError}</div>
      )}

      {/* 送信ボタン */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
} 