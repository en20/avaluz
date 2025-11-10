import { supabase } from './lib/supabase';

export const checkSupabaseData = async () => {
  try {
    console.log('🔍 Verificando dados na tabela imoveis...');

    const { data, error, count } = await supabase
      .from('imoveis')
      .select('*', { count: 'exact' });

    if (error) {
      console.error('❌ Erro na consulta:', error);
      return { success: false, error };
    }

    console.log('✅ Consulta bem-sucedida!');
    console.log(`📊 Total de imóveis: ${count}`);
    console.log('📋 Primeiros 3 imóveis:', data?.slice(0, 3));

    // Verificar campos específicos
    const campos = ['Metros', 'Quartos', 'Valor', 'Condominio'];
    campos.forEach(campo => {
      const comDados = data?.filter(item => item[campo] && item[campo].trim() !== '') || [];
      console.log(`📈 ${campo}: ${comDados.length}/${count} imóveis com dados`);
    });

    return { success: true, data, count };
  } catch (err) {
    console.error('💥 Erro inesperado:', err);
    return { success: false, error: err };
  }
};

// Executar automaticamente se estiver no navegador
if (typeof window !== 'undefined') {
  checkSupabaseData();
}