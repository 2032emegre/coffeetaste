import { useState } from 'react';
import { RoastRecord } from '@/types/roast';
import EnvironmentForm from './EnvironmentForm';
import CoffeeForm from './CoffeeForm';

type RoastFormProps = {
  initialData?: Partial<RoastRecord>;
  onSubmit: (record: RoastRecord) => void;
};

export default function RoastForm({ initialData, onSubmit }: RoastFormProps) {
  const [environment, setEnvironment] = useState(initialData?.environment || {});
  const [coffee, setCoffee] = useState(initialData?.coffee || {});
  const [roastDate, setRoastDate] = useState(initialData?.roast_date || '');
  const [roastLevel, setRoastLevel] = useState(initialData?.roast_level || '');
  const [roastTime, setRoastTime] = useState(initialData?.roast_time || 0);
  const [roastWeightBefore, setRoastWeightBefore] = useState(initialData?.roast_weight_before || 0);
  const [roastWeightAfter, setRoastWeightAfter] = useState(initialData?.roast_weight_after || 0);
  const [roastNotes, setRoastNotes] = useState(initialData?.roast_notes || '');
  const [roastAroma, setRoastAroma] = useState(initialData?.roast_aroma || {
    floral: 0,
    fruity: 0,
    sour: 0,
    sweet: 0,
    bitter: 0,
    body: 0,
    aftertaste: 0,
  });
  const [roastBrewing, setRoastBrewing] = useState(initialData?.roast_brewing || {
    method: '',
    grind_size: '',
    water_temp: 0,
    ratio: 0,
    extraction_time: 0,
    notes: '',
  });
  const [roastTasting, setRoastTasting] = useState(initialData?.roast_tasting || {
    acidity: 0,
    sweetness: 0,
    bitterness: 0,
    body: 0,
    aftertaste: 0,
    balance: 0,
    overall: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || '',
      user_id: initialData?.user_id || '',
      environment_id: initialData?.environment_id || '',
      coffee_id: initialData?.coffee_id || '',
      created_at: initialData?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      roast_date: roastDate,
      roast_level: roastLevel,
      roast_time: roastTime,
      roast_weight_before: roastWeightBefore,
      roast_weight_after: roastWeightAfter,
      roast_notes: roastNotes,
      roast_aroma: roastAroma,
      roast_brewing: roastBrewing,
      roast_tasting: roastTasting,
      environment,
      coffee,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">環境情報</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <EnvironmentForm
              initialData={environment}
              onChange={setEnvironment}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">コーヒー情報</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <CoffeeForm
              initialData={coffee}
              onChange={setCoffee}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">焙煎情報</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="roast_date" className="block text-sm font-medium text-gray-700">
                  焙煎日
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="roast_date"
                    id="roast_date"
                    value={roastDate}
                    onChange={(e) => setRoastDate(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roast_level" className="block text-sm font-medium text-gray-700">
                  焙煎度
                </label>
                <div className="mt-1">
                  <select
                    id="roast_level"
                    name="roast_level"
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="light">浅煎り</option>
                    <option value="medium">中煎り</option>
                    <option value="dark">深煎り</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roast_time" className="block text-sm font-medium text-gray-700">
                  焙煎時間（分）
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="roast_time"
                    id="roast_time"
                    value={roastTime}
                    onChange={(e) => setRoastTime(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roast_weight_before" className="block text-sm font-medium text-gray-700">
                  焙煎前重量（g）
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="roast_weight_before"
                    id="roast_weight_before"
                    value={roastWeightBefore}
                    onChange={(e) => setRoastWeightBefore(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roast_weight_after" className="block text-sm font-medium text-gray-700">
                  焙煎後重量（g）
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="roast_weight_after"
                    id="roast_weight_after"
                    value={roastWeightAfter}
                    onChange={(e) => setRoastWeightAfter(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="roast_notes" className="block text-sm font-medium text-gray-700">
                  焙煎メモ
                </label>
                <div className="mt-1">
                  <textarea
                    id="roast_notes"
                    name="roast_notes"
                    rows={3}
                    value={roastNotes}
                    onChange={(e) => setRoastNotes(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">焙煎後のアロマ</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {Object.entries(roastAroma).map(([key, value]) => (
                <div key={key} className="sm:col-span-3">
                  <label htmlFor={`roast_aroma_${key}`} className="block text-sm font-medium text-gray-700">
                    {key}
                  </label>
                  <div className="mt-1">
                    <input
                      type="range"
                      name={`roast_aroma_${key}`}
                      id={`roast_aroma_${key}`}
                      min="0"
                      max="5"
                      step="0.5"
                      value={value}
                      onChange={(e) => setRoastAroma({ ...roastAroma, [key]: Number(e.target.value) })}
                      className="block w-full"
                    />
                    <div className="mt-1 text-sm text-gray-500">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">焙煎後の抽出</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="brewing_method" className="block text-sm font-medium text-gray-700">
                  抽出方法
                </label>
                <div className="mt-1">
                  <select
                    id="brewing_method"
                    name="brewing_method"
                    value={roastBrewing.method}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, method: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="handdrip">ハンドドリップ</option>
                    <option value="espresso">エスプレッソ</option>
                    <option value="frenchpress">フレンチプレス</option>
                    <option value="aeropress">エアロプレス</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="grind_size" className="block text-sm font-medium text-gray-700">
                  粉の粗さ
                </label>
                <div className="mt-1">
                  <select
                    id="grind_size"
                    name="grind_size"
                    value={roastBrewing.grind_size}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, grind_size: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="fine">細挽き</option>
                    <option value="medium">中挽き</option>
                    <option value="coarse">粗挽き</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="water_temp" className="block text-sm font-medium text-gray-700">
                  お湯の温度（℃）
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="water_temp"
                    id="water_temp"
                    value={roastBrewing.water_temp}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, water_temp: Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="ratio" className="block text-sm font-medium text-gray-700">
                  粉水比
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="ratio"
                    id="ratio"
                    value={roastBrewing.ratio}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, ratio: Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="extraction_time" className="block text-sm font-medium text-gray-700">
                  抽出時間（秒）
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="extraction_time"
                    id="extraction_time"
                    value={roastBrewing.extraction_time}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, extraction_time: Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="brewing_notes" className="block text-sm font-medium text-gray-700">
                  抽出メモ
                </label>
                <div className="mt-1">
                  <textarea
                    id="brewing_notes"
                    name="brewing_notes"
                    rows={3}
                    value={roastBrewing.notes}
                    onChange={(e) => setRoastBrewing({ ...roastBrewing, notes: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">テイスティング</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {Object.entries(roastTasting).map(([key, value]) => (
                key === 'notes' ? (
                  <div key={key} className="sm:col-span-6">
                    <label htmlFor={`tasting_${key}`} className="block text-sm font-medium text-gray-700">
                      {key}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id={`tasting_${key}`}
                        name={`tasting_${key}`}
                        rows={3}
                        value={value}
                        onChange={(e) => setRoastTasting({ ...roastTasting, [key]: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div key={key} className="sm:col-span-3">
                    <label htmlFor={`tasting_${key}`} className="block text-sm font-medium text-gray-700">
                      {key}
                    </label>
                    <div className="mt-1">
                      <input
                        type="range"
                        name={`tasting_${key}`}
                        id={`tasting_${key}`}
                        min="0"
                        max="5"
                        step="0.5"
                        value={value}
                        onChange={(e) => setRoastTasting({ ...roastTasting, [key]: Number(e.target.value) })}
                        className="block w-full"
                      />
                      <div className="mt-1 text-sm text-gray-500">{value}</div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          保存
        </button>
      </div>
    </form>
  );
} 