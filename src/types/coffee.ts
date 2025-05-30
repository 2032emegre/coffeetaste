export type Coffee = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  origin: string;
  process: string;
  variety: string;
  farm?: string;
  elevation?: number;
  harvest_date?: string;
  notes?: string;
}; 