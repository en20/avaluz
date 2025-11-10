import { useEffect, useState } from "react";
import { Lightbulb, TrendingUp, MapPin, Home, BarChart3 } from "lucide-react";
import { Card } from "./ui/card";

type LoadingState = {
  progress: number;
  message: string;
  icon: React.ReactNode;
  duration?: number; // Duration in ms for this specific state
};

const LOADING_STATES: LoadingState[] = [
  {
    progress: 10,
    message: "Iluminando dados do imóvel...",
    icon: <Home className="h-8 w-8" />,
    duration: 1800,
  },
  {
    progress: 25,
    message: "Analisando localização com inteligência artificial...",
    icon: <MapPin className="h-8 w-8" />,
    duration: 1800,
  },
  {
    progress: 40,
    message: "Avaliando características físicas e potencial...",
    icon: <Lightbulb className="h-8 w-8" />,
    duration: 1800,
  },
  {
    progress: 60,
    message: "Consultando tendências do mercado imobiliário...",
    icon: <TrendingUp className="h-8 w-8" />,
    duration: 1800,
  },
  {
    progress: 80,
    message: "Gerando análise inteligente e precisa...",
    icon: <BarChart3 className="h-8 w-8" />,
    duration: 1800,
  },
  {
    progress: 100,
    message: "Sua avaliação está pronta — inteligência que inspira confiança!",
    icon: <Lightbulb className="h-8 w-8" />,
    duration: 600, // Reduzido para 600ms (muito mais rápido)
  },
];

interface LoadingStatesProps {
  isVisible: boolean;
}

const LoadingStates = ({ isVisible }: LoadingStatesProps) => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const currentState = LOADING_STATES[currentStateIndex];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStateIndex(0);
      return;
    }

    const duration = currentState.duration || 1800;
    const interval = setTimeout(() => {
      setCurrentStateIndex((prev) => {
        if (prev < LOADING_STATES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, duration);

    return () => clearTimeout(interval);
  }, [isVisible, currentStateIndex, currentState.duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="card-glow w-full max-w-md p-8 space-y-6">
        {/* Icon with animation */}
        <div className="flex justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-glow rounded-full animate-pulse opacity-50" />
            <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center text-accent">
              {currentState.icon}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {currentState.message}
          </h3>
          <p className="text-sm text-muted-foreground">
            Processando com precisão luminosa...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-glow transition-all duration-700 ease-out"
              style={{ width: `${currentState.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Carregando avaliação</span>
            <span className="font-semibold text-accent">{currentState.progress}%</span>
          </div>
        </div>

        {/* Status dots */}
        <div className="flex justify-center gap-2">
          {LOADING_STATES.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index <= currentStateIndex
                  ? "bg-accent"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LoadingStates;
