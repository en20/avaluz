import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jdvikyeethbirrdcawbs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkdmlreWVldGhiaXJyZGNhd2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODQwMjMsImV4cCI6MjA3ODE2MDAyM30.8fls1V5GH0Ubh_7CLeCiygXPGObHR4wCQgFmFMoSV8I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Imovel = {
  id?: number;
  Municipio: string | null;
  Estado: string | null;
  Regiao: string | null;
  Bairro: string | null;
  Rua: string | null;
  Metros: string | null;
  Quartos: string | null;
  Banheiros: string | null;
  Vagas: string | null;
  Descricao: string | null;
  Valor: string | null;
  Condominio: string | null;
};