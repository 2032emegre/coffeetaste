export interface TastingRecord {
    id: string;
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
        otherInfo?: string;
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
    };
    nose: {
        positive: { [key: string]: boolean | string };
        negative: { [key: string]: boolean | string };
        notes: string;
    };
    aroma: {
        positive: { [key: string]: boolean | string };
        negative: { [key: string]: boolean | string };
        notes: string;
    };
    personalScore: number;  // 100点満点
    comments: string;
    notes: string;
    created_at?: string;
}

// 店舗来店記録用の型
export interface ShopVisitRecord {
  id: string;
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
    link?: string;
  };
  items: Array<{
    name: string;
    price?: number;
    isCoffee?: boolean;
    origin?: string;
    roastLevel?: string;
    variety?: string;
    method?: string; // 抽出法
  }>;
  tasting: {
    acidity: number;
    sweetness: number;
    body: number;
    balance: number;
    cleanness: number;
    aftertaste: number;
    totalScore: number;
  };
  comments: string;
  staffInfo?: string;
  created_at?: string;
} 