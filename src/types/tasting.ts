export interface TastingRecord {
    id: string;
    environment_id?: string;
    coffee_id?: string;
    timestamp?: Date;
    environment: {
        date: string;
        time: string;  // HH:mm形式の時刻
        weather: string;
        temperature: number | null;  // 数値型に変更
        humidity?: string;
        isAutoFetched: boolean;
    };
    coffee: {
        name: string;
        origin?: string;
        process?: string;
        processingOther?: string;  // 精製方式の「その他」入力用
        variety?: string;
        varietyOther?: string;     // 品種の「その他」入力用
        roastLevel?: string;
        roastedAt?: Date;
        roastDate?: string;
        altitude?: number | null;         // 標高（メートル）
        other_info?: string;
    };
    brewing: {
        dripper: string;
        grinder?: string;
        grindSize?: string;
        grindSetting?: string;
        temperature?: string;
        coffeeAmount?: string;
        waterAmount?: string;
        bloomAmount?: string;
        bloomTime?: string;
        brewTime?: string;  // 抽出時間
        notes?: string;
    };
    tasting: {
        acidity: number;      // 1-5
        sweetness: number;    // 1-5
        richness: number;     // 1-5
        body: number;         // 1-5
        balance: number;      // 1-5
        cleanliness: number;  // 1-5
        aftertaste: number;   // 1-5
        totalScore: number;   // 自動計算される合計スコア
        aromaPowder: number;        // 1-5 粉の香り
        aromaPowderNote: string;    // 粉の香りノート
        aromaLiquid: number;        // 1-5 液体の香り
        aromaLiquidNote: string;    // 液体の香りノート
        flavor: number;             // 1-5 風味
        flavorNote: string;         // 風味ノート
        strength: number;           // 1-5 濃さ
        uniformity: number;         // 1-5 均一性
        cleanness: number;          // 1-5 カップの綺麗さ
    };
    nose: {
        positive: Record<string, boolean>;
        negative: Record<string, boolean>;
        notes: string;
        positive_other_note?: string;
        negative_other_note?: string;
    };
    aroma: {
        positive: Record<string, boolean>;
        negative: Record<string, boolean>;
        notes: string;
        positive_other_note?: string;
        negative_other_note?: string;
    };
    personal_score: number;  // 100点満点
    comments: string;
    notes: string;
    created_at?: string;
    nose_other_note?: string;
    aroma_other_note?: string;
}

// 店舗来店記録用の型
export type ShopVisitRecord = {
  id?: string;
  environment: {
    date: string;
    time: string;
    weather: string;
    temperature: number | null;
    humidity?: string;
    isAutoFetched: boolean;
  };
  shop: {
    name: string;
    link: string;
  };
  items: {
    name: string;
    price: number;
    type?: string; // コーヒー/紅茶/その他
    method?: string; // 抽出法
    methodOther?: string; // その他の抽出法
    origin?: string; // 産地
    roastLevel?: string; // 焙煎度
    variety?: string; // 品種
    attributes?: {
      acidity?: number;
      sweetness?: number;
      richness?: number;
      body?: number;
      balance?: number;
      cleanliness?: number;
      aftertaste?: number;
    };
  }[];
  tasting: {
    acidity: number;
    sweetness: number;
    richness: number;
    body: number;
    balance: number;
    cleanliness: number;
    aftertaste: number;
    totalScore: number;
  };
  comments?: string;
  staffInfo?: string;
  created_at?: string;
};

export type EspressoRecord = {
  id: string;
  environment: {
    date: string;
    time: string;
    weather: string;
    temperature: number | null;
    humidity?: string;
    isAutoFetched: boolean;
  };
  coffee: {
    name: string;
    origin?: string;
    process?: string;
    variety?: string;
    roastLevel?: string;
    roastedAt?: Date;
    roastDate?: string;
    other_info?: string;
  };
  brewing: {
    type: string;
    typeOther?: string;
    grinder?: string;
    grindSetting?: string;
    coffeeAmount?: string;
    yield?: string;
    brewTime?: string;
    temperature?: string;
    pressure?: string;
    notes?: string;
    dripper: string;
    flair?: boolean;
    flairMemo?: string;
  };
  crema: {
    color: number;
    thickness: number;
    persistence: number;
    notes?: string;
  };
  tasting: {
    acidity: number;
    sweetness: number;
    richness: number;
    body: number;
    balance: number;
    cleanliness: number;
    aftertaste: number;
    totalScore: number;
    aromaPowder?: number;
    aromaPowderNote?: string;
    aromaLiquid?: number;
    aromaLiquidNote?: string;
    flavor?: number;
    flavorNote?: string;
    strength?: number;
    uniformity?: number;
    cleanness?: number;
  };
  nose: {
    positive: Record<string, boolean>;
    negative: Record<string, boolean>;
    notes: string;
  };
  aroma: {
    positive: Record<string, boolean>;
    negative: Record<string, boolean>;
    notes: string;
  };
  personal_score: number;
  comments: string;
  notes?: string;
  created_at?: string;
}; 