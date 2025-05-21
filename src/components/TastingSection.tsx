import { ShopVisitRecord } from '@/types/tasting';

type TastingSectionProps = {
  tasting: ShopVisitRecord['tasting'];
  onChange: (key: keyof ShopVisitRecord['tasting'], value: number) => void;
};

export default function TastingSection({ tasting, onChange }: TastingSectionProps) {
  const tastingFields = [
    { key: 'acidity' as const, label: '酸味' },
    { key: 'sweetness' as const, label: '甘味' },
    { key: 'richness' as const, label: '濃厚さ' },
    { key: 'body' as const, label: 'ボディ' },
    { key: 'balance' as const, label: 'バランス' },
    { key: 'cleanliness' as const, label: 'クリーン度' },
    { key: 'aftertaste' as const, label: '余韻' },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">テイスティング評価</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tastingFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => onChange(field.key, v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    tasting[field.key] === v
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">合計スコア</label>
          <input
            type="number"
            value={tasting.totalScore}
            readOnly
            className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
} 