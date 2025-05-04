import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client with the anonymous key for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a Supabase admin client with the same key for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type WaitlistEntry = {
  id: string;
  email: string;
  wallet: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
};
