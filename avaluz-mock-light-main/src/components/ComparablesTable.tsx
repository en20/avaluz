import { MapPin, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { useImoveis } from "@/hooks/use-imoveis";

const ComparablesTable = () => {
  const { imoveis, loading } = useImoveis();

  // Pegar apenas os primeiros 5 imóveis como comparáveis
  const comparables = imoveis.slice(0, 5);

  const calcularPrecoPorM2 = (valor: string | null, metros: string | null) => {
    const val = parseFloat(valor || '0');
    const met = parseFloat(metros || '1');
    return met > 0 ? Math.round(val / met) : 0;
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (loading) {
    return (
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-2xl">
            <MapPin className="h-6 w-6 text-accent" />
            Imóveis Comparáveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-pulse">Carregando imóveis comparáveis...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (comparables.length === 0) {
    return (
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-2xl">
            <MapPin className="h-6 w-6 text-accent" />
            Imóveis Comparáveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Nenhum imóvel comparável encontrado. Cadastre imóveis no simulador para ver comparações.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-2xl">
          <MapPin className="h-6 w-6 text-accent" />
          Imóveis Comparáveis ({comparables.length})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Análise comparativa baseada nos imóveis cadastrados no sistema
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Localização</TableHead>
                <TableHead className="text-center">Área</TableHead>
                <TableHead className="text-center">Quartos</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">R$/m²</TableHead>
                <TableHead className="text-center">Condomínio</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparables.map((imovel) => {
                const precoPorM2 = calcularPrecoPorM2(imovel.Valor, imovel.Metros);
                const valor = parseFloat(imovel.Valor || '0');

                return (
                  <TableRow key={imovel.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <Home className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="text-sm">
                          <div className="font-medium">{imovel.Rua}</div>
                          <div className="text-muted-foreground">{imovel.Bairro}, {imovel.Municipio}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{imovel.Metros || '-'}m²</TableCell>
                    <TableCell className="text-center">{imovel.Quartos || '-'}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {valor > 0 ? formatarMoeda(valor) : '-'}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {precoPorM2 > 0 ? `R$ ${precoPorM2.toLocaleString('pt-BR')}` : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {imovel.Condominio && parseFloat(imovel.Condominio) > 0
                        ? `R$ ${parseFloat(imovel.Condominio).toLocaleString('pt-BR')}`
                        : '-'
                      }
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">
                        Cadastrado
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 rounded-lg bg-muted/30 p-4">
          <h4 className="mb-2 font-semibold text-sm">Dados Reais do Mercado</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Esta tabela mostra imóveis reais cadastrados no sistema AvaLuz. Os dados são atualizados automaticamente
            conforme novos imóveis são avaliados. Use estes comparáveis para entender o posicionamento do seu imóvel.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparablesTable;
