'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TastingRecord } from '@/types/tasting';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import Chart from 'chart.js/auto';
import RadarChart from '@/components/RadarChart';
import { createClient } from '@supabase/supabase-js';

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

  // Supabaseから記録一覧を取得
  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('tasting_records')
        .select('*')
        .order('created_at', { ascending: false });
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
  }, []);

  // フィルター処理
  const filteredRecords = records.filter((record) => {
    // コーヒー名検索
    if (searchName && !(record.coffee?.name || '').toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    // 産地フィルタ（部分一致・大文字小文字無視）
    if (originFilter && !(record.coffee?.origin || '').toLowerCase().includes(originFilter.toLowerCase())) {
      return false;
    }
    // 品種フィルタ（部分一致・大文字小文字無視）
    if (varietyFilter && !(record.coffee?.variety || '').toLowerCase().includes(varietyFilter.toLowerCase())) {
      return false;
    }
    // テイスティング項目フィルタ
    for (const key in tastingFilters) {
      const filterValue = tastingFilters[key as TastingKey];
      if (filterValue && record.tasting?.[key as TastingKey] !== filterValue) {
        return false;
      }
    }
    // タイプで絞り込み
    if ((record as any).type && (record as any).type !== recordType) return false;
    return true;
  });

  // 並び替え処理
  const sortedRecords = [...filteredRecords].sort((a, b) => {
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
        {/* メインコンテンツ */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">記録一覧</h1>
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
          </div>
          {loading ? (
            <div className="text-center text-gray-500 py-12">読み込み中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedRecords.map((record) => (
                <div key={record.id} className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
                  {/* タイトル・スコア・日付（上部） */}
                  <div className="border-b border-gray-200 px-6 pt-6 pb-3">
                    <div className="text-xs text-gray-500 mb-1">{formatDateOnly(record.created_at)}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold text-gray-900 truncate max-w-[12em]">{record.coffee?.name}</div>
                      <div className="flex flex-col items-end min-w-0 ml-2">
                        <div className="text-2xl font-bold text-gray-900 whitespace-nowrap">{record.personalScore}<span className="text-xs font-normal text-gray-600">/100</span></div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">評価スコア: {record.tasting?.totalScore}/35</div>
                      </div>
                    </div>
                  </div>
                  {/* 本体（縦並び） */}
                  <div className="flex-1 flex flex-col px-6 py-4">
                    {/* 産地情報 */}
                    <div className="mb-2">
                      <div className="font-bold text-gray-700">産地: <span className="font-normal text-gray-900">{record.coffee?.origin}</span></div>
                      <div className="font-bold text-gray-700">精製方式: <span className="font-normal text-gray-900">{record.coffee?.process}</span></div>
                      <div className="font-bold text-gray-700">品種: <span className="font-normal text-gray-900">{record.coffee?.variety}</span></div>
                    </div>
                    {/* 抽出レシピ */}
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs leading-relaxed mb-2">
                      <div className="font-bold text-gray-700 mb-2">抽出レシピ</div>
                      <div className="mb-1 font-bold">ドリッパー: <span className="font-normal text-gray-900">{record.brewing?.dripper}</span></div>
                      <div className="mb-1 font-bold">グラインダー: <span className="font-normal text-gray-900">{record.brewing?.grinder}</span></div>
                      <div className="mb-1 font-bold">挽き目: <span className="font-normal text-gray-900">{record.brewing?.grindSize}</span></div>
                      <div className="mb-1 font-bold">豆量: <span className="font-normal text-gray-900">{record.brewing?.coffeeAmount} g</span></div>
                      <div className="mb-1 font-bold">湯量: <span className="font-normal text-gray-900">{record.brewing?.waterAmount} ml</span></div>
                      <div className="mb-1 font-bold">抽出時間: <span className="font-normal text-gray-900">{record.brewing?.brewTime}</span></div>
                      <div className="mb-1 font-bold">温度: <span className="font-normal text-gray-900">{record.brewing?.temperature}</span></div>
                      <div className="font-bold">蒸らし: <span className="font-normal text-gray-900">{record.brewing?.bloomAmount} / {record.brewing?.bloomTime}</span></div>
                    </div>
                    {/* レーダーチャート */}
                    <div className="flex justify-center items-center my-4">
                      <RadarChart tasting={record.tasting ?? defaultTasting} />
                    </div>
                    {/* 香りのノート */}
                    <div className="space-y-2 text-xs mb-2">
                      <div>
                        <span className="font-medium text-gray-900">LE NEZ</span>
                        <span className="ml-2 text-gray-700">{formatAromaNotes('nose', record)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">LES ARÔMES</span>
                        <span className="ml-2 text-gray-700">{formatAromaNotes('aroma', record)}</span>
                      </div>
                    </div>
                    {/* コメント */}
                    <div className="border-t border-gray-100 pt-2 mt-2 text-xs text-gray-700">
                      <div className="font-medium text-gray-900 mb-1">総合評価</div>
                      {record.comments ? (
                        <div className="whitespace-pre-wrap">{record.comments}</div>
                      ) : (
                        <div className="text-gray-500">記録なし</div>
                      )}
                    </div>
                    {/* 操作ボタン */}
                    <div className="mt-3 flex justify-end gap-2">
                      <Link
                        href={`/records/${record.id}`}
                        className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                      >
                        詳細を見る →
                      </Link>
                      <Link
                        href={`/records/${record.id}/edit`}
                        className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-100"
                      >
                        編集
                      </Link>
                      <button
                        type="button"
                        className="text-xs sm:text-sm text-gray-600 hover:text-white transition-colors border border-gray-400 rounded px-2 py-1 bg-white hover:bg-gray-900"
                        onClick={() => handleDelete(record.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
} 