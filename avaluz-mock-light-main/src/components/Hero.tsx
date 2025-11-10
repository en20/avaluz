import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroCity from "@/assets/hero-city.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroCity} 
          alt="Cityscape" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-accent/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            A Luz do Mercado Imobiliário
          </div>
          
          <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-6xl">
            Avaliações Imobiliárias que{" "}
            <span className="relative inline-block">
              Iluminam
              <span className="absolute -bottom-2 left-0 h-1 w-full bg-accent shine-effect" />
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Transparência, tecnologia e confiança em um só clique.
            Descubra o valor real do seu imóvel com inteligência artificial.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/simulator">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-glow text-white shadow-glow transition-all hover:shadow-xl"
              >
                Simule uma Avaliação Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
