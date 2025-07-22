// Importa as bibliotecas necessárias.
const fs = require('fs');

// Esta linha é a mágica do dotenv: ela carrega as variáveis do arquivo .env
// para dentro do 'process.env' do Node.js.
require('dotenv').config();

// Pega a variável de ambiente. Localmente, virá do .env. No Netlify, virá do painel.
const apiUrl = process.env.API_URL;

// Verifica se a variável existe, senão o build falha.
if (!apiUrl) {
  console.error("ERRO: A variável de ambiente API_URL não foi definida!");
  process.exit(1);
}

// Prepara o conteúdo que será escrito no arquivo api.js.
// É simplesmente uma linha de código JavaScript que exporta a URL.
const fileContent = `export const API_URL = '${apiUrl}';\n`;

// Usa o 'fs' (File System) para escrever/criar o arquivo api.js com o conteúdo.
try {
  fs.writeFileSync('api.js', fileContent);
  console.log(`✅ Arquivo 'api.js' gerado com sucesso com a URL: ${apiUrl}`);
} catch (error) {
  console.error("❌ Falha ao escrever o arquivo api.js:", error);
  process.exit(1);
}