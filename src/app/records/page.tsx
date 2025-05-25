'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TastingRecord, ShopVisitRecord } from '@/types/tasting';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import Chart from 'chart.js/auto';
import RadarChart from '@/components/RadarChart';
import { createClient } from '@supabase/supabase-js';
import ShopVisitList from '@/components/ShopVisitList';
import ShopVisitFilter from '@/components/ShopVisitFilter';
import ShopVisitForm from '@/components/ShopVisitForm';
import { useRouter } from 'next/navigation';
import HanddripCard from '@/components/records/HanddripCard';
import EspressoCard from '@/components/records/EspressoCard';
import RoastCard from '@/components/records/RoastCard';
import ShopCard from '@/components/records/ShopCard';

type TastingKey = keyof TastingRecord['tasting'];
type TastingLabel = {
  key: TastingKey;
  label: string;
  description: string;
};

const TASTING_FIELDS: TastingLabel[] = [
  { 
    key: 'acidity',
    label: '酸味',
    description: 'レモンやリンゴのような爽やかな酸味の強さ'
  },
  { 
    key: 'sweetness',
    label: '甘味',
    description: 'カラメルやフルーツのような甘みの強さ'
  },
  { 
    key: 'richness',
    label: '濃厚さ',
    description: 'コーヒーの濃さや深みの強さ'
  },
  { 
    key: 'body',
    label: 'ボディ',
    description: '口に含んだときの重さや厚み'
  },
  { 
    key: 'balance',
    label: 'バランス',
    description: '味わい全体の調和の取れ具合'
  },
  { 
    key: 'cleanliness',
    label: 'クリーン度',
    description: '雑味のない透明感のある味わい'
  },
  { 
    key: 'aftertaste',
    label: '余韻',
    description: '飲んだ後に残る味わいの長さと質'
  },
];

// レーダーチャートのポイント計算
function calculateChartPoints(tasting: Required<TastingRecord['tasting']>, size: number = 100) {
  const center = size / 2;
  const radius = size / 2;
  const angleStep = (2 * Math.PI) / 7;
  
  return TASTING_FIELDS.map((item, i) => {
    const value = tasting[item.key] / 5;
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
      label: item.label,
      value: tasting[item.key],
    };
  });
}

// デフォルトの評価値
const defaultTasting: Required<TastingRecord['tasting']> = {
  acidity: 0,
  sweetness: 0,
  richness: 0,
  body: 0,
  balance: 0,
  cleanliness: 0,
  aftertaste: 0,
  totalScore: 0,
};

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 香りのノートを整形する関数を追加
const formatAromaNotes = (type: 'nose' | 'aroma', record: Partial<TastingRecord>) => {
  const data = record[type];
  if (!data) return '記録なし';

  const positiveNotes = Object.entries(data.positive || {})
    .filter(([key, value]) => value && key !== 'other')
    .map(([key]) => {
      switch (key) {
        case 'nuts': return 'ナッツ';
        case 'redFruits': return '赤い果実';
        case 'stoneFruits': return '核果';
        case 'herbs': return '草葉';
        case 'tropicalFruits': return 'トロピカルフルーツ';
        case 'citrus': return '柑橘類';
        case 'flowers': return '花';
        case 'spices': return 'スパイス';
        default: return key;
      }
    });

  const negativeNotes = Object.entries(data.negative || {})
    .filter(([key, value]) => value && key !== 'other')
    .map(([key]) => {
      switch (key) {
        case 'tobacco': return 'タバコ';
        case 'burnt': return '焦げ臭';
        case 'herbs': return '草葉';
        case 'woody': return '樹木';
        default: return key;
      }
    });

  const otherPositive = data.positive?.other ? `、その他: ${data.positive.other}` : '';
  const otherNegative = data.negative?.other ? `、その他: ${data.negative.other}` : '';
  const notes = data.notes ? `、${data.notes}` : '';

  const parts = [];
  if (positiveNotes.length > 0) {
    parts.push(positiveNotes.join('、'));
  }
  if (negativeNotes.length > 0) {
    parts.push(`ネガティブ: ${negativeNotes.join('、')}`);
  }
  if (otherPositive) parts.push(otherPositive);
  if (otherNegative) parts.push(otherNegative);
  if (notes) parts.push(notes);

  return parts.length > 0 ? parts.join('、') : '記録なし';
};

// 日付フォーマット関数を修正（YYYY/MM/DD形式、時刻なし、値がなければ'-'）
const formatDateOnly = (timestamp?: string | Date | null) => {
  if (!timestamp) return '-';
  let date: Date;
  if (typeof timestamp === 'string') {
    if (timestamp.length === 10 && timestamp.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // 例: 2024-06-01 の場合
      date = new Date(timestamp + 'T00:00:00');
    } else {
      date = new Date(timestamp);
    }
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return '-';
  }
  if (isNaN(date.getTime())) return '-';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
};

// 並び替えキーの型とオプションを明示
const SORT_OPTIONS = [
  { value: 'personalScore', label: '個人スコア順' },
  { value: 'date', label: '日付順' },
  { value: 'score', label: '評価スコア順' },
];

export default function RecordList() {
  const [records, setRecords] = useState<Partial<TastingRecord>[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<'personalScore' | 'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchName, setSearchName] = useState('');
  const [tastingFilters, setTastingFilters] = useState<{ [key in TastingKey]?: number }>({});
  const [originFilter, setOriginFilter] = useState('');
  const [varietyFilter, setVarietyFilter] = useState('');
  const [recordType, setRecordType] = useState<'handdrip' | 'espresso' | 'shop' | 'roast'>('handdrip');
  const typeTabs = [
    { key: 'handdrip', label: 'ハンドドリップ' },
    { key: 'espresso', label: 'エスプレッソ' },
    { key: 'shop', label: '店舗来店' },
    { key: 'roast', label: '焙煎記録' },
  ];

  // 店舗来店用フィルター・並び替えstate
  const [shopFilters, setShopFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    startDate: null as string | null,
    endDate: null as string | null,
    shopName: '',
  });
  const [shopSortOrder, setShopSortOrder] = useState<'asc' | 'desc'>('desc');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const router = useRouter();

  // Supabaseから記録一覧を取得
  useEffect(() => {
    // DUMMY DATA START
    if (process.env.NEXT_PUBLIC_USE_DUMMY === 'true') {
      if (recordType === 'handdrip') {
        setRecords([
          {
            id: 'dummy1',
            coffee: { name: 'ダミーコーヒー', origin: 'エチオピア', process: 'ウォッシュド', variety: 'ゲイシャ' },
            brewing: { dripper: 'V60' },
            tasting: { acidity: 4, sweetness: 3, richness: 4, body: 3, balance: 5, cleanliness: 4, aftertaste: 4, totalScore: 27 },
            nose: { positive: {}, negative: {}, notes: 'フローラル' },
            aroma: { positive: {}, negative: {}, notes: 'ベリー系' },
            personalScore: 88,
            comments: 'とても良い香り',
            timestamp: new Date(),
          }
        ]);
        setLoading(false);
        return;
      }
      if (recordType === 'espresso') {
        setRecords([
          {
            id: 'dummy2',
            coffee: { name: 'ダミーエスプレッソ', origin: 'ブラジル', process: 'ナチュラル', variety: 'ブルボン', roastLevel: '深煎り' },
            tasting: { acidity: 2, sweetness: 4, richness: 5, body: 5, balance: 4, cleanliness: 3, aftertaste: 4, totalScore: 27 },
            nose: { positive: {}, negative: {}, notes: 'ナッツ' },
            aroma: { positive: {}, negative: {}, notes: 'チョコレート' },
            personalScore: 90,
            comments: '濃厚で甘い',
            timestamp: new Date(),
          }
        ]);
        setLoading(false);
        return;
      }
      if (recordType === 'roast') {
        setRecords([
          {
            id: 'dummy3',
            coffee: { name: 'ダミー豆', origin: 'コロンビア', process: 'ウォッシュド', variety: 'カトゥーラ' },
            tasting: { acidity: 3, sweetness: 4, richness: 3, body: 4, balance: 4, cleanliness: 3, aftertaste: 3, totalScore: 24 },
            personalScore: 85,
            comments: 'バランス良し',
            brewing: { dripper: '焙煎機' },
            timestamp: new Date(),
          }
        ]);
        setLoading(false);
        return;
      }
      if (recordType === 'shop') {
        setRecords([
          {
            id: 'dummy4',
            coffee: { name: '店舗で飲んだコーヒー' },
            comments: '雰囲気が良いお店でした！',
            timestamp: new Date(),
          }
        ]);
        setLoading(false);
        return;
      }
    }
    // DUMMY DATA END

    // ここから下は本来のSupabase取得処理
    const fetchRecords = async () => {
      setLoading(true);
      let data = null;
      let error = null;
      if (recordType === 'espresso') {
        // エスプレッソ記録を取得
        const res = await supabase
          .from('espresso_records')
          .select('*')
          .order('created_at', { ascending: false });
        data = res.data;
        error = res.error;
      } else if (recordType === 'handdrip') {
        // ハンドドリップ記録を取得
        const res = await supabase
          .from('handdrip_records')
          .select('*')
          .order('created_at', { ascending: false });
        data = res.data;
        error = res.error;
      } else if (recordType === 'roast') {
        // 焙煎記録を取得
        const res = await supabase
          .from('roast_records')
          .select('*')
          .order('roast_date', { ascending: false });
        data = res.data;
        error = res.error;
      } else {
        // その他（shop）は現状何もしない
        setLoading(false);
        return;
      }
      if (error) {
        console.error('記録一覧の取得に失敗:', error);
        setLoading(false);
        return;
      }
      if (data) {
        setRecords(data);
      }
      setLoading(false);
    };
    fetchRecords();
  }, [recordType]);

  // フィルター処理
  const filteredRecords = records.filter((record) => {
    if (recordType === 'roast') {
      // Partial<TastingRecord>型で処理
      // 豆名検索
      if (searchName && !(record.coffee?.name || '').toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }
      // 産地フィルタ
      if (originFilter && !(record.coffee?.origin || '').toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }
      // 品種フィルタ
      if (varietyFilter && !(record.coffee?.variety || '').toLowerCase().includes(varietyFilter.toLowerCase())) {
        return false;
      }
      return true;
    } else {
      // handdrip/espresso/shopも同様
      const tastingRecord = record;
      if (searchName && !(tastingRecord.coffee?.name || '').toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }
      if (originFilter && !(tastingRecord.coffee?.origin || '').toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }
      if (varietyFilter && !(tastingRecord.coffee?.variety || '').toLowerCase().includes(varietyFilter.toLowerCase())) {
        return false;
      }
      for (const key in tastingFilters) {
        const filterValue = tastingFilters[key as TastingKey];
        if (filterValue && tastingRecord.tasting?.[key as TastingKey] !== filterValue) {
          return false;
        }
      }
      return true;
    }
  });

  // 並び替え処理
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (recordType === 'roast') {
      if (sortKey === 'personalScore') {
        const scoreA = a.personalScore || 0;
        const scoreB = b.personalScore || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      } else if (sortKey === 'date') {
        const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortKey === 'score') {
        const scoreA = a.tasting?.totalScore || 0;
        const scoreB = b.tasting?.totalScore || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }
    } else {
      if (sortKey === 'personalScore') {
        const scoreA = a.personalScore || 0;
        const scoreB = b.personalScore || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      } else if (sortKey === 'date') {
        const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortKey === 'score') {
        const scoreA = a.tasting?.totalScore || 0;
        const scoreB = b.tasting?.totalScore || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }
    }
    return 0;
  });

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as 'personalScore' | 'date' | 'score');
  };
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm('本当にこの記録を削除しますか？')) {
      // Supabaseからも削除
      const { error } = await supabase
        .from('tasting_records')
        .delete()
        .eq('id', String(id));
      if (error) {
        alert('削除に失敗しました: ' + (error.message || error.details || ''));
        console.error('削除エラー:', error);
        return;
      }
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // 店舗来店記録の新規作成用onSubmit
  const handleShopVisitCreate = async (data: ShopVisitRecord) => {
    setCreating(true);
    setCreateError(null);
    const row = toSupabaseRow(data);
    const { error } = await supabase.from('shop_visit_records').insert([row]);
    setCreating(false);
    if (error) {
      setCreateError('保存に失敗しました: ' + error.message);
      return;
    }
    setRecordType('shop');
    router.push('/records?tab=shop');
  };

  return (
    <>
      <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 mb-6 w-full">
        <div className="flex flex-row w-full justify-center items-center max-w-6xl mx-auto px-4">
          {typeTabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              className={`flex-1 px-4 py-3 text-base font-semibold border-b-2 transition-colors whitespace-nowrap ${recordType === tab.key ? 'border-gray-900 text-gray-900 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:text-gray-900'}`}
              onClick={() => setRecordType(tab.key as typeof recordType)}
              style={{ minWidth: '120px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-8">
        {/* サイドバー（フィルター） */}
        {recordType === 'shop' ? (
          <aside className="w-full md:w-64 mb-6 md:mb-0">
            <ShopVisitFilter onFilterChange={setShopFilters} />
          </aside>
        ) : (
          <aside className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white border border-gray-300 rounded p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">フィルター</h2>
              <div className="mb-4">
                <label className="block text-xs text-gray-700 mb-1">コーヒー名で検索</label>
                <input
                  type="text"
                  placeholder="コーヒー名"
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-700 mb-1">産地で検索</label>
                <input
                  type="text"
                  placeholder="産地"
                  value={originFilter}
                  onChange={e => setOriginFilter(e.target.value)}
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-700 mb-1">品種で検索</label>
                <input
                  type="text"
                  placeholder="品種"
                  value={varietyFilter}
                  onChange={e => setVarietyFilter(e.target.value)}
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                />
              </div>
              {TASTING_FIELDS.map(field => (
                <div key={field.key} className="mb-3">
                  <label className="block text-xs text-gray-700 mb-1">{field.label}</label>
                  <select
                    value={tastingFilters[field.key] ?? ''}
                    onChange={e => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      setTastingFilters(prev => ({ ...prev, [field.key]: value }));
                    }}
                    className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                  >
                    <option value="">すべて</option>
                    {[1,2,3,4,5].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </aside>
        )}
        {/* メインコンテンツ */}
        <main className="flex-1">
          {recordType === 'shop' && process.env.NEXT_PUBLIC_USE_DUMMY === 'true' ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">記録一覧</h1>
                <div className="flex gap-2 items-center bg-white border border-gray-300 rounded px-3 py-2">
                  <label className="text-sm text-gray-700">並べ替え:</label>
                  <select
                    value={shopSortOrder}
                    onChange={e => setShopSortOrder(e.target.value as 'asc' | 'desc')}
                    className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                  >
                    <option value="desc">降順</option>
                    <option value="asc">昇順</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedRecords.map((record) => (
                  <ShopCard key={record.id} record={record} />
                ))}
              </div>
            </>
          ) : recordType === 'shop' ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">記録一覧</h1>
                <div className="flex gap-2 items-center bg-white border border-gray-300 rounded px-3 py-2">
                  <label className="text-sm text-gray-700">並べ替え:</label>
                  <select
                    value={shopSortOrder}
                    onChange={e => setShopSortOrder(e.target.value as 'asc' | 'desc')}
                    className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                  >
                    <option value="desc">降順</option>
                    <option value="asc">昇順</option>
                  </select>
                </div>
              </div>
              <ShopVisitList filters={shopFilters} sortOrder={shopSortOrder} />
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">記録一覧</h1>
                {recordType !== 'roast' && (
                  <div className="flex gap-2 items-center bg-white border border-gray-300 rounded px-3 py-2">
                    <label className="text-sm text-gray-700">並べ替え:</label>
                    <select
                      value={sortKey}
                      onChange={e => setSortKey(e.target.value as 'personalScore' | 'date' | 'score')}
                      className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <select
                      value={sortOrder}
                      onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                      className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
                    >
                      <option value="asc">昇順</option>
                      <option value="desc">降順</option>
                    </select>
                  </div>
                )}
              </div>
              {loading ? (
                <div className="text-center text-gray-500 py-12">読み込み中...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedRecords.map((record) => {
                    if (recordType === 'espresso') {
                      return <EspressoCard key={record.id} record={record} />;
                    } else if (recordType === 'roast') {
                      return <RoastCard key={record.id} record={record} />;
                    } else if (recordType === 'shop') {
                      return <ShopCard key={record.id} record={record} />;
                    } else {
                      return <HanddripCard key={record.id} record={record as Partial<TastingRecord>} />;
                    }
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

function toSupabaseRow(record: ShopVisitRecord) {
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