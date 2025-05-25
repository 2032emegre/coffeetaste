-- 既存のテーブルを削除（存在する場合）
DROP TABLE IF EXISTS handdrip_records;
DROP TABLE IF EXISTS espresso_records;
DROP TABLE IF EXISTS roast_records;
DROP TABLE IF EXISTS shop_records;
DROP TABLE IF EXISTS tasting_records;

-- ハンドドリップ記録テーブル
CREATE TABLE handdrip_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- 環境情報
    environment_date DATE,
    environment_time TIME,
    environment_weather TEXT,
    environment_temperature NUMERIC,
    environment_humidity TEXT,
    environment_is_auto_fetched BOOLEAN DEFAULT false,
    
    -- コーヒー情報
    coffee_name TEXT NOT NULL,
    coffee_origin TEXT,
    coffee_process TEXT,
    coffee_process_other TEXT,
    coffee_variety TEXT,
    coffee_variety_other TEXT,
    coffee_roast_level TEXT,
    coffee_roasted_at TIMESTAMP WITH TIME ZONE,
    coffee_roast_date DATE,
    coffee_altitude INTEGER,
    coffee_other_info TEXT,
    
    -- 抽出情報
    brewing_dripper TEXT,
    brewing_grinder TEXT,
    brewing_grind_size TEXT,
    brewing_grind_setting TEXT,
    brewing_temperature TEXT,
    brewing_coffee_amount TEXT,
    brewing_water_amount TEXT,
    brewing_bloom_amount TEXT,
    brewing_bloom_time TEXT,
    brewing_brew_time TEXT,
    brewing_notes TEXT,
    
    -- テイスティング評価
    tasting_acidity INTEGER CHECK (tasting_acidity BETWEEN 1 AND 5),
    tasting_sweetness INTEGER CHECK (tasting_sweetness BETWEEN 1 AND 5),
    tasting_richness INTEGER CHECK (tasting_richness BETWEEN 1 AND 5),
    tasting_body INTEGER CHECK (tasting_body BETWEEN 1 AND 5),
    tasting_balance INTEGER CHECK (tasting_balance BETWEEN 1 AND 5),
    tasting_cleanliness INTEGER CHECK (tasting_cleanliness BETWEEN 1 AND 5),
    tasting_aftertaste INTEGER CHECK (tasting_aftertaste BETWEEN 1 AND 5),
    tasting_total_score INTEGER,
    
    -- 香り評価
    nose_positive JSONB DEFAULT '{}',
    nose_negative JSONB DEFAULT '{}',
    nose_notes TEXT,
    
    -- 風味評価
    aroma_positive JSONB DEFAULT '{}',
    aroma_negative JSONB DEFAULT '{}',
    aroma_notes TEXT,
    
    -- 総合評価
    personal_score INTEGER CHECK (personal_score BETWEEN 0 AND 100),
    comments TEXT,
    notes TEXT
);

-- エスプレッソ記録テーブル
CREATE TABLE espresso_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- 環境情報
    environment_date DATE,
    environment_time TIME,
    environment_weather TEXT,
    environment_temperature NUMERIC,
    environment_humidity TEXT,
    environment_is_auto_fetched BOOLEAN DEFAULT false,
    
    -- コーヒー情報
    coffee_name TEXT NOT NULL,
    coffee_origin TEXT,
    coffee_process TEXT,
    coffee_process_other TEXT,
    coffee_variety TEXT,
    coffee_variety_other TEXT,
    coffee_roast_level TEXT,
    coffee_roasted_at TIMESTAMP WITH TIME ZONE,
    coffee_roast_date DATE,
    coffee_altitude INTEGER,
    coffee_other_info TEXT,
    
    -- 抽出情報
    brewing_machine TEXT,
    brewing_grinder TEXT,
    brewing_grind_size TEXT,
    brewing_grind_setting TEXT,
    brewing_dose TEXT,
    brewing_yield TEXT,
    brewing_time TEXT,
    brewing_temperature TEXT,
    brewing_pressure TEXT,
    brewing_notes TEXT,
    
    -- テイスティング評価
    tasting_acidity INTEGER CHECK (tasting_acidity BETWEEN 1 AND 5),
    tasting_sweetness INTEGER CHECK (tasting_sweetness BETWEEN 1 AND 5),
    tasting_richness INTEGER CHECK (tasting_richness BETWEEN 1 AND 5),
    tasting_body INTEGER CHECK (tasting_body BETWEEN 1 AND 5),
    tasting_balance INTEGER CHECK (tasting_balance BETWEEN 1 AND 5),
    tasting_cleanliness INTEGER CHECK (tasting_cleanliness BETWEEN 1 AND 5),
    tasting_aftertaste INTEGER CHECK (tasting_aftertaste BETWEEN 1 AND 5),
    tasting_total_score INTEGER,
    
    -- 香り評価
    nose_positive JSONB DEFAULT '{}',
    nose_negative JSONB DEFAULT '{}',
    nose_notes TEXT,
    
    -- 風味評価
    aroma_positive JSONB DEFAULT '{}',
    aroma_negative JSONB DEFAULT '{}',
    aroma_notes TEXT,
    
    -- 総合評価
    personal_score INTEGER CHECK (personal_score BETWEEN 0 AND 100),
    comments TEXT,
    notes TEXT
);

-- 焙煎記録テーブル
CREATE TABLE roast_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- 環境情報
    environment_date DATE,
    environment_time TIME,
    environment_weather TEXT,
    environment_temperature NUMERIC,
    environment_humidity TEXT,
    environment_is_auto_fetched BOOLEAN DEFAULT false,
    
    -- コーヒー情報
    coffee_name TEXT NOT NULL,
    coffee_origin TEXT,
    coffee_process TEXT,
    coffee_process_other TEXT,
    coffee_variety TEXT,
    coffee_variety_other TEXT,
    coffee_altitude INTEGER,
    coffee_other_info TEXT,
    
    -- 焙煎情報
    roasting_machine TEXT,
    roasting_batch_size TEXT,
    roasting_charge_temp TEXT,
    roasting_first_crack_time TEXT,
    roasting_first_crack_temp TEXT,
    roasting_drop_time TEXT,
    roasting_drop_temp TEXT,
    roasting_total_time TEXT,
    roasting_development_ratio TEXT,
    roasting_notes TEXT,
    
    -- テイスティング評価
    tasting_acidity INTEGER CHECK (tasting_acidity BETWEEN 1 AND 5),
    tasting_sweetness INTEGER CHECK (tasting_sweetness BETWEEN 1 AND 5),
    tasting_richness INTEGER CHECK (tasting_richness BETWEEN 1 AND 5),
    tasting_body INTEGER CHECK (tasting_body BETWEEN 1 AND 5),
    tasting_balance INTEGER CHECK (tasting_balance BETWEEN 1 AND 5),
    tasting_cleanliness INTEGER CHECK (tasting_cleanliness BETWEEN 1 AND 5),
    tasting_aftertaste INTEGER CHECK (tasting_aftertaste BETWEEN 1 AND 5),
    tasting_total_score INTEGER,
    
    -- 香り評価
    nose_positive JSONB DEFAULT '{}',
    nose_negative JSONB DEFAULT '{}',
    nose_notes TEXT,
    
    -- 風味評価
    aroma_positive JSONB DEFAULT '{}',
    aroma_negative JSONB DEFAULT '{}',
    aroma_notes TEXT,
    
    -- 総合評価
    personal_score INTEGER CHECK (personal_score BETWEEN 0 AND 100),
    comments TEXT,
    notes TEXT
);

-- 店舗訪問記録テーブル
CREATE TABLE shop_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- 環境情報
    environment_date DATE,
    environment_time TIME,
    environment_weather TEXT,
    environment_temperature NUMERIC,
    environment_humidity TEXT,
    environment_is_auto_fetched BOOLEAN DEFAULT false,
    
    -- 店舗情報
    shop_name TEXT NOT NULL,
    shop_link TEXT,
    
    -- 注文情報（JSONBで複数アイテムを保存）
    items JSONB DEFAULT '[]',
    
    -- テイスティング評価
    tasting_acidity INTEGER CHECK (tasting_acidity BETWEEN 1 AND 5),
    tasting_sweetness INTEGER CHECK (tasting_sweetness BETWEEN 1 AND 5),
    tasting_richness INTEGER CHECK (tasting_richness BETWEEN 1 AND 5),
    tasting_body INTEGER CHECK (tasting_body BETWEEN 1 AND 5),
    tasting_balance INTEGER CHECK (tasting_balance BETWEEN 1 AND 5),
    tasting_cleanliness INTEGER CHECK (tasting_cleanliness BETWEEN 1 AND 5),
    tasting_aftertaste INTEGER CHECK (tasting_aftertaste BETWEEN 1 AND 5),
    tasting_total_score INTEGER,
    
    -- その他
    comments TEXT,
    staff_info TEXT
);

-- 更新日時を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 各テーブルにトリガーを設定
CREATE TRIGGER update_handdrip_records_updated_at
    BEFORE UPDATE ON handdrip_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_espresso_records_updated_at
    BEFORE UPDATE ON espresso_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roast_records_updated_at
    BEFORE UPDATE ON roast_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_records_updated_at
    BEFORE UPDATE ON shop_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 