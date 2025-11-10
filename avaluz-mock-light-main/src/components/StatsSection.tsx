import { TrendingUp, Users, MapPin, Award } from "lucide-react";
import statsData from "@/data/stats.json";

const StatsSection = () => {
  const stats = [
    {
      icon: Award,
      value: statsData.total_evaluations.toLocaleString('pt-BR'),
      label: "Avaliações Realizadas",
    },
    {
      icon: Users,
      value: statsData.active_users.toLocaleString('pt-BR'),
      label: "Usuários Ativos",
    },
    {
      icon: MapPin,
      value: statsData.cities_covered.toLocaleString('pt-BR'),
      label: "Cidades Cobertas",
    },
    {
      icon: TrendingUp,
      value: `${statsData.average_confidence}%`,
      label: "Confiança Média",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Clareza que Inspira Confiança
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de profissionais já iluminam suas negociações com AvaLuz
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card-glow rounded-xl bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="font-heading text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
