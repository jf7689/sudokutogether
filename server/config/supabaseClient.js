import { createClient } from "@supabase/supabase-js";
import env from "./env.js";

const supabaseUrl = env.dbUrl;
const supabaseKey = env.dbKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
