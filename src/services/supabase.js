import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxleseifnekgtmqswzxy.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bGVzZWlmbmVrZ3RtcXN3enh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NDAxMDMsImV4cCI6MjA1MDIxNjEwM30.oMVNwjLj2bZxHgeaHjA4URMDyqfYg7ngwhoVB5dWtiU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;