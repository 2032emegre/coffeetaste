import { TastingRecord } from '@/types/tasting';

type AromaSectionProps = {
  type: 'nose' | 'aroma';
  formData: TastingRecord;
  onChange: (type: 'nose' | 'aroma', field: 'positive' | 'negative' | 'notes', key: string, value: boolean | string) => void;
  mode?: 'new' | 'edit' | 'view';
  positiveOtherNote: string;
  onPositiveOtherNoteChange: (value: string) => void;
  negativeOtherNote: string;
  onNegativeOtherNoteChange: (value: string) => void;
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

export default function AromaSection({ type, formData, onChange, mode = 'new', positiveOtherNote, onPositiveOtherNoteChange, negativeOtherNote, onNegativeOtherNoteChange }: AromaSectionProps) {
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
    onChange(type, 'notes', '', value);
  };

  const renderAromaList = (field: 'positive' | 'negative', aromas: typeof positiveAromas | typeof negativeAromas) => {
    const isPositive = field === 'positive';
    const otherNote = isPositive ? positiveOtherNote : negativeOtherNote;
    const onOtherNoteChange = isPositive ? onPositiveOtherNoteChange : onNegativeOtherNoteChange;
    if (isViewMode) {
      const selectedAromas = aromas
        .filter(aroma => data[field][aroma.key])
        .map(aroma => aroma.label);
      const otherChecked = !!data[field].other;
      return (
        <div className="text-gray-900">
          {selectedAromas.length > 0 ? selectedAromas.join('、') : 'なし'}
          {otherChecked && otherNote && `、その他: ${otherNote}`}
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
        <label className="inline-flex items-center col-span-full mt-2">
          <input
            type="checkbox"
            checked={Boolean(data[field].other)}
            onChange={(e) => handleCheckboxChange(field, 'other', e.target.checked)}
            className="rounded border-gray-300 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          <span className="ml-2 text-sm text-gray-700">その他</span>
        </label>
        <div className="col-span-full mt-1">
          <input
            type="text"
            placeholder="その他の内容"
            value={otherNote}
            onChange={(e) => onOtherNoteChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold text-gray-700 mb-1">ポジティブ</div>
          {renderAromaList('positive', positiveAromas)}
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">ネガティブ</div>
          {renderAromaList('negative', negativeAromas)}
        </div>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ノート</label>
            <textarea
          value={data.notes ?? ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              rows={3}
          placeholder="ノートを入力してください"
            />
      </div>
    </section>
  );
} 