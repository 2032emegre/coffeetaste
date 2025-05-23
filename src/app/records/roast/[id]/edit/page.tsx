import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoastRecord } from '@/types/roast';
import RoastingRecordForm from '@/components/RoastingRecordForm';

export default function EditRoastRecord() {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<RoastRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`/api/roast_records/${id}`);
        if (!res.ok) {
          throw new Error('記録の取得に失敗しました');
        }
        const data = await res.json();
        setRecord(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleSubmit = async (formData: Partial<RoastRecord>) => {
    try {
      const res = await fetch(`/api/roast_records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('記録の更新に失敗しました');
      }

      router.push(`/records/roast/${id}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!record) return <div className="p-8 text-center">記録が見つかりません</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">焙煎記録編集</h1>
        <button
          onClick={() => router.push(`/records/roast/${id}`)}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>

      <RoastingRecordForm
        initialData={record}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
} 