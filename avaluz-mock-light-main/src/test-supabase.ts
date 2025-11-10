import { supabase } from './lib/supabase';

// Teste simples da conexão
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('imoveis')
      .select('Metros, Quartos, Valor, Condominio')
      .limit(5);

    if (error) {
      console.error('Erro na conexão:', error);
      return null;
    }

    console.log('Dados recebidos:', data);
    return data;
  } catch (err) {
    console.error('Erro:', err);
    return null;
  }
};