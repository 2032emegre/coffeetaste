'use client';

import { useAuth } from '../app/context/AuthContext';

export function LogoutButton({ className = '' }: { className?: string }) {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className={`w-full text-left px-4 py-2 text-red-600 hover:text-red-800 transition-colors ${className}`}
    >
      ログアウト
    </button>
  );
} 