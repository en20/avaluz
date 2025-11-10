import Header from "@/components/Header";
import ComparablesTable from "@/components/ComparablesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, MapPin, BarChart3, Home, DollarSign, RefreshCw } from "lucide-react";
import { useMarketAnalysis } from "@/hooks/use-imoveis";
import { Button } from "@/components/ui/button";

const MarketAnalysis = () => {
  const { analysis, loading, calculateAnalysis } = useMarketAnalysis();

  const formatCurrency = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handleRefresh = () => {
    calculateAnalysis();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Análise Comparativa de Mercado
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Entenda o posicionamento do seu imóvel com clareza luminosa
          </p>
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Atualizando...' : 'Atualizar Dados'}
          </Button>
        </div>

        {/* Market Overview - Informações Médias */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Área Média</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-2xl font-bold">
                {loading ? '...' : `${analysis.areaMedia?.toFixed(0) || 0} m²`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Área total média dos imóveis
              </p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Quartos Médios</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-2xl font-bold">
                {loading ? '...' : `${analysis.quartosMedia?.toFixed(1) || 0}`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Número médio de quartos
              </p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-2xl font-bold">
                {loading ? '...' : formatCurrency(analysis.valorMedio || 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Valor médio dos imóveis
              </p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Condomínio Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-2xl font-bold">
                {loading ? '...' : formatCurrency(analysis.condominioMedio || 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Valor médio do condomínio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comparables Table */}
        <ComparablesTable />

        {/* Market Insights */}
        <Card className="card-glow mt-8">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">
              Estatísticas do Mercado {analysis.totalImoveis > 0 && `(${analysis.totalImoveis} imóveis analisados)`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-4 border-l-4 border-accent">
              <h3 className="font-semibold mb-2">� Dados Médios do Mercado</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Área média:</span>
                  <span className="font-semibold text-accent ml-2">{analysis.areaMedia?.toFixed(0) || 0} m²</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Quartos médios:</span>
                  <span className="font-semibold text-accent ml-2">{analysis.quartosMedia?.toFixed(1) || 0}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Valor médio:</span>
                  <span className="font-semibold text-accent ml-2">{formatCurrency(analysis.valorMedio || 0)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Condomínio médio:</span>
                  <span className="font-semibold text-accent ml-2">{formatCurrency(analysis.condominioMedio || 0)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 p-4 border-l-4 border-primary">
              <h3 className="font-semibold mb-2">💡 Insights Baseados nos Dados</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Com base em {analysis.totalImoveis} imóveis analisados, o mercado apresenta características médias
                que podem ajudar na avaliação do seu imóvel. Considere estes valores como referência para
                posicionamento competitivo na região.
              </p>
              
              {/* Debug Info */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-muted-foreground">DEBUG - Dados Válidos:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Área: <span className="font-mono">{analysis.debug?.totalComMetros || 0}/{analysis.totalImoveis}</span></div>
                  <div>Quartos: <span className="font-mono">{analysis.debug?.totalComQuartos || 0}/{analysis.totalImoveis}</span></div>
                  <div>Valor: <span className="font-mono">{analysis.debug?.totalComValor || 0}/{analysis.totalImoveis}</span></div>
                  <div>Condomínio: <span className="font-mono">{analysis.debug?.totalComCondominio || 0}/{analysis.totalImoveis}</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Se os valores estiverem zerados, cadastre imóveis no simulador primeiro.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketAnalysis;
