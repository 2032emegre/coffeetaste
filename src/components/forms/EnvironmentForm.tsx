import { useState } from 'react';
import { Environment } from '@/types/environment';

type EnvironmentFormProps = {
  initialData?: Partial<Environment>;
  onChange: (environment: Environment) => void;
};

export default function EnvironmentForm({ initialData, onChange }: EnvironmentFormProps) {
  const [temperature, setTemperature] = useState(initialData?.temperature || 0);
  const [humidity, setHumidity] = useState(initialData?.humidity || 0);
  const [pressure, setPressure] = useState(initialData?.pressure || 0);
  const [location, setLocation] = useState(initialData?.location || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleChange = () => {
    onChange({
      id: initialData?.id || '',
      user_id: initialData?.user_id || '',
      created_at: initialData?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      temperature,
      humidity,
      pressure,
      location,
      notes,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
          気温（℃）
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="temperature"
            id="temperature"
            value={temperature}
            onChange={(e) => {
              setTemperature(Number(e.target.value));
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="humidity" className="block text-sm font-medium text-gray-700">
          湿度（%）
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="humidity"
            id="humidity"
            value={humidity}
            onChange={(e) => {
              setHumidity(Number(e.target.value));
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="pressure" className="block text-sm font-medium text-gray-700">
          気圧（hPa）
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="pressure"
            id="pressure"
            value={pressure}
            onChange={(e) => {
              setPressure(Number(e.target.value));
              handleChange();
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          場所
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
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