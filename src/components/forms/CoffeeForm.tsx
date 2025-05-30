import { useState } from 'react';
import { Coffee } from '@/types/coffee';

type CoffeeFormProps = {
  initialData?: Partial<Coffee>;
  onChange: (coffee: Coffee) => void;
};

export default function CoffeeForm({ initialData, onChange }: CoffeeFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [origin, setOrigin] = useState(initialData?.origin || '');
  const [process, setProcess] = useState(initialData?.process || '');
  const [variety, setVariety] = useState(initialData?.variety || '');
  const [farm, setFarm] = useState(initialData?.farm || '');
  const [elevation, setElevation] = useState(initialData?.elevation || 0);
  const [harvestDate, setHarvestDate] = useState(initialData?.harvest_date || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleChange = () => {
    onChange({
      id: initialData?.id || '',
      user_id: initialData?.user_id || '',
      created_at: initialData?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name,
      origin,
      process,
      variety,
      farm,
      elevation,
      harvest_date: harvestDate,
      notes,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          コーヒー名
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
          産地
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="origin"
            id="origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="process" className="block text-sm font-medium text-gray-700">
          処理方法
        </label>
        <div className="mt-1">
          <select
            id="process"
            name="process"
            value={process}
            onChange={(e) => {
              setProcess(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="washed">ウォッシュド</option>
            <option value="natural">ナチュラル</option>
            <option value="honey">ハニー</option>
            <option value="anaerobic">嫌気性発酵</option>
          </select>
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="variety" className="block text-sm font-medium text-gray-700">
          品種
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="variety"
            id="variety"
            value={variety}
            onChange={(e) => {
              setVariety(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="farm" className="block text-sm font-medium text-gray-700">
          農園
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="farm"
            id="farm"
            value={farm}
            onChange={(e) => {
              setFarm(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="elevation" className="block text-sm font-medium text-gray-700">
          標高（m）
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="elevation"
            id="elevation"
            value={elevation}
            onChange={(e) => {
              setElevation(Number(e.target.value));
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="harvest_date" className="block text-sm font-medium text-gray-700">
          収穫日
        </label>
        <div className="mt-1">
          <input
            type="date"
            name="harvest_date"
            id="harvest_date"
            value={harvestDate}
            onChange={(e) => {
              setHarvestDate(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          メモ
        </label>
        <div className="mt-1">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
} 