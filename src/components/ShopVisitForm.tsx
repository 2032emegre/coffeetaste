import { useState } from "react";
import EnvironmentInfo from "./EnvironmentInfo";
import { ShopVisitRecord } from '@/types/tasting';

// props型
interface ShopVisitFormProps {
  initialData?: Partial<ShopVisitRecord>;
  onSubmit?: (data: ShopVisitRecord) => void;
  loading?: boolean;
  error?: string | null;
}

export default function ShopVisitForm({ initialData, onSubmit, loading, error }: ShopVisitFormProps) {
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0];
  const defaultTime = today.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });

  const [form, setForm] = useState<ShopVisitRecord>({
    id: '',
    environment: initialData?.environment || {
      date: defaultDate,
      time: defaultTime,
      weather: '',
      temperature: null,
      humidity: '',
      isAutoFetched: false,
    },
    shop: initialData?.shop || { name: '', link: '' },
    items: initialData?.items || [{ name: '', price: undefined, isCoffee: false, origin: '', roastLevel: '', variety: '', method: '' }],
    tasting: initialData?.tasting || {
      acidity: 0,
      sweetness: 0,
      body: 0,
      balance: 0,
      cleanness: 0,
      aftertaste: 0,
      totalScore: 0,
    },
    comments: initialData?.comments || '',
    staffInfo: initialData?.staffInfo || '',
    created_at: '',
  });

  // --- ハンドラ ---
  const handleEnvChange = (key: keyof ShopVisitRecord['environment'], value: any) => {
    setForm(prev => ({ ...prev, environment: { ...prev.environment, [key]: value } }));
  };
  const handleShopChange = (key: keyof ShopVisitRecord['shop'], value: any) => {
    setForm(prev => ({ ...prev, shop: { ...prev.shop, [key]: value } }));
  };
  const handleItemChange = (idx: number, key: string, value: any) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === idx ? { ...item, [key]: value } : item)
    }));
  };
  const addItem = () => {
    setForm(prev => ({ ...prev, items: [...prev.items, { name: '', price: undefined, isCoffee: false, origin: '', roastLevel: '', variety: '', method: '' }] }));
  };
  const removeItem = (idx: number) => {
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };
  const handleTastingChange = (key: keyof ShopVisitRecord['tasting'], value: number) => {
    setForm(prev => ({ ...prev, tasting: { ...prev.tasting, [key]: value } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  // --- UI ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 環境情報 */}
      <EnvironmentInfo formData={form as any} onChange={handleEnvChange} mode="new" />

      {/* 店舗情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">店舗情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店名</label>
            <input type="text" value={form.shop.name} onChange={e => handleShopChange('name', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SNS・Webサイト等リンク</label>
            <input type="url" value={form.shop.link || ''} onChange={e => handleShopChange('link', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" placeholder="https://" />
          </div>
        </div>
      </section>

      {/* 飲んだ飲み物リスト */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">飲んだ飲み物</h2>
        {form.items.map((item, idx) => (
          <div key={idx} className="mb-4 border-b pb-4">
            <div className="flex gap-2 items-center mb-2">
              <input type="text" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="飲み物名" className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" required />
              <input type="number" value={item.price ?? ''} onChange={e => handleItemChange(idx, 'price', e.target.value ? Number(e.target.value) : undefined)} placeholder="値段" className="w-24 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
              <button type="button" onClick={() => removeItem(idx)} className="text-red-500 text-xs">削除</button>
            </div>
            <div className="flex gap-4 items-center mb-2">
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={item.isCoffee} onChange={e => handleItemChange(idx, 'isCoffee', e.target.checked)} />コーヒー
              </label>
              {item.isCoffee && (
                <>
                  <input type="text" value={item.origin || ''} onChange={e => handleItemChange(idx, 'origin', e.target.value)} placeholder="産地" className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
                  <input type="text" value={item.roastLevel || ''} onChange={e => handleItemChange(idx, 'roastLevel', e.target.value)} placeholder="焙煎度" className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
                  <input type="text" value={item.variety || ''} onChange={e => handleItemChange(idx, 'variety', e.target.value)} placeholder="品種" className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
                </>
              )}
              <input type="text" value={item.method || ''} onChange={e => handleItemChange(idx, 'method', e.target.value)} placeholder="淹れ方" className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
            </div>
          </div>
        ))}
        <button type="button" onClick={addItem} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">＋飲み物を追加</button>
      </section>

      {/* テイスティング評価 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左カラム */}
          <div className="space-y-6">
            {/* 酸味 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">酸味</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange('acidity', v)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.acidity === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            {/* 濃厚さ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">濃厚さ</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange('body', v)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.body === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.balance === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.aftertaste === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* 右カラム */}
          <div className="space-y-6">
            {/* 甘味 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">甘味</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange('sweetness', v)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.sweetness === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            {/* ボディ（濃厚さと分けて表示） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ボディ</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange('body', v)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.body === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            {/* クリーン度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">クリーン度</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleTastingChange('cleanness', v)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${form.tasting.cleanness === v ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コメント・スタッフ情報 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">メモ・コメント</h2>
        <textarea value={form.comments} onChange={e => setForm(prev => ({ ...prev, comments: e.target.value }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" rows={3} placeholder="感想や気づきなど" />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">お店の方情報</label>
          <input type="text" value={form.staffInfo || ''} onChange={e => setForm(prev => ({ ...prev, staffInfo: e.target.value }))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500" placeholder="名前や印象など" />
        </div>
      </section>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-700" disabled={loading}>
        {loading ? "保存中..." : "保存"}
      </button>
    </form>
  );
} 