import { MapPin, Home, Bath, Car, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import propertyMock from "@/data/property-mock.json";
import propertySample from "@/assets/property-sample.jpg";

type EvaluationResult = {
  valor_estimado_venda: string;
  valor_estimado_aluguel: string;
  analise_ia: string;
  analise_mercado: string;
  confianca: string;
  erro: string | null;
};

type PropertyData = {
  Municipio: string;
  Estado: string;
  Regiao: string;
  Bairro: string;
  Rua: string;
  Metros: string;
  Quartos: string;
  Banheiros: string;
  Vagas: string;
  Descricao: string;
  Valor: string;
  Condominio: string;
};

interface PropertyResultProps {
  evaluationResult?: EvaluationResult | null;
  propertyData?: PropertyData;
}

const PropertyResult = ({ evaluationResult, propertyData }: PropertyResultProps) => {
  console.log('PropertyResult received evaluationResult:', evaluationResult);
  console.log('PropertyResult received propertyData:', propertyData);
  
  // Use real data if available, otherwise fall back to mock
  const data = evaluationResult ? {
    ...propertyMock,
    price_estimate: parseFloat(evaluationResult.valor_estimado_venda.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')),
    rent_estimate: parseFloat(evaluationResult.valor_estimado_aluguel.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')),
    price_per_sqm: Math.round(parseFloat(evaluationResult.valor_estimado_venda.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')) / (propertyData ? parseInt(propertyData.Metros) : propertyMock.size)),
    confidence_score: parseInt(evaluationResult.confianca),
    ai_description: evaluationResult.analise_ia,
    market_summary: evaluationResult.analise_mercado,
    address: propertyData ? `${propertyData.Rua}, ${propertyData.Bairro}, ${propertyData.Municipio} - ${propertyData.Estado}` : propertyMock.address,
    size: propertyData ? parseInt(propertyData.Metros) : propertyMock.size,
    bedrooms: propertyData ? parseInt(propertyData.Quartos) : propertyMock.bedrooms,
    bathrooms: propertyData ? parseInt(propertyData.Banheiros) : propertyMock.bathrooms,
    parking: propertyData ? parseInt(propertyData.Vagas) : propertyMock.parking,
  } : propertyMock;

  return (
    <div className="space-y-6">
      {/* Main Property Card */}
      <Card className="card-glow overflow-hidden">
        <div className="relative h-64 w-full">
          <img 
            src={propertySample} 
            alt="Property" 
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-white">
              Confiança: {data.confidence_score}%
            </Badge>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="font-heading text-2xl mb-2">
                Avaliação Concluída
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{data.address}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Property Details */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.size}m²</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.bedrooms} quartos</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.bathrooms} banheiros</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.parking} vagas</span>
            </div>
          </div>

          {/* Price Estimates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-br from-primary to-primary-glow p-6 text-white">
              <div className="mb-2 flex items-center gap-2 text-sm opacity-90">
                <DollarSign className="h-4 w-4" />
                Valor Estimado de Venda
              </div>
              <div className="font-heading text-3xl font-bold">
                R$ {data.price_estimate.toLocaleString('pt-BR')}
              </div>
              <div className="mt-2 text-sm opacity-90">
                R$ {data.price_per_sqm.toLocaleString('pt-BR')}/m²
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-accent to-accent-glow p-6 text-white">
              <div className="mb-2 flex items-center gap-2 text-sm opacity-90">
                <TrendingUp className="h-4 w-4" />
                Valor Estimado de Aluguel
              </div>
              <div className="font-heading text-3xl font-bold">
                R$ {data.rent_estimate.toLocaleString('pt-BR')}/mês
              </div>
              <div className="mt-2 text-sm opacity-90">
                Yield: {((data.rent_estimate * 12 / data.price_estimate) * 100).toFixed(1)}% a.a.
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <h3 className="font-heading font-semibold">Análise de Mercado</h3>
            <p className="text-sm text-muted-foreground">
              {data.market_summary}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div>
                <div className="text-xs text-muted-foreground">Tendência</div>
                <div className="font-semibold text-accent">{data.appreciation_trend}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Valorização</div>
                <div className="font-semibold text-accent">+{data.appreciation_rate}% a.a.</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Liquidez</div>
                <div className="font-semibold text-accent">{data.market_liquidity}</div>
              </div>
            </div>
          </div>

          {/* AI Description */}
          <div className="space-y-3 rounded-lg border bg-gradient-to-br from-background to-secondary/20 p-4">
            <h3 className="font-heading font-semibold">Análise Inteligente por IA</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.ai_description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyResult;
