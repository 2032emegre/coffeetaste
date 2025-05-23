'use client';

import { useState, useEffect } from 'react';
import { EspressoRecord } from '@/types/tasting';
import EspressoRecordCard from '@/components/EspressoRecordCard';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import CoffeeInfo from '@/components/CoffeeInfo';
import RadarChart from '@/components/RadarChart';
import { supabase } from '@/lib/supabase';

// エスプレッソ専用ダミーデータ
const espressoDummyRecords: EspressoRecord[] = [
  {
    id: '1',
    environment: { date: '2025-05-21', time: '10:00', weather: '晴れ', temperature: 22, humidity: '50%', isAutoFetched: false },
    coffee: { name: 'CarlosAndres', origin: 'コロンビア', process: 'FullyWashed', variety: 'castillo', roastLevel: '中煎り', roastedAt: new Date(), roastDate: '2025-05-15', otherInfo: '' },
    brewing: { type: 'espresso', grinder: 'Timemore', grindSetting: '2.5', coffeeAmount: '18', yield: '36', brewTime: '0:30', temperature: '93', pressure: '9', notes: '良い抽出', dripper: '' },
    crema: { color: 4, thickness: 4, persistence: 4, notes: 'きれいなクレマ' },
    tasting: { acidity: 4, sweetness: 4, richness: 4, body: 4, balance: 4, cleanliness: 4, aftertaste: 4, totalScore: 31 },
    nose: { positive: {}, negative: {}, notes: '' },
    aroma: { positive: {}, negative: {}, notes: '' },
    personalScore: 88,
    comments: 'バランス良し',
    notes: '',
    created_at: '2025-05-21T10:00:00Z',
  },
  {
    id: '2',
    environment: { date: '2025-05-20', time: '11:00', weather: '曇り', temperature: 20, humidity: '60%', isAutoFetched: false },
    coffee: { name: 'グアテマラ', origin: 'グアテマラ', process: 'ウォッシュド', variety: 'ブルボン', roastLevel: '中深煎り', roastedAt: new Date(), roastDate: '2025-05-10', otherInfo: '' },
    brewing: { type: 'espresso', grinder: 'Timemore', grindSetting: '3.0', coffeeAmount: '18', yield: '36', brewTime: '0:28', temperature: '92', pressure: '9', notes: '', dripper: '' },
    crema: { color: 3, thickness: 3, persistence: 3, notes: '' },
    tasting: { acidity: 3, sweetness: 4, richness: 4, body: 4, balance: 4, cleanliness: 4, aftertaste: 4, totalScore: 30 },
    nose: { positive: {}, negative: {}, notes: '' },
    aroma: { positive: {}, negative: {}, notes: '' },
    personalScore: 80,
    comments: '甘みが良い',
    notes: '',
    created_at: '2025-05-20T11:00:00Z',
  },
];

function EspressoDetailModal({ record, onClose }: { record: EspressoRecord; onClose: () => void }) {
  const cremaTasting = {
    acidity: record.crema.color,
    sweetness: record.crema.thickness,
    richness: record.crema.persistence,
    body: 0,
    balance: 0,
    cleanliness: 0,
    aftertaste: 0,
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4">エスプレッソ記録詳細</h2>
        <EnvironmentInfo formData={record} onChange={() => {}} mode="view" recordType="espresso" />
        <CoffeeInfo formData={record} onChange={() => {}} mode="view" />
        <div className="my-4">
          <h3 className="font-bold">クレマ評価</h3>
          <RadarChart tasting={cremaTasting} />
        </div>
        <div className="my-4">
          <h3 className="font-bold">テイスティング評価</h3>
          <RadarChart tasting={record.tasting} />
        </div>
        <div className="my-4">
          <h3 className="font-bold">コメント</h3>
          <div>{record.comments}</div>
        </div>
      </div>
    </div>
  );
}

function EspressoEditModal({ record, onClose, onSave }: { record: EspressoRecord; onClose: () => void; onSave: (r: EspressoRecord) => void }) {
  const [edit, setEdit] = useState<EspressoRecord>({ ...record });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4">エスプレッソ記録編集</h2>
        <div className="mb-2">
          <label>コーヒー名: </label>
          <input className="border rounded px-2" value={edit.coffee.name} onChange={e => setEdit({ ...edit, coffee: { ...edit.coffee, name: e.target.value } })} />
        </div>
        <div className="mb-2">
          <label>産地: </label>
          <input className="border rounded px-2" value={edit.coffee.origin} onChange={e => setEdit({ ...edit, coffee: { ...edit.coffee, origin: e.target.value } })} />
        </div>
        <div className="mb-2">
          <label>品種: </label>
          <input className="border rounded px-2" value={edit.coffee.variety} onChange={e => setEdit({ ...edit, coffee: { ...edit.coffee, variety: e.target.value } })} />
        </div>
        <div className="mb-2">
          <label>コメント: </label>
          <input className="border rounded px-2" value={edit.comments} onChange={e => setEdit({ ...edit, comments: e.target.value })} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>キャンセル</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => { onSave(edit); onClose(); }}>保存</button>
        </div>
      </div>
    </div>
  );
}

export default function EspressoRecordList() {
  const [records, setRecords] = useState<EspressoRecord[]>([]);
  const [detail, setDetail] = useState<EspressoRecord | null>(null);
  const [edit, setEdit] = useState<EspressoRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('espresso_records')
        .select('*')
        .order('environment_date', { ascending: false });

      if (error) {
        console.error('記録の取得に失敗:', error);
        setLoading(false);
        return;
      }

      if (data) {
        // データの形式をEspressoRecord型に変換
        const formattedRecords = data.map(record => ({
          id: record.id,
          environment: {
            date: record.environment_date,
            time: record.environment_time,
            weather: record.environment_weather,
            temperature: record.environment_temperature,
            humidity: record.environment_humidity,
            isAutoFetched: record.environment_is_auto_fetched
          },
          coffee: {
            name: record.coffee_name,
            origin: record.coffee_origin,
            process: record.coffee_process,
            variety: record.coffee_variety,
            roastLevel: record.coffee_roast_level,
            roastedAt: record.coffee_roasted_at,
            roastDate: record.coffee_roast_date,
            otherInfo: record.coffee_other_info
          },
          brewing: {
            type: record.brewing_type,
            typeOther: record.brewing_type_other,
            grinder: record.brewing_grinder,
            grindSetting: record.brewing_grind_setting,
            coffeeAmount: record.brewing_coffee_amount,
            yield: record.brewing_yield,
            brewTime: record.brewing_brew_time,
            temperature: record.brewing_temperature,
            pressure: record.brewing_pressure,
            notes: record.brewing_notes
          },
          crema: {
            color: record.crema_color,
            thickness: record.crema_thickness,
            persistence: record.crema_persistence,
            notes: record.crema_notes
          },
          tasting: {
            acidity: record.tasting_acidity,
            sweetness: record.tasting_sweetness,
            richness: record.tasting_richness,
            body: record.tasting_body,
            balance: record.tasting_balance,
            cleanliness: record.tasting_cleanliness,
            aftertaste: record.tasting_aftertaste,
            totalScore: record.tasting_total_score
          },
          nose: {
            positive: record.nose_positive,
            negative: record.nose_negative,
            notes: record.nose_notes
          },
          aroma: {
            positive: record.aroma_positive,
            negative: record.aroma_negative,
            notes: record.aroma_notes
          },
          personalScore: record.personal_score,
          comments: record.comments,
          notes: record.notes,
          created_at: record.created_at
        }));
        setRecords(formattedRecords);
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('espresso_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('記録の削除に失敗:', error);
      return;
    }

    setRecords(records.filter(record => record.id !== id));
  };

  const handleSave = async (newRecord: EspressoRecord) => {
    const { error } = await supabase
      .from('espresso_records')
      .update({
        environment_date: newRecord.environment.date,
        environment_time: newRecord.environment.time,
        environment_weather: newRecord.environment.weather,
        environment_temperature: newRecord.environment.temperature,
        environment_humidity: newRecord.environment.humidity,
        environment_is_auto_fetched: newRecord.environment.isAutoFetched,
        coffee_name: newRecord.coffee.name,
        coffee_origin: newRecord.coffee.origin,
        coffee_process: newRecord.coffee.process,
        coffee_variety: newRecord.coffee.variety,
        coffee_roast_level: newRecord.coffee.roastLevel,
        coffee_roasted_at: newRecord.coffee.roastedAt,
        coffee_roast_date: newRecord.coffee.roastDate,
        coffee_other_info: newRecord.coffee.otherInfo,
        brewing_type: newRecord.brewing.type,
        brewing_type_other: newRecord.brewing.typeOther,
        brewing_grinder: newRecord.brewing.grinder,
        brewing_grind_setting: newRecord.brewing.grindSetting,
        brewing_coffee_amount: newRecord.brewing.coffeeAmount,
        brewing_yield: newRecord.brewing.yield,
        brewing_brew_time: newRecord.brewing.brewTime,
        brewing_temperature: newRecord.brewing.temperature,
        brewing_pressure: newRecord.brewing.pressure,
        brewing_notes: newRecord.brewing.notes,
        crema_color: newRecord.crema.color,
        crema_thickness: newRecord.crema.thickness,
        crema_persistence: newRecord.crema.persistence,
        crema_notes: newRecord.crema.notes,
        tasting_acidity: newRecord.tasting.acidity,
        tasting_sweetness: newRecord.tasting.sweetness,
        tasting_richness: newRecord.tasting.richness,
        tasting_body: newRecord.tasting.body,
        tasting_balance: newRecord.tasting.balance,
        tasting_cleanliness: newRecord.tasting.cleanliness,
        tasting_aftertaste: newRecord.tasting.aftertaste,
        tasting_total_score: newRecord.tasting.totalScore,
        nose_positive: newRecord.nose.positive,
        nose_negative: newRecord.nose.negative,
        nose_notes: newRecord.nose.notes,
        aroma_positive: newRecord.aroma.positive,
        aroma_negative: newRecord.aroma.negative,
        aroma_notes: newRecord.aroma.notes,
        personal_score: newRecord.personalScore,
        comments: newRecord.comments,
        notes: newRecord.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', newRecord.id);

    if (error) {
      console.error('記録の更新に失敗:', error);
      return;
    }

    setRecords(records.map(record => 
      record.id === newRecord.id ? newRecord : record
    ));
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-12">読み込み中...</div>;
  }

  const handleEdit = (record: EspressoRecord) => {
    setEdit(record);
  };
  const handleDetail = (record: EspressoRecord) => {
    setDetail(record);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">エスプレッソ記録一覧</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {records.map((record) => (
          <EspressoRecordCard
            key={record.id}
            record={record}
            onEdit={handleEdit}
            onDetail={handleDetail}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {detail && <EspressoDetailModal record={detail} onClose={() => setDetail(null)} />}
      {edit && <EspressoEditModal record={edit} onClose={() => setEdit(null)} onSave={handleSave} />}
    </div>
  );
} 