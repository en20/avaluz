import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AvaLuz
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Início
          </Link>
          <Link to="/simulator" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Simulador
          </Link>
          <Link to="/market-analysis" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Análise de Mercado
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Planos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/simulator">
            <Button variant="default" size="sm" className="bg-accent hover:bg-accent-glow glow-pulse">
              Simular Agora
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
