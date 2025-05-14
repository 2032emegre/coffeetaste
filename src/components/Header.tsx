"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-lg md:text-2xl font-bold text-black">
                        コーヒーテイスティング
                    </Link>
                    {/* PC用ナビゲーション */}
                    <div className="hidden md:flex space-x-4">
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
                    {/* モバイル用ハンバーガーメニュー */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            aria-label="メニューを開く"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-4 top-16 bg-white border border-gray-200 rounded shadow-md z-50 w-40 flex flex-col">
                                <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                    ホーム
                                </Link>
                                <Link href="/new" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                    新規記録
                                </Link>
                                <Link href="/records" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                    記録一覧
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
} 