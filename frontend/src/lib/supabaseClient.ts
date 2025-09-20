import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://svnthipugajywqxyoexe.supabase.co"; // Remplacez par votre URL Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bnRoaXB1Z2FqeXdxeHlvZXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjM5NjQsImV4cCI6MjA3MzkzOTk2NH0.X_8pe03hVTGl8q_gBmon5Tl-mrTxCmp3WVAFgv8brLc"; // Remplacez par votre clé anonyme

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);