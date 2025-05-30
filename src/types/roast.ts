import { Environment } from '@/types/environment';
import { Coffee } from '@/types/coffee';

export type RoastRecord = {
  id: string;
  user_id: string;
  environment_id: string;
  coffee_id: string;
  created_at: string;
  updated_at: string;
  roast_date: string;
  roast_level: string;
  roast_time: number;
  roast_weight_before: number;
  roast_weight_after: number;
  roast_notes: string;
  roast_aroma: {
    floral: number;
    fruity: number;
    sour: number;
    sweet: number;
    bitter: number;
    body: number;
    aftertaste: number;
  };
  roast_brewing: {
    method: string;
    grind_size: string;
    water_temp: number;
    ratio: number;
    extraction_time: number;
    notes: string;
  };
  roast_tasting: {
  acidity: number;
  sweetness: number;
    bitterness: number;
  body: number;
    aftertaste: number;
  balance: number;
    overall: number;
    notes: string;
  };
  environment: Environment;
  coffee: Coffee;
}; 