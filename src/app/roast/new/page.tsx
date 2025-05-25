'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoastRecord } from '@/types/roast';
import RoastingRecordForm from '@/components/RoastingRecordForm';

export default function NewRoastRecord() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: Partial<RoastRecord>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/roast_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '記録の保存に失敗しました');
      }

      const data = await response.json();
      router.push('/records/roast');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">新規焙煎記録</h1>
        <button
          onClick={() => router.push('/records/roast')}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
      </div>

      <RoastingRecordForm
        onSubmit={handleSubmit}
        loading={isSubmitting}
        error={error}
      />
    </div>
  );
} 