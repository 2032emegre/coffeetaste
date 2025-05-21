import { ShopVisitRecord } from '@/types/tasting';

// Supabaseのカラム名（snake_case）に変換
export function toSupabaseRow(record: ShopVisitRecord) {
  return {
    date: record.environment.date,
    time: record.environment.time,
    weather: record.environment.weather,
    temperature: record.environment.temperature,
    humidity: record.environment.humidity,
    shop_name: record.shop.name,
    shop_link: record.shop.link,
    items: record.items,
    tasting: record.tasting,
    comments: record.comments,
    staff_info: record.staffInfo,
    created_at: record.created_at,
  };
}

// Supabaseのカラム名（snake_case）から型定義（camelCase）に変換
export function fromSupabaseRow(row: any): ShopVisitRecord {
  return {
    id: row.id,
    environment: {
      date: row.date,
      time: row.time,
      weather: row.weather,
      temperature: row.temperature,
      humidity: row.humidity,
    },
    shop: {
      name: row.shop_name,
      link: row.shop_link,
    },
    items: row.items,
    tasting: row.tasting,
    comments: row.comments,
    staffInfo: row.staff_info,
    created_at: row.created_at,
  };
} 