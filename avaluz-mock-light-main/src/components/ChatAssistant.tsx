import { useState } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import chatMock from "@/data/chat-mock.json";
import aiIcon from "@/assets/ai-icon.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: chatMock.responses.greeting }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let response = chatMock.responses.default;
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("valor") || lowerInput.includes("preço")) {
        response = chatMock.responses.value_inquiry;
      } else if (lowerInput.includes("mercado") || lowerInput.includes("tendência")) {
        response = chatMock.responses.market_trend;
      } else if (lowerInput.includes("aluguel")) {
        response = chatMock.responses.rent_suggestion;
      } else if (lowerInput.includes("investimento")) {
        response = chatMock.responses.investment_advice;
      } else if (lowerInput.includes("bairro") || lowerInput.includes("região")) {
        response = chatMock.responses.neighborhood_info;
      }

      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-2xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
            <img src={aiIcon} alt="AI" className="h-full w-full object-cover" />
          </div>
          Chat com Ava
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Sua assistente de avaliação imobiliária
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Messages */}
          <div className="h-[400px] space-y-4 overflow-y-auto rounded-lg border bg-muted/20 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  {message.role === "assistant" ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                      <img src={aiIcon} alt="Ava" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <AvatarFallback className="bg-primary text-white text-xs">
                      Você
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Qual o valor estimado do meu imóvel?")}
              className="text-xs"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Valor do imóvel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Como está o mercado?")}
              className="text-xs"
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              Mercado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Quanto posso cobrar de aluguel?")}
              className="text-xs"
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              Aluguel
            </Button>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Faça uma pergunta sobre o imóvel..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-accent hover:bg-accent-glow">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
