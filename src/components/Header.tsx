"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';
import { LogoutButton } from './LogoutButton';

export default function Header() {
    const { isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* 左端：タイトル */}
                <div className="text-lg md:text-2xl font-bold text-black">コーヒーテイスティング</div>
                {/* 右端：メニュー */}
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="メニューを開く"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded shadow-md z-50 w-44 flex flex-col min-w-max">
                            <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                ホーム
                            </Link>
                            <Link href="/new" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                新規記録
                            </Link>
                            <Link href="/records" className="px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                記録一覧
                            </Link>
                            <div className="border-t border-gray-100 my-1" />
                            <LogoutButton className="" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
} 