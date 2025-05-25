export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      roast_records: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          bean_name: string
          origin: string | null
          process: string | null
          variety: string | null
          roast_date: string
          weight: number | null
          charge_weight: number | null
          temperature: number | null
          humidity: number | null
          pressure: number | null
          altitude: number | null
          charge_temp: number | null
          moisture: number | null
          after_weight: number | null
          drop_temp: number | null
          color: number | null
          first_crack: string | null
          second_crack: string | null
          total_time: number | null
          acidity: number | null
          sweetness: number | null
          bitterness: number | null
          body: number | null
          balance: number | null
          nose_intensity: number | null
          aroma_intensity: number | null
          personal_score: number | null
          overall_total_score: number | null
          comments: string | null
          notes: string | null
          is_deleted: boolean
        }
        Insert: Omit<Database['public']['Tables']['roast_records']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['roast_records']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 