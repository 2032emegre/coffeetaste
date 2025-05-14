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

export default function RecordList() {
  const initialRecords: Partial<TastingRecord>[] = [
    {
      id: '1',
      timestamp: new Date('2024-03-10'),
      environment: {
        date: '2024-03-10',
        weather: '晴れ',
        temperature: '22℃',
        humidity: '45%',
        timeOfDay: '朝',
        isAutoFetched: false,
      },
      coffee: {
        name: 'エチオピア イルガチェフェ',
        origin: 'エチオピア',
        process: 'ウォッシュド',
        variety: 'ゲイシャ',
        roastLevel: 'ライトロースト',
        roastedAt: new Date('2024-03-05'),
      },
      brewing: {
        dripper: 'SilkDripper',
        grinder: 'Timemore C3',
        grindSize: '20（中細挽き）',
        coffeeAmount: '15g',
        waterAmount: '225g',
        temperature: '92℃',
        brewTime: '2:30',
        bloomTime: '30秒',
        bloomAmount: '45g',
      },
      tasting: {
        acidity: 4,
        sweetness: 5,
        richness: 3,
        body: 3,
        balance: 4,
        cleanliness: 5,
        aftertaste: 4,
        totalScore: 28,
      },
      nose: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: 'ジャスミン、レモン、ベルガモット',
      },
      aroma: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: 'オレンジ、ハニー、フローラル',
      },
      personalScore: 85,
      comments: 'フローラルな香りと柑橘系の爽やかな酸味が特徴的。後味にジャスミンのような華やかさが残る。',
    },
    {
      id: '2',
      timestamp: new Date('2024-03-09'),
      environment: {
        date: '2024-03-09',
        weather: '',
        temperature: '',
        humidity: '',
        timeOfDay: '',
        isAutoFetched: false,
      },
      coffee: {
        name: 'グアテマラ アンティグア',
        origin: 'グアテマラ',
        process: 'ナチュラル',
        variety: 'ブルボン',
      },
      tasting: {
        acidity: 3,
        sweetness: 4,
        richness: 5,
        body: 4,
        balance: 4,
        cleanliness: 4,
        aftertaste: 4,
        totalScore: 28,
      },
      nose: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: '',
      },
      aroma: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: '',
      },
      personalScore: 82,
      comments: 'チョコレートのような甘みとナッティな風味。しっかりとしたボディと長く続く余韻が印象的。',
    },
    {
      id: '3',
      timestamp: new Date('2024-03-08'),
      environment: {
        date: '2024-03-08',
        weather: '',
        temperature: '',
        humidity: '',
        timeOfDay: '',
        isAutoFetched: false,
      },
      coffee: {
        name: 'コロンビア ウイラ',
        origin: 'コロンビア',
        process: 'ハニー',
        variety: 'カトゥーラ',
      },
      tasting: {
        acidity: 3,
        sweetness: 4,
        richness: 4,
        body: 3,
        balance: 4,
        cleanliness: 4,
        aftertaste: 3,
        totalScore: 25,
      },
      nose: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: '',
      },
      aroma: {
        positive: {
          nuts: false,
          redFruits: false,
          stoneFruits: false,
          herbs: false,
          tropicalFruits: false,
          citrus: false,
          flowers: false,
          spices: false,
          other: '',
        },
        negative: {
          tobacco: false,
          burnt: false,
          herbs: false,
          woody: false,
          other: '',
        },
        notes: '',
      },
      personalScore: 78,
      comments: 'バランスの取れた味わいで、キャラメルのような甘みとマイルドな酸味が特徴。',
    },
  ];

  const [records, setRecords] = useState<Partial<TastingRecord>[]>(initialRecords);
  const [sortKey, setSortKey] = useState<'name' | 'score'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchName, setSearchName] = useState('');
  const [tastingFilters, setTastingFilters] = useState<{ [key in TastingKey]?: number }>({});

  // Supabaseから記録一覧を取得
  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('tasting_records')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('記録一覧の取得に失敗:', error);
        return;
      }
      if (data) {
        setRecords(data);
      }
    };
    fetchRecords();
  }, []);

  // 並べ替えロジック
  const filteredRecords = records.filter((record) => {
    // コーヒー名検索
    if (searchName && !(record.coffee?.name || '').includes(searchName)) {
      return false;
    }
    // テイスティング項目フィルタ
    for (const key in tastingFilters) {
      const filterValue = tastingFilters[key as TastingKey];
      if (filterValue && record.tasting?.[key as TastingKey] !== filterValue) {
        return false;
      }
    }
    return true;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortKey === 'name') {
      const nameA = a.coffee?.name || '';
      const nameB = b.coffee?.name || '';
      if (sortOrder === 'asc') return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    } else {
      const scoreA = a.tasting?.totalScore || 0;
      const scoreB = b.tasting?.totalScore || 0;
      if (sortOrder === 'asc') return scoreA - scoreB;
      return scoreB - scoreA;
    }
  });

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as 'name' | 'score');
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
              onChange={handleSortKeyChange}
              className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
            >
              <option value="name">コーヒー名</option>
              <option value="score">スコア</option>
            </select>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-gray-400 rounded px-2 py-1 bg-white text-gray-900"
            >
              <option value="asc">昇順</option>
              <option value="desc">降順</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedRecords.map((record) => (
            <div key={record.id} className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col h-full">
              {/* タイトル・スコア・日付（上部） */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 pt-6 pb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900">{record.coffee?.name}</div>
                  <div className="text-xs text-gray-500">{record.timestamp?.toLocaleDateString('ja-JP')} 記録</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{record.personalScore}<span className="text-xs font-normal text-gray-600">/100</span></div>
                  <div className="text-xs text-gray-600">評価スコア: {record.tasting?.totalScore}/35</div>
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
                  <div className="mb-1 font-bold">豆量: <span className="font-normal text-gray-900">{record.brewing?.coffeeAmount}</span></div>
                  <div className="mb-1 font-bold">湯量: <span className="font-normal text-gray-900">{record.brewing?.waterAmount}</span></div>
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
                    <span className="ml-2 text-gray-700">{record.nose?.notes || '記録なし'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">LES ARÔMES</span>
                    <span className="ml-2 text-gray-700">{record.aroma?.notes || '記録なし'}</span>
                  </div>
                </div>
                {/* コメント */}
                <div className="border-t border-gray-100 pt-2 mt-2 text-xs text-gray-700">{record.comments}</div>
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
      </main>
    </div>
  );
} 