import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const VideoSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Veja como o AVALUZ revoluciona a avaliação de imóveis
            </h2>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/50 shadow-xl mb-8">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
              <button 
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-glow transition-all hover:scale-110 hover:shadow-xl"
                aria-label="Reproduzir vídeo"
              >
                <Play className="h-8 w-8 text-primary fill-primary ml-1" />
              </button>
              <div className="mt-6 text-center">
                <p className="font-heading text-lg font-semibold text-foreground">
                  Vídeo de Apresentação
                </p>
                <p className="text-sm text-muted-foreground">
                  Veja como a AvaLuz revoluciona as avaliações
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/simulator">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg"
              >
                Avaliar Meu Imóvel Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
