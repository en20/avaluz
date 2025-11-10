import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import VideoSection from "@/components/VideoSection";
import StatsSection from "@/components/StatsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, BarChart3, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Avaliações Instantâneas",
      description: "Receba relatórios completos em minutos, não em dias. Tecnologia que acelera suas negociações."
    },
    {
      icon: Shield,
      title: "Confiança & Precisão",
      description: "Análises baseadas em dados reais de mercado com índice de confiança acima de 90%."
    },
    {
      icon: BarChart3,
      title: "Análise Comparativa",
      description: "Compare com imóveis similares e entenda o posicionamento do seu imóvel no mercado."
    },
    {
      icon: Sparkles,
      title: "IA Avançada",
      description: "Ava, nossa assistente inteligente, responde suas dúvidas e sugere estratégias."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <VideoSection />
      <StatsSection />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Por que Escolher AvaLuz?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforme dados complexos em insights luminosos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-glow border-border">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Pronto para Iluminar Suas Negociações?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de corretores que já descobriram a clareza da AvaLuz
          </p>
          <a href="/simulator">
            <button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl">
              Começar Agora - É Grátis
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
