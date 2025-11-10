import Header from "@/components/Header";
import PricingCard from "@/components/PricingCard";
import plansData from "@/data/plans.json";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Planos que Iluminam Seu Negócio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para transformar sua forma de avaliar imóveis
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {plansData.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              subtitle={plan.subtitle}
              price={plan.price}
              credits={plan.credits}
              features={plan.features}
              recommended={plan.recommended}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">
            Todos os Planos Incluem
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Relatórios detalhados em PDF",
              "Análise de mercado atualizada",
              "Dados de imóveis comparáveis",
              "Cálculo de valorização",
              "Sugestão de preço de venda",
              "Sugestão de valor de aluguel",
              "Índice de confiança da avaliação",
              "Acesso via web e mobile"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Experimente grátis e descubra como AvaLuz pode transformar suas avaliações
            </p>
            <a href="/simulator">
              <button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl">
                Começar Gratuitamente
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
