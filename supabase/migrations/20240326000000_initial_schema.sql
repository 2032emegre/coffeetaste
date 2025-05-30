-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roast_records table
CREATE TABLE IF NOT EXISTS roast_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    bean_name TEXT NOT NULL,
    origin TEXT,
    process TEXT,
    variety TEXT,
    roast_date DATE NOT NULL,
    weight NUMERIC,
    charge_weight NUMERIC,
    temperature NUMERIC,
    humidity NUMERIC,
    pressure NUMERIC,
    altitude NUMERIC,
    charge_temp NUMERIC,
    moisture NUMERIC,
    after_weight NUMERIC,
    drop_temp NUMERIC,
    color NUMERIC,
    first_crack TIMESTAMPTZ,
    second_crack TIMESTAMPTZ,
    total_time NUMERIC,
    acidity NUMERIC,
    sweetness NUMERIC,
    bitterness NUMERIC,
    body NUMERIC,
    balance NUMERIC,
    nose_intensity NUMERIC,
    aroma_intensity NUMERIC,
    personal_score NUMERIC,
    overall_total_score NUMERIC,
    comments TEXT,
    notes TEXT,
    is_deleted BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id)
);

-- Create tasting_records table
CREATE TABLE IF NOT EXISTS tasting_records (
    id SERIAL PRIMARY KEY,
    coffee_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    notes TEXT,
    altitude INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Create shop_visits table
CREATE TABLE IF NOT EXISTS shop_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment JSONB NOT NULL,
    shop JSONB NOT NULL,
    items JSONB NOT NULL,
    tasting JSONB NOT NULL,
    comments TEXT,
    staff_info TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Create RLS policies
ALTER TABLE roast_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasting_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_visits ENABLE ROW LEVEL SECURITY;

-- Roast records policies
CREATE POLICY "Users can view their own roast records"
    ON roast_records FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roast records"
    ON roast_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own roast records"
    ON roast_records FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own roast records"
    ON roast_records FOR DELETE
    USING (auth.uid() = user_id);

-- Tasting records policies
CREATE POLICY "Users can view their own tasting records"
    ON tasting_records FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasting records"
    ON tasting_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasting records"
    ON tasting_records FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasting records"
    ON tasting_records FOR DELETE
    USING (auth.uid() = user_id);

-- Shop visits policies
CREATE POLICY "Users can view their own shop visits"
    ON shop_visits FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own shop visits"
    ON shop_visits FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shop visits"
    ON shop_visits FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shop visits"
    ON shop_visits FOR DELETE
    USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at trigger to roast_records
CREATE TRIGGER update_roast_records_updated_at
    BEFORE UPDATE ON roast_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 