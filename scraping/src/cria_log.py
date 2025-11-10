import os
import logging
from datetime import datetime

class CriarLogging:
    def __init__(self):
        self._criar_log()

    def _criar_log(self):
        os.makedirs('logs', exist_ok=True)
        nome_arquivo = datetime.now().strftime("%Y-%m-%d") + ".log"
        caminho_log = os.path.join('logs', nome_arquivo)
        logger = logging.getLogger('scraping_imovel')
        logger.setLevel(logging.INFO)


        if not logger.handlers:
            formato = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s", "%d/%m/%Y %H:%M:%S")

            arquivo_handler = logging.FileHandler(caminho_log, encoding="utf-8")
            arquivo_handler.setFormatter(formato)

            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formato)

            logger.addHandler(arquivo_handler)
            logger.addHandler(console_handler)
