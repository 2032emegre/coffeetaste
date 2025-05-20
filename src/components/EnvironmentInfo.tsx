import { TastingRecord } from '@/types/tasting';

const WEATHER_OPTIONS = [
  '晴れ',
  '曇り',
  '雨',
  '雪',
  '霧',
  '強風',
] as const;

type EnvironmentInfoProps = {
  formData: TastingRecord;
  onChange: (key: keyof TastingRecord['environment'], value: any) => void;
  mode?: 'new' | 'edit' | 'view';
};

export default function EnvironmentInfo({ formData, onChange, mode = 'new' }: EnvironmentInfoProps) {
  const isViewMode = mode === 'view';

  // 日付と時刻の表示用フォーマット
  const formatDateTime = (date: string, time: string) => {
    return `${date} ${time}`;
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">環境情報</h2>
      <div className="flex flex-wrap items-center gap-4">
        {/* 日付と時刻 */}
        {isViewMode ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{formatDateTime(formData.environment.date, formData.environment.time)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={formData.environment.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
            <input
              type="time"
              value={formData.environment.time}
              onChange={(e) => onChange('time', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        )}

        {/* 天気 */}
        {isViewMode ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">|</span>
            <span className="text-gray-700">{formData.environment.weather}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">|</span>
            <select
              value={formData.environment.weather}
              onChange={(e) => onChange('weather', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
              <option value="">選択してください</option>
              {WEATHER_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 気温 */}
        {isViewMode ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">|</span>
            <span className="text-gray-700">{formData.environment.temperature}℃</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">|</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={formData.environment.temperature ?? ''}
                onChange={(e) => onChange('temperature', e.target.value === '' ? null : Number(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                min="-50"
                max="50"
                step="0.1"
              />
              <span className="text-gray-500">℃</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 