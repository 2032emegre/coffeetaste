export type Environment = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  temperature: number;
  humidity: number;
  pressure: number;
  location: string;
  notes?: string;
}; 