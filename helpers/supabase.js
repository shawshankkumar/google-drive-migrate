import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv'
dotenv.config()
let supabase;

export default () => {
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_PUBLIC_ANON_KEY, {});
  }
  return supabase;
};
