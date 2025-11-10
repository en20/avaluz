import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface PricingCardProps {
  name: string;
  subtitle?: string;
  price: number;
  credits: number;
  features: string[];
  recommended?: boolean;
}

const PricingCard = ({ name, subtitle, price, credits, features, recommended }: PricingCardProps) => {
  return (
    <Card className={`relative ${recommended ? 'border-accent shadow-glow' : 'border-border'} card-glow`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-glow px-4 py-1 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            Mais Popular
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-8 pt-8">
        <CardTitle className="font-heading text-2xl mb-2">{name}</CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
        )}
        <CardDescription className="mt-2">
          <span className="font-heading text-4xl font-bold text-foreground">
            {price === 0 ? 'R$ 0' : `R$ ${price}`}
          </span>
          {price > 0 && <span className="text-muted-foreground">/mês</span>}
        </CardDescription>
        {credits > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            {credits} avaliações {price === 0 ? 'gratuitas' : 'por mês'}
          </p>
        )}
        {credits === -1 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Avaliações ilimitadas
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <Check className="h-3 w-3 text-accent" />
            </div>
            <span className="text-sm text-foreground/80">{feature}</span>
          </div>
        ))}
      </CardContent>

      <CardFooter className="pt-6">
        <Button 
          className={`w-full ${recommended ? 'bg-accent hover:bg-accent-glow' : 'bg-primary hover:bg-primary-glow'}`}
          size="lg"
        >
          {price === 0 ? 'Começar Grátis' : 'Assinar Agora'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
