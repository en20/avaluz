import { UserPlus, Zap, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Cadastre seu Imóvel",
      description: "Crie sua conta em segundos. Informe endereço, área e mais a data, tipo de casa, tudo e um ambiente intuitivo de imóvel. Tudo rápido, seguro e intuitivo."
    },
    {
      number: 2,
      icon: Zap,
      title: "Avaliação Instantânea",
      description: "Digite o CEP, selecione o tipo do imóvel, informe os dados principais (quartos, área, vagas). A envie fotos do seu imóvel. AvaLuz usa IA e dados de mercado para analisar tudo em segundos.",
      highlighted: true
    },
    {
      number: 3,
      icon: TrendingUp,
      title: "Conecte com Corretores",
      description: "Veja o valor estimado de venda e aluguel, um comparativo de mercado com imóveis semelhantes e dicas para valorizar seu imóvel. Corretores têm acesso a relatórios em PDF, histórico e muito mais."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em apenas 3 passos simples, você obtém uma avaliação precisa do seu imóvel
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.number} 
                className={`relative ${step.highlighted ? 'border-primary shadow-lg scale-105' : 'border-border'} card-glow transition-transform hover:scale-105`}
              >
                <CardContent className="pt-12 pb-8 px-6 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.highlighted ? 'bg-primary' : 'bg-primary'} text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>
                  </div>
                  
                  <div className={`mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-lg ${step.highlighted ? 'bg-accent/20' : 'bg-muted'}`}>
                    <Icon className={`h-8 w-8 ${step.highlighted ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
