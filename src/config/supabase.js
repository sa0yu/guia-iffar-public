import { createClient } from "@supabase/supabase-js";

    

    const supabaseUrl = 'https://ybgmkkeysimnkixxfjzs.supabase.co';

    const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

    export const supabase = createClient(supabaseUrl, supabaseKey);