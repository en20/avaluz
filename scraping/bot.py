from src.inicializador_bot import InicializadorBot
from src.processo_bot import ProcessoBot
class WebScrapingImovel:
    def __init__(self):
        self.inicializador = InicializadorBot()
        self.processo_bot = ProcessoBot(self.inicializador.bot, 
                                        self.inicializador.b_utils,
                                        self.inicializador.caminho_execucao,
                                        self.inicializador.caminho_nescessario)
        self.processo_bot.main()


        

if __name__ == "__main__":
    w = WebScrapingImovel()