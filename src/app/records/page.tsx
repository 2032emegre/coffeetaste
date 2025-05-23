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
import { RoastRecord } from '@/types/roast';
import RoastRecordCard from '@/components/RoastRecordCard';

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
  const [records, setRecords] = useState<(Partial<TastingRecord> | RoastRecord)[]>([]);
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
          .from('tasting_records')
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
      const roastRecord = record as RoastRecord;
      // 豆名検索
      if (searchName && !roastRecord.bean_name.toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }
      // 産地フィルタ
      if (originFilter && !roastRecord.origin.toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }
      // 品種フィルタ
      if (varietyFilter && !roastRecord.variety.toLowerCase().includes(varietyFilter.toLowerCase())) {
        return false;
      }
      return true;
    } else {
      const tastingRecord = record as Partial<TastingRecord>;
      // コーヒー名検索
      if (searchName && !(tastingRecord.coffee?.name || '').toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }
      // 産地フィルタ
      if (originFilter && !(tastingRecord.coffee?.origin || '').toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }
      // 品種フィルタ
      if (varietyFilter && !(tastingRecord.coffee?.variety || '').toLowerCase().includes(varietyFilter.toLowerCase())) {
        return false;
      }
      // テイスティング項目フィルタ
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
      const roastA = a as RoastRecord;
      const roastB = b as RoastRecord;
      if (sortKey === 'personalScore') {
        const scoreA = roastA.personal_score || 0;
        const scoreB = roastB.personal_score || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      } else if (sortKey === 'date') {
        const dateA = roastA.roast_date ? new Date(roastA.roast_date).getTime() : 0;
        const dateB = roastB.roast_date ? new Date(roastB.roast_date).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortKey === 'score') {
        const scoreA = roastA.overall_total_score || 0;
        const scoreB = roastB.overall_total_score || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }
    } else {
      const tastingA = a as Partial<TastingRecord>;
      const tastingB = b as Partial<TastingRecord>;
      if (sortKey === 'personalScore') {
        const scoreA = tastingA.personalScore || 0;
        const scoreB = tastingB.personalScore || 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      } else if (sortKey === 'date') {
        const dateA = tastingA.timestamp ? new Date(tastingA.timestamp).getTime() : 0;
        const dateB = tastingB.timestamp ? new Date(tastingB.timestamp).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortKey === 'score') {
        const scoreA = tastingA.tasting?.totalScore || 0;
        const scoreB = tastingB.tasting?.totalScore || 0;
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
          {recordType === 'shop' ? (
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
                      const espresso = record as any;
                      return (
                        <div key={espresso.id} className="relative bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
                          {/* 左上の黒三角＋E */}
                          <div style={{position:'absolute',top:0,left:0,width:'0',height:'0',borderTop:'48px solid #111',borderRight:'48px solid transparent',zIndex:2}}>
                            <span style={{position:'absolute',top:'4px',left:'10px',color:'#fff',fontWeight:'bold',fontSize:'1.1rem',fontFamily:'monospace'}}>E</span>
                          </div>
                          {/* 上部 */}
                          <div className="border-b border-gray-200 px-6 pt-6 pb-3">
                            <div className="text-xs text-gray-500 mb-1">{formatDateOnly(espresso.created_at)}</div>
                            <div className="flex items-end justify-between">
                              <div className="text-2xl font-bold text-gray-900 truncate max-w-[12em]">{espresso.coffee_name}</div>
                            </div>
                          </div>
                          {/* 本体 */}
                          <div className="flex-1 flex flex-col px-6 py-4">
                            {/* コーヒー情報 */}
                            <div className="mb-2 text-xs">
                              <div className="font-bold text-gray-700">産地: <span className="font-normal text-gray-900">{espresso.coffee_origin}</span></div>
                              <div className="font-bold text-gray-700">品種: <span className="font-normal text-gray-900">{espresso.coffee_variety}</span></div>
                              <div className="font-bold text-gray-700">精製方法: <span className="font-normal text-gray-900">{espresso.coffee_process}</span></div>
                              <div className="font-bold text-gray-700">焙煎度: <span className="font-normal text-gray-900">{espresso.coffee_roast_level}</span></div>
                            </div>
                            {/* LE NEZ/LES AROMA */}
                            <div className="space-y-1 text-xs mb-2">
                              <div><span className="font-medium text-gray-900">LE NEZ</span> <span className="ml-2 text-gray-700">{espresso.nose_notes || '記録なし'}</span></div>
                              <div><span className="font-medium text-gray-900">LES AROMA</span> <span className="ml-2 text-gray-700">{espresso.aroma_notes || '記録なし'}</span></div>
                            </div>
                            {/* クレマ（レーダーチャート） */}
                            <div className="mb-2">
                              <div className="font-bold text-gray-700 text-xs mb-1">クレマ</div>
                              <div className="flex justify-center items-center">
                                <RadarChart
                                  tasting={{
                                    acidity: espresso.crema_color || 0,
                                    sweetness: espresso.crema_thickness || 0,
                                    richness: espresso.crema_persistence || 0,
                                    body: 0,
                                    balance: 0,
                                    cleanliness: 0,
                                    aftertaste: 0,
                                  }}
                                  mode="crema"
                                />
                              </div>
                            </div>
                            {/* 味わい（レーダーチャート） */}
                            <div className="mb-2">
                              <div className="font-bold text-gray-700 text-xs mb-1">味わい</div>
                              <div className="flex justify-center items-center">
                                <RadarChart tasting={{
                                  acidity: espresso.tasting_acidity || 0,
                                  sweetness: espresso.tasting_sweetness || 0,
                                  richness: espresso.tasting_richness || 0,
                                  body: espresso.tasting_body || 0,
                                  balance: espresso.tasting_balance || 0,
                                  cleanliness: espresso.tasting_cleanliness || 0,
                                  aftertaste: espresso.tasting_aftertaste || 0
                                }} />
                              </div>
                            </div>
                            {/* コメント */}
                            <div className="border-t border-gray-100 pt-2 mt-2 text-xs text-gray-700">
                              <div className="font-medium text-gray-900 mb-1">コメント</div>
                              {espresso.comments ? (
                                <div className="whitespace-pre-wrap">{espresso.comments}</div>
                              ) : (
                                <div className="text-gray-500">記録なし</div>
                              )}
                            </div>
                            {/* 操作ボタン */}
                            <div className="mt-3 flex justify-end gap-2">
                              <Link
                                href={`/records/espresso/${espresso.id}`}
                                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                              >
                                詳細を見る →
                              </Link>
                              <Link
                                href={`/records/espresso/${espresso.id}/edit`}
                                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                              >
                                編集
                              </Link>
                              <button
                                type="button"
                                className="text-xs sm:text-sm text-gray-600 hover:text-white transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-900"
                                onClick={() => handleDelete(espresso.id)}
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (recordType === 'roast') {
                      return (
                        <RoastRecordCard
                          key={record.id}
                          record={record as RoastRecord}
                          onDelete={handleDelete}
                        />
                      );
                    } else {
                      const tastingRecord = record as Partial<TastingRecord>;
                      return (
                        <div key={record.id} className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
                          {/* タイトル・スコア・日付（上部） */}
                          <div className="border-b border-gray-200 px-6 pt-6 pb-3">
                            <div className="text-xs text-gray-500 mb-1">
                              {tastingRecord.timestamp?.toLocaleDateString('ja-JP')}
                            </div>
                            <div className="flex items-end justify-between">
                              <div className="text-2xl font-bold text-gray-900 truncate max-w-[12em]">
                                {tastingRecord.coffee?.name}
                              </div>
                              <div className="flex flex-col items-end min-w-0 ml-2">
                                <div className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                                  {tastingRecord.personalScore}
                                  <span className="text-xs font-normal text-gray-600">/100</span>
                                </div>
                                <div className="text-xs text-gray-600 whitespace-nowrap">
                                  評価スコア: {tastingRecord.tasting?.totalScore}/35
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 本体（縦並び） */}
                          <div className="flex-1 flex flex-col px-6 py-4">
                            {/* 産地情報 */}
                            <div className="mb-2">
                              <div className="font-bold text-gray-700">
                                産地: <span className="font-normal text-gray-900">{tastingRecord.coffee?.origin}</span>
                              </div>
                              <div className="font-bold text-gray-700">
                                精製方式: <span className="font-normal text-gray-900">{tastingRecord.coffee?.process}</span>
                              </div>
                              <div className="font-bold text-gray-700">
                                品種: <span className="font-normal text-gray-900">{tastingRecord.coffee?.variety}</span>
                              </div>
                            </div>
                            {/* 抽出レシピ */}
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs leading-relaxed mb-2">
                              <div className="font-bold text-gray-700 mb-2">抽出レシピ</div>
                              <div className="mb-1 font-bold">
                                ドリッパー: <span className="font-normal text-gray-900">{tastingRecord.brewing?.dripper}</span>
                              </div>
                              <div className="mb-1 font-bold">
                                グラインダー: <span className="font-normal text-gray-900">{tastingRecord.brewing?.grinder}</span>
                              </div>
                              <div className="mb-1 font-bold">
                                挽き目: <span className="font-normal text-gray-900">{tastingRecord.brewing?.grindSize}</span>
                              </div>
                              <div className="mb-1 font-bold">
                                豆量: <span className="font-normal text-gray-900">{tastingRecord.brewing?.coffeeAmount} g</span>
                              </div>
                              <div className="mb-1 font-bold">
                                湯量: <span className="font-normal text-gray-900">{tastingRecord.brewing?.waterAmount} ml</span>
                              </div>
                              <div className="mb-1 font-bold">
                                抽出時間: <span className="font-normal text-gray-900">{tastingRecord.brewing?.brewTime}</span>
                              </div>
                              <div className="mb-1 font-bold">
                                温度: <span className="font-normal text-gray-900">{tastingRecord.brewing?.temperature}</span>
                              </div>
                              <div className="font-bold">
                                蒸らし: <span className="font-normal text-gray-900">
                                  {tastingRecord.brewing?.bloomAmount} / {tastingRecord.brewing?.bloomTime}
                                </span>
                              </div>
                            </div>
                            {/* レーダーチャート */}
                            <div className="flex justify-center items-center my-4">
                              <RadarChart tasting={tastingRecord.tasting ?? defaultTasting} />
                            </div>
                            {/* 香りのノート */}
                            <div className="space-y-2 text-xs mb-2">
                              <div>
                                <span className="font-medium text-gray-900">LE NEZ</span>
                                <span className="ml-2 text-gray-700">{formatAromaNotes('nose', tastingRecord)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">LES ARÔMES</span>
                                <span className="ml-2 text-gray-700">{formatAromaNotes('aroma', tastingRecord)}</span>
                              </div>
                            </div>
                            {/* コメント */}
                            <div className="border-t border-gray-100 pt-2 mt-2 text-xs text-gray-700">
                              <div className="font-medium text-gray-900 mb-1">総合評価</div>
                              {tastingRecord.comments ? (
                                <div className="whitespace-pre-wrap">{tastingRecord.comments}</div>
                              ) : (
                                <div className="text-gray-500">記録なし</div>
                              )}
                            </div>
                            {/* 操作ボタン */}
                            <div className="mt-auto pt-4 flex justify-end space-x-2">
                              <button
                                onClick={() => router.push(`/records/${record.id}`)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                              >
                                詳細を見る
                              </button>
                              <button
                                onClick={() => router.push(`/records/${record.id}/edit`)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                              >
                                編集
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('この記録を削除してもよろしいですか？')) {
                                    handleDelete(record.id);
                                  }
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50"
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      );
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