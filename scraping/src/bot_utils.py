import unicodedata
import logging
import locale
import os 
import re

class BUtils:
    def __init__(self):
        pass

    def verificar_ou_criar_pastas(self, pasta):
        caminho_absoluto = os.path.abspath(pasta)
        if not os.path.exists(caminho_absoluto):
            os.makedirs(caminho_absoluto)
            logging.info(f"Pasta criada: {caminho_absoluto}")
        else:
            logging.info(f"Pasta já existe: {caminho_absoluto}")
        return caminho_absoluto


    def normalizar_variavel_cidade_link(self, cidade):
        cidade_normalizada = unicodedata.normalize('NFKD', cidade)
        cidade_sem_acentos = ''.join(
            c for c in cidade_normalizada if not unicodedata.combining(c)
        )
        cidade_sem_acentos = cidade_sem_acentos.lower()
        cidade_sem_acentos = re.sub(r'\s+', '-', cidade_sem_acentos)
        cidade_sem_acentos = re.sub(r'[^a-z0-9\-]', '', cidade_sem_acentos)
        return cidade_sem_acentos
    
    def resgatar_quantidade_de_imoveis(self, texto_filiais):
        match = re.search(r"\b(\d+)\b", texto_filiais)
        numero = int(match.group(1)) if match else None
        return numero

    def formatar_valor_monetario(self,valor):
        locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
        padrao = r'R\$[\s]*([\d\.]+(?:,\d+)?)'
        match = re.search(padrao, valor)
        if match:
            valor_str = match.group(1)
            valor_float = float(valor_str.replace('.', '').replace(',', '.'))
            return locale.currency(valor_float, grouping=True)
        return ''

    def retirar_bairro_texto(self, texto):
        texto = texto.split(',')
        return texto[0]
  

    def separar_cabecalho_banheiro_metro_quarto_vaga(self, texto):
        """
        Recebe uma string com informações do imóvel e retorna:
        área, quartos, banheiros e vagas (vazio se não existir)
        """
        def capturar_valor(padrao):
            match = re.search(padrao, texto, flags=re.IGNORECASE)
            return match.group(1) if match else ''
        
        # Captura número seguido de m²
        area = capturar_valor(r'(\d+)\s*m²\b')
        
        # Captura número seguido de quarto/quartos
        quartos = capturar_valor(r'(\d+)\s*quartos?\b')
        
        # Captura número seguido de banheiro/banheiros/ban./banh./banh
        banheiros = capturar_valor(r'(\d+)\s*(?:banheiro(?:s)?|ban\.?|banh\.?)\b')
        
        # Captura número seguido de vaga/vagas
        vagas = capturar_valor(r'(\d+)\s*vagas?\b')
        
        return area, quartos, banheiros, vagas