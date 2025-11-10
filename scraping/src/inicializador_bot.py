from webdriver_manager.firefox import GeckoDriverManager
from botcity.web import WebBot,Browser, PageLoadStrategy
from botcity.web.browsers.firefox import default_options

from .cria_log import CriarLogging
from .bot_utils import BUtils
from datetime import datetime
import logging

class InicializadorBot:
    def __init__(self):
        CriarLogging()
        logging.info('Iniciando Bot Inicial')
        logging.info('Configurando Bot Inicial')
        self.bot = self._configurando_navegador()
        self.b_utils = BUtils()
        self.caminho_nescessario = self.b_utils.verificar_ou_criar_pastas('Arquivos Necessarios')
        self.caminho_execucao = self.b_utils.verificar_ou_criar_pastas(fr'ExecuçãoBot/{datetime.now().strftime("%m_%Y")}')
        

    def _configurando_navegador(self):
        bot = WebBot()
        bot.headless = False
        def_options = default_options(
            headless=bot.headless,
            download_folder_path=bot.download_folder_path,
            user_data_dir=None,  # Informar 'None' aqui irá gerar um diretório temporário
            page_load_strategy=PageLoadStrategy.NORMAL
        )

        # Adicione seu argumento personalizado
        # def_options.add_argument("<Meu argumento especial>")

        # Atualize as opções para usar as opções personalizadas.
        
        def_options.add_argument("--disable-blink-features=AutomationControlled --no-sandbox --disable-dev-shm-usage --user-agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'")

        # def_options.add_argument("useAutomationExtension", False)
        # def_options.add_argument("general.platform.override", "Win32")
        # def_options.add_argument("general.useragent.override",
        #                     "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0")

        # # 3️⃣ Bloquear fingerprints comuns
        # def_options.add_argument("privacy.trackingprotection.enabled", True)
        # def_options.add_argument("network.http.referer.spoofSource", True)

        # # 4️⃣ Evitar cache que denuncie automação
        # def_options.add_argument("browser.cache.disk.enable", True)
        # def_options.add_argument("browser.cache.memory.enable", True)

        bot.options = def_options
        bot.browser = Browser.FIREFOX
        bot.driver_path = GeckoDriverManager().install()
        return bot


    

