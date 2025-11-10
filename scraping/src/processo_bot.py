from botcity.web import WebBot, By
from .bot_utils import BUtils
from datetime import datetime
import pandas as pd 
import shutil
import os 

class ProcessoBot:
    def __init__(self, webbot:WebBot, b_utils: BUtils, caminho_execucao, caminho_nescessario):
        self.bot = webbot
        self.b_utils = b_utils
        self.caminho_execucao = caminho_execucao
        self.caminho_nescessario = caminho_nescessario
        self.arquivo_pai = os.path.join(self.caminho_nescessario, 'municipios.csv')
        if not os.path.exists(self.arquivo_pai):
            return False
        self.caminho_arquivo_filho = os.path.join(self.caminho_execucao, f"municipios_{datetime.now().strftime('%m_%Y')}.csv")
        self.caminho_arquivo_quantidade = os.path.join(self.caminho_execucao, f"quantidade_municipios_{datetime.now().strftime('%m_%Y')}.csv")
        if not os.path.exists(self.caminho_arquivo_filho):
            shutil.copy2(self.arquivo_pai, self.caminho_arquivo_filho)
            self.dataframe_filho = pd.read_csv(self.caminho_arquivo_filho, sep=';')
            self.dataframe_quantidade = pd.DataFrame(columns=['Municipio','Estado','Regiao', 'Quantidade'])
        else:
            self.dataframe_filho = pd.read_csv(self.caminho_arquivo_filho, sep=';')
            self.dataframe_quantidade = pd.DataFrame(columns=['Municipio','Estado','Regiao', 'Quantidade'])
            # self.dataframe_quantidade = pd.read_csv(self.caminho_arquivo_quantidade, sep=';')
        self.contador = 0 
        self.contador_pagina = 0        
    

    def main(self):
        inicializador = 0
        for index, row in self.dataframe_filho.iterrows():
            proxima_pagina = 1
            informacoes_imovel = pd.DataFrame(columns=['Municipio','Estado','Regiao', 'Bairro', 'Rua', 'Metros', 'Quartos', 'Banheiros', 'Vagas', 'Descricao', 'Valor', 'Condominio'])
            if self._validar_municipio_validado(row):
                continue
            cidade = self.b_utils.normalizar_variavel_cidade_link(row['MUNICÍPIO - IBGE'])
            self._acessar_site(row, cidade, inicializador)
            inicializador = 1
            quantidade = self._verificar_quantidade_imoveis()
            if quantidade == 0:
                self._adicionar_quantidade_relatorio(quantidade, row)
                self._salvar_na_matriz(index, 'PENDENTE', 'Não Localizado nenhum imóvel na cidade ')
            else:
                self._adicionar_quantidade_relatorio(quantidade, row)
                while True:
                    proxima_pagina = proxima_pagina + 1
                    quantidade_de_itens = self._resgatar_quantidade_items_html()
                    for i in range(1, quantidade_de_itens + 1):
                        valores = self._extraindo_informacao(i)
                        self.bot.wait(350)
                        informacoes_imovel = self._adicionar_dataframe_banco(valores, informacoes_imovel, row)
                    if not self._verficar_proxima_pagina(cidade, row, proxima_pagina):
                        break
                self._gerar_arquivo_cidade(informacoes_imovel,row, cidade)
                self._salvar_na_matriz(index, 'SIM', '')
                continue
    
    def _gerar_arquivo_cidade(self, informacoes_imovel, row, cidade):
        caminho_pasta = self.b_utils.verificar_ou_criar_pastas(os.path.join(self.caminho_execucao,row['REGIAO'], row['UF']))
        caminho_arquivo_csv  = os.path.join(caminho_pasta, f'{cidade}.csv' )
        informacoes_imovel.to_csv(caminho_arquivo_csv, sep=';', index=False)
        return True



    def _verficar_proxima_pagina(self, cidade, row, proxima_pagina):
        nova_pagina = self.bot.find_element('//a[@data-qa="PAGING_NEXT"]', By.XPATH, waiting_time=700)
        
        if not nova_pagina:
            return False
        proxima_pagina_html = self.bot.find_element("a[data-qa='PAGING_NEXT']", By.CSS_SELECTOR)
        if proxima_pagina_html:
            self.bot.wait(2500)
            # self.bot.find_element('/html/body/div[1]/div[2]/div/div/div[3]/a[{proxima_pagina}]',By.XPATH).click()
            botao_anuncio = self.bot.find_element('sp-prompt-close', By.CLASS_NAME, waiting_time=2500)
            if botao_anuncio:
                botao_anuncio.click()
            botao_cookie = self.bot.find_element('/html/body/div[1]/div[3]/div/div[2]/button', By.XPATH)
            if botao_cookie:
                botao_cookie.click()

            proxima_pagina_html.click()
            return True
        else:
            print('Deu ruim')
            return True
        # self.contador_pagina += 1 
        # if self.contador_pagina < 5:
        #     self.bot.navigate_to(f"https://www.imovelweb.com.br/casas-apartamentos-venda-{cidade}-{row['UF'].lower()}-pagina-{proxima_pagina}.html")
        #     return True
        # else:
        #     self.bot.stop_browser()
        #     self.bot.browse(f"https://www.imovelweb.com.br/casas-apartamentos-venda-{cidade}-{row['UF'].lower()}-pagina-{proxima_pagina}.html")                
        #     self.bot.maximize_window()
        #     self.contador_pagina = 0
        #     return True
       

        # else:
        #     print('deu ruim')
        #     return True
        # if proxima_pagina == 5:
        #     botao_proximo = self.bot.find_element( f'a[data-qa="PAGING_{proxima_pagina}"]', By.CSS_SELECTOR)
        #     if botao_proximo:
        #         # self.bot.wait(2000)
        #         print('sa')
        #         return True
        #         # botao_proximo.click()
        #         # self.bot.find_element('button[aria-label="Aceitar todos"], button[aria-label="Aceitar"], button[class*="CookiesPolicyBanner"]', By.CLASS_NAME).click()
        #     else:
        #         print('sa')
        #         return True
        # # if nova_pagina:
        #     self.bot.execute_javascript("window.scrollTo(0, document.body.scrollHeight * 0.8);")
        #     
        #     return True

        # else:
            

        

    def _adicionar_dataframe_banco(self, valores, informacoes_imovel, row):
        nova_linha = {
            'Municipio': row['MUNICÍPIO - IBGE'],
            'Estado': row['UF'],
            'Regiao': row['REGIAO'],
            'Bairro': valores[3],
            'Rua': valores[2],
            'Metros': valores[5],
            'Quartos': valores[6],
            'Banheiros': valores[7],
            'Vagas': valores[8],
            'Descricao': valores[4],
            'Valor': valores[0],
            'Condominio': valores[1]
        }

        informacoes_imovel = pd.concat(
            [informacoes_imovel, pd.DataFrame([nova_linha])],
            ignore_index=True
        )

        return informacoes_imovel

    def _extraindo_informacao(self, indice):
        self.bot.wait(750)
        valor = self.bot.find_element( f"(//*[@data-qa='POSTING_CARD_PRICE'])[ {indice} ]", By.XPATH, waiting_time=350)
        condominio = self.bot.find_element( f"(//*[@data-qa='expensas'])[ {indice} ]", By.XPATH, waiting_time=350)
        rua =self.bot.find_element( f"(//*[contains(@class, 'postingLocations-module__location-address')])[{indice}]", By.XPATH, waiting_time=350)
        bairro =self.bot.find_element( f"(//*[@data-qa='POSTING_CARD_LOCATION'])[ {indice} ]", By.XPATH, waiting_time=350)
        metros_quarto_banheiro_vaga = self.bot.find_element( f"(//*[@data-qa='POSTING_CARD_FEATURES'])[ {indice} ]", By.XPATH, waiting_time=350)
        descricao = self.bot.find_element( f"(//*[@data-qa='POSTING_CARD_DESCRIPTION'])[ {indice} ]", By.XPATH, waiting_time=350)
        

        if valor:
            valor_formatado = self.b_utils.formatar_valor_monetario(valor.text)
        else:
            valor_formatado = ''
        
        if condominio:
            condominio_formatado = self.b_utils.formatar_valor_monetario(condominio.text)
        else:
            condominio_formatado = ''

        if rua:
            rua_formatado = rua.text
        else:
            rua_formatado = ''
        
        if bairro:
            bairro_formatado = self.b_utils.retirar_bairro_texto(bairro.text)
        else:
            bairro_formatado = ''
        
        if descricao:
            descricao_formatado = descricao.text
        else:
            descricao_formatado = ''

        if metros_quarto_banheiro_vaga:
            metro, quarto, banheiro, vaga = self.b_utils.separar_cabecalho_banheiro_metro_quarto_vaga(metros_quarto_banheiro_vaga.text)
        else:
            metro = ''
            quarto = ''
            banheiro = ''
            vaga = ''

        return [valor_formatado, condominio_formatado, rua_formatado, bairro_formatado, descricao_formatado, metro, quarto, banheiro, vaga]
        
        


    def _resgatar_quantidade_items_html(self):
        return len(self.bot.find_elements('postingsList-module__card-container', By.CLASS_NAME))

    def _adicionar_quantidade_relatorio(self, quantidade, row):
        nova_linha = {'Municipio': row['MUNICÍPIO - IBGE'],'Estado': row['UF'],'Regiao': row['REGIAO'],'Quantidade': quantidade}
        self.dataframe_quantidade = pd.concat(
            [self.dataframe_quantidade, pd.DataFrame([nova_linha])],
            ignore_index=True
        )
        self.dataframe_quantidade.to_csv(self.caminho_arquivo_quantidade, sep=';', index=False)

    
    def _salvar_na_matriz(self,index, status, motivo):
        self.dataframe_filho.loc[index,'STATUS'] = status
        self.dataframe_filho.loc[index,'OBSERVACAO'] = motivo
        self.dataframe_filho.to_csv(self.caminho_arquivo_filho, sep=';', index=False)

    def _validar_municipio_validado(self,row):
        try:
            if 'STATUS' in self.dataframe_filho.columns:
                if row['STATUS'] == 'SIM':
                    return True
                if row['STATUS'] == 'PENDENTE':
                    return True
                if row['STATUS'] == '':
                    return False
                if row['STATUS'] == 'ERRO':
                    return False
            else:
                return False
        except Exception:
            return False

    def _acessar_site(self, row, cidade, inicializador):
       try: 
            # self.contador += 1
            # if self.contador == 8:
            #     inicializador = 0
            #     self.contador = 0
            if inicializador == 1:
                self.bot.stop_browser()
            
            self.bot.browse(f"https://www.imovelweb.com.br/casas-apartamentos-venda-{cidade}-{row['UF'].lower()}.html")
            # else:
            #     self.bot.navigate_to(f"https://www.imovelweb.com.br/casas-apartamentos-venda-{cidade}-{row['UF'].lower()}.html")
            self.bot.maximize_window()
       except Exception:
           self.bot.wait(5000)
           self.bot.browse(f"https://www.imovelweb.com.br/casas-apartamentos-venda-{cidade}-{row['UF'].lower()}.html")
    
    def _verificar_quantidade_imoveis(self):
        if self.bot.find_element('postingsNoResults-module__container', By.CLASS_NAME, waiting_time=5000):
            return 0
        quantidade_de_imoveis_html = self.bot.find_element('postingsTopSection-module__top-left-section', By.CLASS_NAME, waiting_time=5000)
        if quantidade_de_imoveis_html:
            quantidade_de_imoveis = self.b_utils.resgatar_quantidade_de_imoveis(quantidade_de_imoveis_html.text)
            if quantidade_de_imoveis:
                return quantidade_de_imoveis
