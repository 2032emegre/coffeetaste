import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RadarChart from '../RadarChart';
import { ShopVisitRecord } from '@/types/tasting';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  record: ShopVisitRecord;
  onDelete?: () => void;
};

const displayValue = (v: any, unit: string = '') => (v === undefined || v === null || v === '' ? '-' : `${v}${unit}`);

const ShopCard: React.FC<Props> = ({ record, onDelete }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // レーダーチャート用データ
  const shopTasting = {
    acidity: record.tasting?.acidity ?? 0,
    sweetness: record.tasting?.sweetness ?? 0,
    richness: record.tasting?.richness ?? 0,
    body: record.tasting?.body ?? 0,
    balance: record.tasting?.balance ?? 0,
    cleanliness: record.tasting?.cleanliness ?? 0,
    aftertaste: record.tasting?.aftertaste ?? 0,
  };

  const handleDetail = () => {
    router.push(`/records/shop/${record.id}`);
  };

  const handleEdit = () => {
    router.push(`/records/shop/${record.id}/edit`);
  };

  const handleDelete = async () => {
    if (!record.id) return;
    if (window.confirm('この記録を削除してもよろしいですか？')) {
      setIsDeleting(true);
      try {
        const { error } = await supabase
          .from('shop_visit_records')
          .delete()
          .eq('id', record.id);
        if (error) throw error;
        onDelete?.();
        router.push('/records?tab=shop');
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('記録の削除に失敗しました。');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full p-4 w-full max-w-md mx-auto">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            S
          </div>
          <div className="text-sm text-gray-500">
            {record.created_at ? new Date(record.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-'}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {displayValue(record.environment?.temperature, '℃')} / {displayValue(record.environment?.humidity)}
        </div>
      </div>

      {/* メイン情報 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{displayValue(record.shop?.name)}</h3>
          <div className="flex flex-col items-end">
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
              合計スコア: {displayValue(record.tasting?.totalScore)}
            </span>
          </div>
        </div>
        {/* 飲み物リスト */}
        <div className="mb-4">
          <h4 className="font-bold mb-2">飲み物リスト</h4>
          {record.items?.length > 0 ? (
            <ul className="text-sm space-y-1">
              {record.items?.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name || '-'}</span>
                  <span>{item.price ? `¥${item.price}` : '-'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
        {/* レーダーチャート */}
        <div className="h-64 mb-4">
          <RadarChart tasting={shopTasting} mode="shop" />
        </div>
        {/* その他の情報 */}
        <div className="mb-2">
          <div className="font-semibold text-gray-700 mb-1">その他の情報</div>
          <div className="text-base text-gray-900 font-bold">{displayValue(record.comments)}</div>
        </div>
        {/* アクションボタン */}
        <div className="flex justify-end space-x-2 mt-auto pt-4 border-t">
          <button
            onClick={handleDetail}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            disabled={isDeleting || !record.id}
          >
            詳細
          </button>
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            disabled={isDeleting || !record.id}
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-red-600 disabled:opacity-50"
            disabled={isDeleting || !record.id}
          >
            {isDeleting ? '削除中...' : '削除'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard; 