import { useState } from "react";
import Header from "@/components/Header";
import PropertyResult from "@/components/PropertyResult";
import ChatAssistant from "@/components/ChatAssistant";
import LoadingStates from "@/components/LoadingStates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, FileText, Download, MapPin, Home, DollarSign } from "lucide-react";
import { toast } from "sonner";

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

const Simulator = () => {
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const handleCepChange = async (cep: string) => {
    // Clean CEP (remove non-digits)
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length === 8) { // CEP has 8 digits
      setCepLoading(true);
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...formData,
            Municipio: data.city,
            Estado: data.state,
            Bairro: data.neighborhood,
            Rua: data.street,
          });
          toast.success("Endereço preenchido automaticamente");
        } else {
          toast.error("CEP não encontrado");
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        toast.error("Erro ao buscar CEP");
      } finally {
        setCepLoading(false);
      }
    }
  };
  const [formData, setFormData] = useState({
    Municipio: "Goiânia",
    Estado: "GO",
    Regiao: "",
    Bairro: "Setor Bueno",
    Rua: "Rua das Palmeiras, 123",
    Metros: "98",
    Quartos: "3",
    Banheiros: "2",
    Vagas: "2",
    Descricao: "",
    Valor: "",
    Condominio: "450"
  });

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsGenerating(true);
    
    // Function to normalize strings to title case
    const toTitleCase = (str: string) => {
      return str.toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace(/-(\w)/g, (match, letter) => '-' + letter.toUpperCase());
    };
    
    // Send data to webhook
    try {
      const webhookData = {
        rua: toTitleCase(formData.Rua),
        bairro: toTitleCase(formData.Bairro),
        cidade: toTitleCase(formData.Municipio),
        estado: formData.Estado.toUpperCase(), // Estado is already uppercase
        area_total: formData.Metros,
        quartos: formData.Quartos,
        banheiros: formData.Banheiros,
        vagas: formData.Vagas,
        tipo: toTitleCase("apartamento"), // Assuming apartment, can be made configurable later
        condominio: formData.Condominio
      };

      console.log('Sending to webhook:', webhookData);

      const response = await fetch('https://memoken.com/webhook/avaluz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      console.log('Webhook response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        throw new Error(`Webhook error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Webhook result:', result);
      setEvaluationResult(result);
      console.log('Setting evaluationResult:', result);
    } catch (error) {
      console.error('Webhook error:', error);
      toast.error("Erro ao processar avaliação. Verifique sua conexão e tente novamente.");
      setIsGenerating(false);
      return;
    }
    
    // Keep loading visible for full animation sequence
    // 5 states × 1800ms + 1 final state × 600ms = 9600ms
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }, 9600); // 5 × 1800ms + 600ms
  };

  const handleGenerateReport = () => {
    toast.info("Gerando relatório em PDF...");
    setTimeout(() => {
      toast.success("Seu relatório está pronto — iluminando o mercado com clareza!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Loading States Modal */}
      <LoadingStates isVisible={isGenerating} />

      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Simulador de Avaliação
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamos clarear o valor do seu imóvel
          </p>
        </div>

        {/* Form */}
        <Card className="card-glow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-2xl">
              <Calculator className="h-6 w-6 text-accent" />
              Dados do Imóvel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSimulate} className="space-y-8">
              
              {/* Localização */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                  Localização
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input 
                      id="cep" 
                      placeholder="Ex: 74672-200"
                      maxLength={9}
                      onBlur={(e) => handleCepChange(e.target.value)}
                      disabled={cepLoading}
                    />
                    {cepLoading && <p className="text-sm text-muted-foreground">Buscando endereço...</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="municipio">Município</Label>
                    <Input 
                      id="municipio" 
                      placeholder="Ex: Goiânia"
                      value={formData.Municipio}
                      onChange={(e) => setFormData({...formData, Municipio: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input 
                      id="estado" 
                      placeholder="Ex: GO"
                      maxLength={2}
                      value={formData.Estado}
                      onChange={(e) => setFormData({...formData, Estado: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regiao">Região</Label>
                    <Input 
                      id="regiao" 
                      placeholder="Ex: Centro-Oeste"
                      value={formData.Regiao}
                      onChange={(e) => setFormData({...formData, Regiao: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input 
                      id="bairro" 
                      placeholder="Ex: Setor Bueno"
                      value={formData.Bairro}
                      onChange={(e) => setFormData({...formData, Bairro: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rua">Rua</Label>
                    <Input 
                      id="rua" 
                      placeholder="Ex: Rua das Palmeiras, 123"
                      value={formData.Rua}
                      onChange={(e) => setFormData({...formData, Rua: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Características Físicas */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <Home className="h-5 w-5 text-accent" />
                  Características Físicas
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="metros">Área Total (m²)</Label>
                    <Input 
                      id="metros" 
                      type="number" 
                      placeholder="98"
                      value={formData.Metros}
                      onChange={(e) => setFormData({...formData, Metros: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quartos">Quartos</Label>
                    <Input 
                      id="quartos" 
                      type="number" 
                      placeholder="3"
                      value={formData.Quartos}
                      onChange={(e) => setFormData({...formData, Quartos: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banheiros">Banheiros</Label>
                    <Input 
                      id="banheiros" 
                      type="number" 
                      placeholder="2"
                      value={formData.Banheiros}
                      onChange={(e) => setFormData({...formData, Banheiros: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vagas">Vagas de Garagem</Label>
                    <Input 
                      id="vagas" 
                      type="number" 
                      placeholder="2"
                      value={formData.Vagas}
                      onChange={(e) => setFormData({...formData, Vagas: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Informações Financeiras */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Informações Financeiras
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input 
                      id="valor" 
                      type="number" 
                      placeholder="500000"
                      value={formData.Valor}
                      onChange={(e) => setFormData({...formData, Valor: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condominio">Condomínio (R$)</Label>
                    <Input 
                      id="condominio" 
                      type="number" 
                      placeholder="450"
                      value={formData.Condominio}
                      onChange={(e) => setFormData({...formData, Condominio: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <FileText className="h-5 w-5 text-accent" />
                  Descrição do Imóvel
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea 
                    id="descricao" 
                    placeholder="Descreva as características principais do imóvel, diferenciais, reformas realizadas, etc."
                    value={formData.Descricao}
                    onChange={(e) => setFormData({...formData, Descricao: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent hover:bg-accent-glow"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-pulse">Processando...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Simular Avaliação
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div id="results" className="space-y-8 animate-fade-in">
            <PropertyResult evaluationResult={evaluationResult} propertyData={formData} />

            {/* Evaluation Result */}
            {evaluationResult && (
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading text-2xl">
                    <Calculator className="h-6 w-6 text-accent" />
                    Resultado da Avaliação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Valor Estimado de Venda</Label>
                      <div className="text-2xl font-bold text-accent">{evaluationResult.valor_estimado_venda}</div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Valor Estimado de Aluguel</Label>
                      <div className="text-2xl font-bold text-accent">{evaluationResult.valor_estimado_aluguel}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Análise IA</Label>
                    <p className="text-muted-foreground">{evaluationResult.analise_ia}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Análise de Mercado</Label>
                    <p className="text-muted-foreground">{evaluationResult.analise_mercado}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Confiabilidade</Label>
                    <div className="text-lg font-semibold text-green-600">{evaluationResult.confianca}</div>
                  </div>

                  {evaluationResult.erro && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-red-600">Erro</Label>
                      <p className="text-red-600">{evaluationResult.erro}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleGenerateReport}
                className="bg-primary hover:bg-primary-glow"
              >
                <FileText className="mr-2 h-5 w-5" />
                Gerar Relatório Completo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleGenerateReport}
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar PDF
              </Button>
            </div>

            {/* Chat Assistant */}
            <ChatAssistant />
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;
