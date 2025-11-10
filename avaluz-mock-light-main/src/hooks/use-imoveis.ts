import { useState, useEffect } from 'react';
import { supabase, type Imovel } from '@/lib/supabase';

export const useImoveis = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImoveis = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setImoveis(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar imóveis');
    } finally {
      setLoading(false);
    }
  };

  const insertImovel = async (imovel: Imovel) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('imoveis')
        .insert([imovel])
        .select();

      if (error) throw error;
      await fetchImoveis();
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao inserir imóvel';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  return { imoveis, loading, error, fetchImoveis, insertImovel };
};

export const useMarketAnalysis = () => {
  const [analysis, setAnalysis] = useState({
    areaMedia: 0,
    quartosMedia: 0,
    valorMedio: 0,
    condominioMedio: 0,
    totalImoveis: 0,
    debug: {
      totalComMetros: 0,
      totalComQuartos: 0,
      totalComValor: 0,
      totalComCondominio: 0,
    }
  });
  const [loading, setLoading] = useState(false);

  const calculateAnalysis = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('imoveis')
        .select('Metros, Quartos, Valor, Condominio');

      if (error) throw error;

      console.log('Dados recebidos do Supabase:', data);

      const imoveis = data as Pick<Imovel, 'Metros' | 'Quartos' | 'Valor' | 'Condominio'>[];

      // Função para converter valores monetários brasileiros para números
      const parseCurrency = (value: string | null): number => {
        if (!value || value.trim() === '') return 0;

        // Remove "R$ ", substitui vírgula por ponto, remove pontos de milhares
        const cleaned = value
          .replace('R$ ', '')
          .replace(/\./g, '') // Remove pontos de milhares
          .replace(',', '.'); // Substitui vírgula decimal por ponto

        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
      };

      // Cálculos das médias com validação mais rigorosa
      const comMetros = imoveis.filter(i => i.Metros && i.Metros.trim() !== '' && !isNaN(parseFloat(i.Metros)) && parseFloat(i.Metros) > 0);
      const comQuartos = imoveis.filter(i => i.Quartos && i.Quartos.trim() !== '' && !isNaN(parseFloat(i.Quartos)) && parseFloat(i.Quartos) > 0);
      const comValor = imoveis.filter(i => i.Valor && i.Valor.trim() !== '' && parseCurrency(i.Valor) > 0);
      const comCondominio = imoveis.filter(i => i.Condominio && i.Condominio.trim() !== '' && parseCurrency(i.Condominio) > 0);

      console.log('Imóveis válidos:', {
        total: imoveis.length,
        comMetros: comMetros.length,
        comQuartos: comQuartos.length,
        comValor: comValor.length,
        comCondominio: comCondominio.length
      });

      const areaMedia = comMetros.length > 0
        ? comMetros.reduce((sum, i) => sum + parseFloat(i.Metros || '0'), 0) / comMetros.length
        : 0;

      const quartosMedia = comQuartos.length > 0
        ? comQuartos.reduce((sum, i) => sum + parseFloat(i.Quartos || '0'), 0) / comQuartos.length
        : 0;

      const valorMedio = comValor.length > 0
        ? comValor.reduce((sum, i) => sum + parseCurrency(i.Valor || '0'), 0) / comValor.length
        : 0;

      const condominioMedio = comCondominio.length > 0
        ? comCondominio.reduce((sum, i) => sum + parseCurrency(i.Condominio || '0'), 0) / comCondominio.length
        : 0;

      console.log('Médias calculadas:', {
        areaMedia,
        quartosMedia,
        valorMedio,
        condominioMedio
      });

      setAnalysis({
        areaMedia: parseFloat(areaMedia.toFixed(2)),
        quartosMedia: parseFloat(quartosMedia.toFixed(2)),
        valorMedio: parseFloat(valorMedio.toFixed(2)),
        condominioMedio: parseFloat(condominioMedio.toFixed(2)),
        totalImoveis: imoveis.length,
        debug: {
          totalComMetros: comMetros.length,
          totalComQuartos: comQuartos.length,
          totalComValor: comValor.length,
          totalComCondominio: comCondominio.length,
        }
      });
    } catch (err) {
      console.error('Erro ao calcular análise:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateAnalysis();
  }, []);

  return { analysis, loading, calculateAnalysis };
};