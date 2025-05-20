import { TastingRecord } from '@/types/tasting';

type AromaSectionProps = {
  type: 'nose' | 'aroma';
  formData: TastingRecord;
  onChange: (type: 'nose' | 'aroma', field: 'positive' | 'negative', key: string, value: boolean | string) => void;
  mode?: 'new' | 'edit' | 'view';
};

const positiveAromas = [
  { key: 'nuts', label: 'ナッツ' },
  { key: 'redFruits', label: '赤い果実' },
  { key: 'stoneFruits', label: '核果' },
  { key: 'herbs', label: '草葉' },
  { key: 'tropicalFruits', label: 'トロピカルフルーツ' },
  { key: 'citrus', label: '柑橘類' },
  { key: 'flowers', label: '花' },
  { key: 'spices', label: 'スパイス' },
] as const;

const negativeAromas = [
  { key: 'tobacco', label: 'タバコ' },
  { key: 'burnt', label: '焦げ臭' },
  { key: 'herbs', label: '草葉' },
  { key: 'woody', label: '樹木' },
] as const;

export default function AromaSection({ type, formData, onChange, mode = 'new' }: AromaSectionProps) {
  const isViewMode = mode === 'view';
  const title = type === 'nose' ? 'LE NEZ（香り）' : 'LES ARÔMES（アロマ）';
  const data = type === 'nose' ? formData.nose : formData.aroma;

  const handleCheckboxChange = (field: 'positive' | 'negative', key: string, checked: boolean) => {
    onChange(type, field, key, checked);
  };

  const handleOtherChange = (field: 'positive' | 'negative', value: string) => {
    onChange(type, field, 'other', value);
  };

  const handleNotesChange = (value: string) => {
    onChange(type, 'positive', 'notes', value);
  };

  const renderAromaList = (field: 'positive' | 'negative', aromas: typeof positiveAromas | typeof negativeAromas) => {
    if (isViewMode) {
      const selectedAromas = aromas
        .filter(aroma => data[field][aroma.key])
        .map(aroma => aroma.label);
      const other = data[field].other;
      return (
        <div className="text-gray-900">
          {selectedAromas.length > 0 ? selectedAromas.join('、') : 'なし'}
          {other && `、その他: ${other}`}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {aromas.map((aroma) => (
          <label key={aroma.key} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={Boolean(data[field][aroma.key])}
              onChange={(e) => handleCheckboxChange(field, aroma.key, e.target.checked)}
              className="rounded border-gray-300 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
            <span className="ml-2 text-sm text-gray-700">{aroma.label}</span>
          </label>
        ))}
        <div className="col-span-full mt-2">
          <input
            type="text"
            placeholder="その他"
            value={String(data[field].other || '')}
            onChange={(e) => handleOtherChange(field, e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">ポジティブ</h3>
          {renderAromaList('positive', positiveAromas)}
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">ネガティブ</h3>
          {renderAromaList('negative', negativeAromas)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ノート
          </label>
          {isViewMode ? (
            <div className="text-gray-900">{data.notes || 'なし'}</div>
          ) : (
            <textarea
              value={data.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={3}
            />
          )}
        </div>
      </div>
    </section>
  );
} 