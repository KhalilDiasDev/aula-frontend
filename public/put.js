async function editarGasto(id) {
  const novaDescricao = prompt("Nova descrição:");
  const novoValor = parseFloat(prompt("Novo valor:"));
  const novaCategoria = prompt("Nova categoria:");

  await fetch(`http://localhost:3000/api/gastos/\${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao: novaDescricao, valor: novoValor, categoria: novaCategoria }),
  });
  carregarGastos();
}