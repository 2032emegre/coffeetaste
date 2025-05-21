import { useState } from 'react';

type ShopVisitFilterProps = {
  onFilterChange: (filters: {
    minPrice: number | null;
    maxPrice: number | null;
    startDate: string | null;
    endDate: string | null;
    shopName: string;
  }) => void;
};

export default function ShopVisitFilter({ onFilterChange }: ShopVisitFilterProps) {
  const [filters, setFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    startDate: null as string | null,
    endDate: null as string | null,
    shopName: '',
  });

  const handleChange = (key: keyof typeof filters, value: string | number | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-medium text-gray-900">フィルター</h3>
      
      {/* 店舗名検索 */}
      <div>
        <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">
          店舗名
        </label>
        <input
          type="text"
          id="shopName"
          value={filters.shopName}
          onChange={(e) => handleChange('shopName', e.target.value)}
          placeholder="店舗名で検索"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        />
      </div>

      {/* 価格範囲 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            最小価格
          </label>
          <input
            type="number"
            id="minPrice"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : null)}
            placeholder="最小価格"
            min="0"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            最大価格
          </label>
          <input
            type="number"
            id="maxPrice"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : null)}
            placeholder="最大価格"
            min="0"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* 日付範囲 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            開始日
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value || null)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            終了日
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value || null)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </div>
    </div>
  );
} 