import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-black">
                        コーヒーテイスティング
                    </Link>
                    <div className="space-x-4">
                        <Link href="/" className="text-gray-700 hover:text-black">
                            ホーム
                        </Link>
                        <Link href="/new" className="text-gray-700 hover:text-black">
                            新規記録
                        </Link>
                        <Link href="/records" className="text-gray-700 hover:text-black">
                            記録一覧
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
} 