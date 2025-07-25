# Projeto Frontend - Aula de Programação Web

Este projeto é um exemplo prático desenvolvido durante a aula de programação web. O frontend consome uma API REST para gerenciar dados de controle de gastos.

## 📦 Tecnologias utilizadas

- HTML5 + CSS3
- JavaScript (Vanilla)
- Integração com API via Fetch
- Live Server (VSCode)

---

## 🚀 Como rodar localmente

> ⚠️ Antes de iniciar o frontend, **certifique-se de que o backend esteja rodando** (porta 3000).

### 1. Clone o repositório


git clone https://github.com/KhalilDiasDev/aula-frontend.git
cd aula-frontend
 ### 2. Instale as dependências (apenas para organização do projeto)
```
npm install
```
⚠️ As dependências são apenas para organização (como eslint). O frontend roda apenas com HTML/CSS/JS.

### 3. Configure a variável de ambiente
Crie um arquivo .env na raiz do projeto e adicione a seguinte linha:
```
API_URL=http://localhost:3000
```
Essa variável define a URL da API do backend.

Para cofigurala localmente execute o seguinte comando:
```
npm run build
```

### 4. Rode o projeto
Abra o projeto no VSCode, clique com o botão esquerdo em index.html e selecione:
```
"Go Live"
```
<img width="1856" height="981" alt="image" src="https://github.com/user-attachments/assets/72a1d933-afa3-4e37-9564-48dd3d8890c3" />

Certifique-se de que a extensão Live Server está instalada no VSCode.

📁 Estrutura do projeto
```
aula-frontend/
├── services/
│   ├── get.js
│   ├── post.js
│   ├── put.js
│   ├── delete.js
│   └── main.js
├── .env
├── index.html
├── style.css
└── package.json

```
💡 Observações
O backend deve estar rodando localmente na porta 3000.

Os arquivos JavaScript acessam a variável API_URL dinamicamente.

Você pode utilizar json-server ou o backend fornecido na aula para testes.

