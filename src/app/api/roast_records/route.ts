import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { RoastRecord } from '@/types/roast';

// データのバリデーション
const validateRoastRecord = (data: Partial<RoastRecord>) => {
  const errors: string[] = [];
  // 必須チェックを緩和（全て任意）
  // 数値フィールドの型チェック
  const numericFields = [
    'weight',
    'charge_weight',
    'temperature',
    'humidity',
    'pressure',
    'altitude',
    'charge_temp',
    'moisture',
    'after_weight',
    'drop_temp',
    'color',
    'total_time',
    'acidity',
    'sweetness',
    'bitterness',
    'body',
    'balance',
    'nose_intensity',
    'aroma_intensity',
    'personal_score',
    'overall_total_score'
  ];
  numericFields.forEach(field => {
    if (data[field as keyof RoastRecord] !== null &&
        data[field as keyof RoastRecord] !== undefined &&
        data[field as keyof RoastRecord] !== '' &&
        isNaN(Number(data[field as keyof RoastRecord]))) {
      errors.push(`${field}は数値である必要があります`);
    }
  });
  return errors;
};

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const data = await req.json() as Partial<RoastRecord>;

    // 必須フィールドのバリデーション
    if (!data.bean_name) {
      return new Response(JSON.stringify({ error: '豆の名前は必須です' }), { status: 400 });
    }

    if (!data.roast_date) {
      return new Response(JSON.stringify({ error: '焙煎日は必須です' }), { status: 400 });
    }

    // 数値フィールドのバリデーション
    const numericFields = [
      'weight', 'charge_weight', 'temperature', 'humidity', 'pressure',
      'altitude', 'charge_temp', 'moisture', 'after_weight', 'drop_temp',
      'color', 'total_time', 'acidity', 'sweetness', 'bitterness',
      'body', 'balance', 'nose_intensity', 'aroma_intensity',
      'personal_score', 'overall_total_score'
    ];

    for (const field of numericFields) {
      const value = data[field as keyof RoastRecord];
      if (value !== null && value !== undefined && isNaN(Number(value))) {
        return new Response(JSON.stringify({ error: `${field}は数値である必要があります` }), { status: 400 });
      }
    }

    // スコアの範囲チェック
    const scoreFields = [
      'acidity', 'sweetness', 'bitterness', 'body', 'balance',
      'nose_intensity', 'aroma_intensity'
    ];

    for (const field of scoreFields) {
      const value = data[field as keyof RoastRecord];
      if (value !== null && value !== undefined) {
        const numValue = Number(value);
        if (numValue < 1 || numValue > 5) {
          return new Response(JSON.stringify({ error: `${field}は1から5の間である必要があります` }), { status: 400 });
        }
      }
    }

    if (data.personal_score !== null && data.personal_score !== undefined) {
      const score = Number(data.personal_score);
      if (score < 0 || score > 100) {
        return new Response(JSON.stringify({ error: '個人評価は0から100の間である必要があります' }), { status: 400 });
      }
    }

    if (data.color !== null && data.color !== undefined) {
      const color = Number(data.color);
      if (color < 1 || color > 20) {
        return new Response(JSON.stringify({ error: '色度は1から20の間である必要があります' }), { status: 400 });
      }
    }

    // データの挿入
    const { data: insertedData, error: insertError } = await supabase
      .from('roast_records')
      .insert([{
        ...data,
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ error: 'データの保存に失敗しました' }), { status: 500 });
    }

    return new Response(JSON.stringify(insertedData), { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: '予期せぬエラーが発生しました' }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // 特定のレコードを取得
      const { data, error } = await supabase
        .from('roast_records')
        .select('*')
        .eq('id', id)
        .eq('is_deleted', false)
        .single();

      if (error) {
        console.error('Fetch error:', error);
        return new Response(JSON.stringify({ error: 'データの取得に失敗しました' }), { status: 500 });
      }

      if (!data) {
        return new Response(JSON.stringify({ error: '指定されたレコードが見つかりません' }), { status: 404 });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      // 全レコードを取得
      const { data, error } = await supabase
        .from('roast_records')
        .select('*')
        .eq('is_deleted', false)
        .order('roast_date', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        return new Response(JSON.stringify({ error: 'データの取得に失敗しました' }), { status: 500 });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: '予期せぬエラーが発生しました' }), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createClient();
    const data = await req.json() as Partial<RoastRecord>;

    if (!data.id) {
      return new Response(JSON.stringify({ error: 'IDは必須です' }), { status: 400 });
    }

    // 必須フィールドのバリデーション
    if (!data.bean_name) {
      return new Response(JSON.stringify({ error: '豆の名前は必須です' }), { status: 400 });
    }

    if (!data.roast_date) {
      return new Response(JSON.stringify({ error: '焙煎日は必須です' }), { status: 400 });
    }

    // 数値フィールドのバリデーション
    const numericFields = [
      'weight', 'charge_weight', 'temperature', 'humidity', 'pressure',
      'altitude', 'charge_temp', 'moisture', 'after_weight', 'drop_temp',
      'color', 'total_time', 'acidity', 'sweetness', 'bitterness',
      'body', 'balance', 'nose_intensity', 'aroma_intensity',
      'personal_score', 'overall_total_score'
    ];

    for (const field of numericFields) {
      const value = data[field as keyof RoastRecord];
      if (value !== null && value !== undefined && isNaN(Number(value))) {
        return new Response(JSON.stringify({ error: `${field}は数値である必要があります` }), { status: 400 });
      }
    }

    // スコアの範囲チェック
    const scoreFields = [
      'acidity', 'sweetness', 'bitterness', 'body', 'balance',
      'nose_intensity', 'aroma_intensity'
    ];

    for (const field of scoreFields) {
      const value = data[field as keyof RoastRecord];
      if (value !== null && value !== undefined) {
        const numValue = Number(value);
        if (numValue < 1 || numValue > 5) {
          return new Response(JSON.stringify({ error: `${field}は1から5の間である必要があります` }), { status: 400 });
        }
      }
    }

    if (data.personal_score !== null && data.personal_score !== undefined) {
      const score = Number(data.personal_score);
      if (score < 0 || score > 100) {
        return new Response(JSON.stringify({ error: '個人評価は0から100の間である必要があります' }), { status: 400 });
      }
    }

    if (data.color !== null && data.color !== undefined) {
      const color = Number(data.color);
      if (color < 1 || color > 20) {
        return new Response(JSON.stringify({ error: '色度は1から20の間である必要があります' }), { status: 400 });
      }
    }

    // データの更新
    const { data: updatedData, error: updateError } = await supabase
      .from('roast_records')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', data.id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(JSON.stringify({ error: 'データの更新に失敗しました' }), { status: 500 });
    }

    if (!updatedData) {
      return new Response(JSON.stringify({ error: '指定されたレコードが見つかりません' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedData), { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: '予期せぬエラーが発生しました' }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'IDは必須です' }), { status: 400 });
    }

    // 論理削除
    const { error: updateError } = await supabase
      .from('roast_records')
      .update({
        is_deleted: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Delete error:', updateError);
      return new Response(JSON.stringify({ error: 'データの削除に失敗しました' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: '削除が完了しました' }), { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: '予期せぬエラーが発生しました' }), { status: 500 });
  }
} 