import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import RadarChart from './RadarChart';
import { ShopVisitRecord } from '@/types/tasting';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ダミーデータ
const dummyShopVisits: ShopVisitRecord[] = [
  {
    id: '1',
    environment: {
      date: '2024-06-01',
      time: '14:00',
      weather: '晴れ',
      temperature: 25,
      humidity: '50',
      isAutoFetched: false,
    },
    shop: { name: 'カフェ・ド・サンプル', link: 'https://samplecafe.com' },
    items: [
      { name: 'エチオピアコーヒー', price: 600, type: 'coffee', origin: 'エチオピア', roastLevel: '浅煎り', variety: 'Heirloom', method: 'ハンドドリップ' },
      { name: 'カフェラテ', price: 650, type: 'other', method: 'エスプレッソ' }
    ],
    tasting: {
      acidity: 4,
      sweetness: 3,
      body: 4,
      balance: 5,
      cleanliness: 4,
      aftertaste: 3,
      richness: 4,
      totalScore: 23,
    },
    comments: '明るい酸味と華やかな香りが印象的。店内も落ち着いた雰囲気で良かった。',
    staffInfo: '店主はとても親切',
    created_at: '2024-06-01T14:00:00Z',
  },
  {
    id: '2',
    environment: {
      date: '2024-05-28',
      time: '11:30',
      weather: '曇り',
      temperature: 20,
      humidity: '60',
      isAutoFetched: false,
    },
    shop: { name: '喫茶サンプル', link: '' },
    items: [
      { name: 'グアテマラ', price: 550, type: 'coffee', origin: 'グアテマラ', roastLevel: '中煎り', variety: 'ブルボン', method: 'ハンドドリップ' }
    ],
    tasting: {
      acidity: 3,
      sweetness: 4,
      body: 3,
      balance: 4,
      cleanliness: 5,
      aftertaste: 4,
      richness: 3,
      totalScore: 23,
    },
    comments: 'バランスが良く飲みやすい。',
    staffInfo: '',
    created_at: '2024-05-28T11:30:00Z',
  },
];

// 日付フォーマット用の関数
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 価格表示用の関数
const formatPrice = (price: number) => {
  return `¥${price.toLocaleString()}`;
};

type Filters = {
  minPrice: number | null;
  maxPrice: number | null;
  startDate: string | null;
  endDate: string | null;
  shopName: string;
};

type ShopVisitListProps = {
  filters: Filters;
  sortOrder: 'asc' | 'desc';
};

function mapRecordFromSupabase(row: any): ShopVisitRecord {
  return {
    id: row.id,
    environment: {
      date: row.date,
      time: row.time,
      weather: row.weather,
      temperature: row.temperature,
      humidity: row.humidity?.toString() ?? '',
      isAutoFetched: false,
    },
    shop: {
      name: row.shop_name,
      link: row.shop_link,
    },
    items: row.items || [],
    tasting: row.tasting || {
      acidity: 0,
      sweetness: 0,
      body: 0,
      balance: 0,
      cleanliness: 0,
      aftertaste: 0,
      richness: 0,
      totalScore: 0,
    },
    comments: row.comments || '',
    staffInfo: row.staff_info || '',
    created_at: row.created_at,
  };
}

export default function ShopVisitList({ filters, sortOrder }: ShopVisitListProps) {
  const router = useRouter();
  const [records, setRecords] = useState<ShopVisitRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('shop_visit_records')
        .select('*')
        .order('date', { ascending: sortOrder === 'asc' });
      if (error) {
        setRecords([]);
        setLoading(false);
        return;
      }
      setRecords((data || []).map(mapRecordFromSupabase));
      setLoading(false);
    };
    fetchRecords();
  }, [sortOrder]);

  // フィルタリング
  const filteredRecords = useMemo(() => {
    return records
      .filter(record => {
        if (filters.shopName && !record.shop.name?.toLowerCase().includes(filters.shopName.toLowerCase())) return false;
        const recordDate = new Date(record.environment.date);
        if (filters.startDate && recordDate < new Date(filters.startDate)) return false;
        if (filters.endDate && recordDate > new Date(filters.endDate)) return false;
        const items = Array.isArray(record.items) ? record.items : [];
        const hasValidPrice = items.some(item => {
          if (!item.price) return true;
          if (filters.minPrice && item.price < filters.minPrice) return false;
          if (filters.maxPrice && item.price > filters.maxPrice) return false;
          return true;
        });
        if (!hasValidPrice) return false;
        return true;
      });
  }, [filters, records]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm('本当にこの記録を削除しますか？')) {
      // Supabaseからも削除
      await supabase.from('shop_visit_records').delete().eq('id', id);
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <div className="text-xs text-gray-500">{formatDate(record.environment.date)}</div>
              <div className="text-lg font-bold text-gray-900">{record.shop.name}</div>
            </div>
            <div className="px-6 pb-2 text-sm text-gray-700">
              <div className="mb-1 font-bold">飲んだもの:</div>
              <ul className="list-disc list-inside space-y-1">
                {Array.isArray(record.items) && record.items.map((item, index) => (
                  <li key={index} className="font-normal">
                    {item.name}
                    {item.price && <span className="ml-2 text-gray-500">({formatPrice(item.price)})</span>}
                    {item.type === 'coffee' && item.origin && (
                      <span className="ml-2 text-xs text-gray-500">
                        {item.origin} / {item.roastLevel}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center my-4">
              <RadarChart tasting={{
                acidity: record.tasting?.acidity ?? 0,
                sweetness: record.tasting?.sweetness ?? 0,
                richness: record.tasting?.richness ?? 0,
                body: record.tasting?.body ?? 0,
                balance: record.tasting?.balance ?? 0,
                cleanliness: record.tasting?.cleanliness ?? 0,
                aftertaste: record.tasting?.aftertaste ?? 0,
              }} />
            </div>
            <div className="px-6 pb-4 text-xs text-gray-700 flex-1">
              <div className="font-medium text-gray-900 mb-1">コメント</div>
              <div className="whitespace-pre-wrap">{record.comments}</div>
              {record.staffInfo && (
                <div className="mt-2 text-gray-500">
                  <span className="font-medium">スタッフ情報: </span>
                  {record.staffInfo}
                </div>
              )}
              <div className="mt-2 text-gray-500">
                <span className="font-medium">環境: </span>
                {record.environment.weather} / {record.environment.temperature}°C / 湿度{record.environment.humidity}%
              </div>
            </div>
            <div className="px-6 pb-4 flex gap-2 mt-auto">
              <button
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                onClick={() => router.push(`/records/shop/${record.id}`)}
              >
                詳細を見る →
              </button>
              <button
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                onClick={() => router.push(`/records/shop/${record.id}/edit`)}
              >
                編集
              </button>
              <button
                className="text-xs sm:text-sm text-gray-600 hover:text-white border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-900"
                onClick={() => handleDelete(record.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredRecords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          記録がありません。
        </div>
      )}
    </div>
  );
} 