import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: '検索クエリが必要です' }, { status: 400 });
  }

  try {
    // コーヒー名で検索し、最新のレコードを取得
    const { data, error } = await supabase
      .from('tasting_records')
      .select('coffee')
      .ilike('coffee->name', `%${query}%`)
      .order('brewed_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ data: null });
    }

    // コーヒー情報のみを返す
    return NextResponse.json({ data: data.coffee });
  } catch (error: any) {
    console.error('Error fetching coffee history:', error);
    return NextResponse.json(
      { error: 'コーヒー情報の取得に失敗しました' },
      { status: 500 }
    );
  }
} 