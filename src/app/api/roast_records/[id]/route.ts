import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { RoastRecord } from '@/types/roast';
import { validateRoastRecord } from '../../../../utils/validation';

const supabase = createClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('roast_records')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ 
        error: 'データの取得に失敗しました',
        details: error.message 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: '記録が見つかりません' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error('Unexpected error:', e);
    return new Response(JSON.stringify({ 
      error: '予期せぬエラーが発生しました',
      details: e instanceof Error ? e.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'IDが指定されていません' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const validationError = validateRoastRecord(data);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const { data: updatedRecord, error } = await supabase
      .from('roast_records')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating roast record:', error);
      return NextResponse.json(
        { error: '記録の更新に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Error in PUT /api/roast_records/[id]:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'IDが指定されていません' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('roast_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting roast record:', error);
      return NextResponse.json(
        { error: '記録の削除に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: '記録を削除しました' });
  } catch (error) {
    console.error('Error in DELETE /api/roast_records/[id]:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 