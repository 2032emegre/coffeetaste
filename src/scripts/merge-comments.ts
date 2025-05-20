import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('環境変数が設定されていません。');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function mergeComments() {
  console.log('コメントと気づきの統合を開始します...');

  // 既存の記録を取得
  const { data: records, error: fetchError } = await supabase
    .from('tasting_records')
    .select('id, comments, notes');

  if (fetchError) {
    console.error('データの取得に失敗しました:', fetchError);
    return;
  }

  console.log(`${records.length}件の記録を処理します...`);

  // 各記録のコメントと気づきを統合
  for (const record of records) {
    const mergedNotes = [
      record.comments,
      record.notes
    ]
      .filter(Boolean) // nullや空文字を除外
      .join('\n\n') // 2つの改行で区切る
      .trim();

    // 統合したデータを更新
    const { error: updateError } = await supabase
      .from('tasting_records')
      .update({ 
        comments: mergedNotes,
        notes: null // notesフィールドはnullに設定
      })
      .eq('id', record.id);

    if (updateError) {
      console.error(`記録ID ${record.id} の更新に失敗しました:`, updateError);
    }
  }

  console.log('処理が完了しました。');
}

// スクリプトを実行
mergeComments().catch(console.error); 