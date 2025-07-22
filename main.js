// main.js

// ===================================================================================
//  1. IMPORTAÇÕES DE MÓDULOS (A CAIXA DE FERRAMENTAS)
// ===================================================================================
// Usamos 'import' para trazer funções de outros arquivos. Isso mantém nosso código
// organizado e reutilizável. Cada arquivo tem uma responsabilidade única.
// É como pegar ferramentas específicas (buscar, adicionar, etc.) de suas caixas
// para usá-las em nosso projeto principal.
import { fetchGastos } from './services/get.js';     // Ferramenta para BUSCAR todos os gastos.
import { addGasto } from './services/post.js';      // Ferramenta para ADICIONAR um novo gasto.
import { updateGasto } from './services/put.js';    // Ferramenta para ATUALIZAR um gasto existente.
import { deleteGasto } from './services/delete.js'; // Ferramenta para DELETAR um gasto.

// ===================================================================================
//  2. SELEÇÃO DE ELEMENTOS DO DOM (OS "CONTROLES REMOTOS" DA PÁGINA)
// ===================================================================================
// Aqui, nós "capturamos" os elementos HTML e os guardamos em constantes.
// Fazemos isso no início para que o JavaScript não precise procurar por eles
// toda vez que precisar usá-los. Pense neles como controles remotos para
// manipular o formulário, a lista, os inputs, etc.
const form = document.getElementById('gasto-form');
const gastosList = document.getElementById('gastos-list');
const gastoIdInput = document.getElementById('gasto-id');      // Input escondido que guarda o ID para edição.
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const categoriaInput = document.getElementById('categoria');
const submitButton = form.querySelector('button');

// ===================================================================================
//  3. FUNÇÃO PARA RENDERIZAR OS GASTOS NA TELA (O "DESENHISTA")
// ===================================================================================
// Esta função é responsável por pegar os dados dos gastos (que vêm da API)
// e transformá-los em HTML visível na página.
function renderGastos(gastos) {
  // Primeiro, limpamos a lista. É como apagar um quadro antes de escrever de novo.
  // Isso evita que os gastos antigos continuem aparecendo junto com os novos.
  gastosList.innerHTML = '';

  // Usamos 'forEach' para percorrer cada 'gasto' dentro do array 'gastos'.
  gastos.forEach(gasto => {
    // Para cada gasto, criamos um novo elemento de lista <li> no JavaScript.
    const li = document.createElement('li');

    // Usamos Template Literals (crases ``) para construir o HTML de forma fácil.
    // Injetamos os dados de cada gasto (como descrição, valor, id) diretamente no HTML.
    li.innerHTML = `
      <div class="gasto-info">
        <span class="gasto-descricao">${gasto.descricao} - ${gasto.categoria} - R$ ${Number(gasto.valor).toFixed(2)}</span>
        <small class="gasto-id">ID: ${gasto.id}</small>
      </div>
      <div class="gasto-actions">
        <button class="edit-btn" data-id="${gasto.id}">✏️</button>
        <button class="delete-btn" data-id="${gasto.id}">❌</button>
      </div>
    `;

    // Aqui, guardamos o objeto 'gasto' INTEIRO como uma string no elemento <li>.
    // 'JSON.stringify' converte o objeto em texto. Isso é um "truque" útil para
    // recuperar todos os dados de um item facilmente quando formos editar.
    li.dataset.gasto = JSON.stringify(gasto);

    // Finalmente, adicionamos o <li> que acabamos de criar e preencher à lista <ul> na página.
    gastosList.appendChild(li);
  });
}

// ===================================================================================
//  4. FUNÇÃO PARA CARREGAR OS DADOS DA API (O "MENSAGEIRO")
// ===================================================================================
// 'async function' indica que esta função fará operações que podem demorar (chamar a API).
async function carregarGastos() {
  // 'await' pausa a execução da função AQUI até que 'fetchGastos()' termine
  // de buscar os dados na internet e os retorne.
  const gastos = await fetchGastos();

  // Quando os dados chegarem, chamamos nossa função "desenhista" para exibi-los.
  renderGastos(gastos);
}

// ===================================================================================
//  5. EVENTO DE SUBMISSÃO DO FORMULÁRIO (A LÓGICA DE ADICIONAR E EDITAR)
// ===================================================================================
// Adicionamos um "ouvinte" ao formulário que será acionado quando ele for submetido.
form.addEventListener('submit', async (e) => {
  // 'e.preventDefault()' é ESSENCIAL. Impede que a página recarregue, que é o
  // comportamento padrão de um formulário. Assim, o JavaScript assume o controle.
  e.preventDefault();

  // Verificamos o valor do nosso input escondido.
  const id = gastoIdInput.value;

  // Criamos um objeto com os dados atuais do formulário.
  // 'parseFloat' converte o texto do input de valor para um número decimal.
  const gastoData = {
    descricao: descricaoInput.value,
    valor: parseFloat(valorInput.value),
    categoria: categoriaInput.value,
  };

  // Lógica principal: se o input escondido 'gastoIdInput' tiver um ID,
  // significa que estamos EDITANDO. Se estiver vazio, estamos ADICIONANDO.
  if (id) {
    // Modo EDIÇÃO: Chamamos a função de atualizar, passando o ID e os novos dados.
    await updateGasto(id, gastoData);
    submitButton.textContent = 'Adicionar'; // Voltamos o texto do botão para o padrão.
  } else {
    // Modo ADIÇÃO: Chamamos a função de adicionar com os dados do formulário.
    await addGasto(gastoData);
  }

  // Após adicionar ou editar, limpamos o formulário.
  form.reset();
  // Limpamos também nosso input escondido para garantir que a próxima ação seja de ADICIONAR.
  gastoIdInput.value = '';
  // Recarregamos a lista da tela para mostrar as atualizações.
  carregarGastos();
});

// ===================================================================================
//  6. EVENTO DE CLIQUE NA LISTA (DELEGAÇÃO DE EVENTOS PARA EDITAR E DELETAR)
// ===================================================================================
// Esta é uma técnica poderosa chamada "Delegação de Eventos". Em vez de colocar um
// "ouvinte" em CADA botão (o que seria ineficiente), colocamos UM SÓ na lista pai (<ul>).
// Ele "ouve" todos os cliques que acontecem dentro dele.
gastosList.addEventListener('click', async (e) => {
  // 'e.target' nos diz exatamente qual elemento foi clicado (o botão, o ícone, o texto...).
  const target = e.target;

  // --- Lógica para DELETAR ---
  // Verificamos se o elemento clicado tem a classe 'delete-btn'.
  if (target.classList.contains('delete-btn')) {
    // Pegamos o ID que guardamos no atributo 'data-id' do botão.
    const id = target.dataset.id;
    // Pedimos uma confirmação do usuário para evitar deleções acidentais.
    const confirmDelete = confirm('Tem certeza que deseja deletar este gasto?');
    if (confirmDelete) {
      await deleteGasto(id); // Chamamos a função de deletar.
      carregarGastos();     // Recarregamos a lista para refletir a remoção.
    }
  }

  // --- Lógica para EDITAR ---
  // Verificamos se o elemento clicado tem a classe 'edit-btn'.
  if (target.classList.contains('edit-btn')) {
    // 'closest('li')' encontra o elemento <li> pai mais próximo do botão clicado.
    const li = target.closest('li');
    // Recuperamos a string do objeto 'gasto' que guardamos no 'li' e a
    // transformamos de volta em um objeto JavaScript com 'JSON.parse'.
    const gasto = JSON.parse(li.dataset.gasto);

    // Agora, preenchemos o formulário com os dados do gasto que queremos editar.
    gastoIdInput.value = gasto.id; // O mais importante: colocamos o ID no input escondido!
    descricaoInput.value = gasto.descricao;
    valorInput.value = gasto.valor;
    categoriaInput.value = gasto.categoria;

    // Mudamos o texto do botão para deixar claro que o usuário está em "modo de edição".
    submitButton.textContent = 'Atualizar';
    // 'focus()' coloca o cursor piscando no campo de descrição, melhorando a usabilidade.
    descricaoInput.focus();
  }
});

// ===================================================================================
//  7. EXECUÇÃO INICIAL (O PONTO DE PARTIDA)
// ===================================================================================
// Esta é a linha que inicia tudo! Assim que a página carrega e o script é lido,
// chamamos 'carregarGastos()' pela primeira vez para buscar os dados e popular a lista.
carregarGastos();