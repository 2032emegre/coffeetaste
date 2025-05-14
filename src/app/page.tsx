import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          コーヒーテイスティング記録
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          あなたのコーヒー体験を記録し、共有しましょう
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <Link
            href="/new"
            className="block w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 transition-colors"
          >
            新しい記録を作成
          </Link>
          <Link
            href="/records"
            className="block w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-100 transition-colors"
          >
            記録一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
} 