import { RoastRecord } from '@/types/roast';

type RoastRecordKey = keyof RoastRecord;

export function validateRoastRecord(data: Partial<RoastRecord>): string | null {
  // 必須フィールドのチェック
  const requiredFields: RoastRecordKey[] = ['bean_name', 'roast_date'];
  for (const field of requiredFields) {
    if (!data[field]) {
      return `${field}は必須です`;
    }
  }

  // 数値フィールドのチェック
  const numericFields: RoastRecordKey[] = [
    'weight',
    'charge_weight',
    'temperature',
    'humidity',
    'pressure',
    'altitude',
    'charge_temp',
    'moisture',
    'after_weight',
    'drop_temp',
    'color',
    'total_time',
    'acidity',
    'sweetness',
    'bitterness',
    'body',
    'balance',
    'nose_intensity',
    'aroma_intensity',
    'personal_score',
    'overall_total_score'
  ];

  for (const field of numericFields) {
    const value = data[field];
    if (value !== undefined && value !== null) {
      const num = Number(value);
      if (isNaN(num)) {
        return `${field}は数値である必要があります`;
      }

      // スコアフィールドの範囲チェック
      if (field.startsWith('tasting_') && (num < 0 || num > 10)) {
        return `${field}は0から10の間である必要があります`;
      }

      // 個人スコアの範囲チェック
      if (field === 'personal_score' && (num < 0 || num > 100)) {
        return '個人スコアは0から100の間である必要があります';
      }
    }
  }

  return null;
} 