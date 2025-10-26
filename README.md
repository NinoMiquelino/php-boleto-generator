## 👨‍💻 Autor

<div align="center">
  <img src="https://avatars.githubusercontent.com/ninomiquelino" width="100" height="100" style="border-radius: 50%">
  <br>
  <strong>Onivaldo Miquelino</strong>
  <br>
  <a href="https://github.com/ninomiquelino">@ninomiquelino</a>
</div>

---

# 🧾 Emissor de Boletos Bancários (Arquitetura e Integração)

![Made with PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)
![Frontend JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-green)
![Status Stable](https://img.shields.io/badge/Status-Stable-success)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue)
![GitHub stars](https://img.shields.io/github/stars/NinoMiquelino/php-boleto-generator?style=social)
![GitHub forks](https://img.shields.io/github/forks/NinoMiquelino/php-boleto-generator?style=social)
![GitHub issues](https://img.shields.io/github/issues/NinoMiquelino/php-boleto-generator)

Este projeto demonstra a arquitetura necessária para implementar um emissor de boletos bancários em PHP, focando na separação de responsabilidades (POO) e na persistência de configurações.

**NOTA IMPORTANTE:** Devido à complexidade de cálculo de código de barras e layout (regras da Febraban e dos bancos), este projeto *simula* a integração com uma biblioteca real (**OpenBoleto**) para focar na lógica de frontend/backend, configuração e geração de PDF.

---

## 🚀 Arquitetura e Destaques

* **POO (Service Layer):** A classe `BoletoGenerator` atua como a camada de serviço, gerenciando a persistência das configurações do cedente em JSON e simulando a chamada à biblioteca de terceiros.
* **Persistência em Arquivo:** Os dados críticos do cedente (nome, conta, banco) são salvos em um arquivo local (`src/Config.json`), simulando uma base de dados de configuração.
* **Geração de PDF:** O projeto utiliza a biblioteca **html2pdf.js** no frontend para converter o HTML gerado pelo backend em um arquivo PDF para download, cumprindo o requisito de saída.
* **Interface Dinâmica (AJAX):** A interface possui abas para Configuração e Emissão, comunicando-se com a API via `GET` e `POST` para carregar/salvar dados e gerar o boleto.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** PHP 7.4+ (POO, Manipulação de JSON, Filesystem I/O).
* **Bibliotecas Externas (Simuladas):** OpenBoleto (Geração de Boletos) e Dompdf (Conversão HTML -> PDF).
* **Frontend:** HTML5, JavaScript Vanilla (`fetch` API), Tailwind CSS, **html2pdf.js**.

---

## 🧩 Estrutura do Projeto

```
php-boleto-generator/
├── index.html
├── api.js
├── README.md
├── .gitignore
└── 📁 src/
         ├── config.json
         ├── BoletoGenerator.php         
         └── api.php
```
---

## ⚙️ Configuração e Instalação

### Pré-requisitos

1.  Um ambiente de servidor web com PHP.
2.  **Composer** (Recomendado para ambientes reais, simulado aqui).
3.  Permissão de escrita no diretório `src/` para criar o `Config.json`.

### 1. Inicialização do Projeto

1.  Crie a estrutura de pastas e insira os arquivos (`BoletoGenerator.php`, `api.php`, `index.html`, `app.js`).
2.  **Crie o arquivo de configuração vazio:**
    ```bash
    touch src/Config.json
    ```
    Garanta que o PHP tem permissão de escrita neste arquivo.

3. **Instalar a Dependência PHP**
​Utilize o Composer para instalar a biblioteca openboleto/openboleto dompdf/dompdf:

```bash
composer require openboleto/openboleto dompdf/dompdf
```

### 2. Execução

1.  Execute o servidor embutido do PHP (a partir da raiz do projeto):
    ```bash
    php -S localhost:8001
    ```
2.  Acesse a aplicação no navegador: `http://localhost:8001/public/index.html`.

---

## 📝 Instruções de Uso

1.  **Configuração (Emitente):**
    * Vá para a aba "Configuração".
    * Preencha os dados (Nome, Banco, Agência, Conta, etc.).
    * Clique em **Salvar Configuração**. O PHP salvará esses dados em `src/Config.json`.
    * Recarregue a página para ver os dados persistidos.

2.  **Emissão (Sacado):**
    * Vá para a aba "Emissão".
    * Preencha os dados do Sacado, o Valor e a Data de Vencimento.
    * Clique em **Emitir Boleto (HTML)**. O backend validará a configuração e gerará o HTML simulado.

3.  **Gerar PDF:**
    * Após a emissão, clique em **Gerar PDF do Boleto**. O JavaScript usará a biblioteca `html2pdf.js` para renderizar o conteúdo da prévia em um PDF para download.

---

## 🤝 Contribuições
Contribuições são sempre bem-vindas!  
Sinta-se à vontade para abrir uma [*issue*](https://github.com/NinoMiquelino/php-boleto-generator/issues) com sugestões ou enviar um [*pull request*](https://github.com/NinoMiquelino/php-boleto-generator/pulls) com melhorias.

---

## 💬 Contato
📧 [Entre em contato pelo LinkedIn](https://www.linkedin.com/in/onivaldomiquelino/)  
💻 Desenvolvido por **Onivaldo Miquelino**

---
