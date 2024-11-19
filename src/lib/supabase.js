import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "Access-Control-Allow-Origin":
        "http://movie-app-aq.s3-website.ap-south-1.amazonaws.com/",
    },
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);
