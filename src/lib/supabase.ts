import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://imsxvpbymxuoukeldpuw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc3h2cGJ5bXh1b3VrZWxkcHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTc0NzMsImV4cCI6MjA4MDMzMzQ3M30.YComEpS7pPqPUkijrR92_1G0I2EtHEv_J0dWZ3ep5eE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);