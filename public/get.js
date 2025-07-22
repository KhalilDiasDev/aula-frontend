async function carregarGastos() {
  const res = await fetch("http://localhost:3000/api/gastos");
  const dados = await res.json();
  const lista = document.getElementById("gastos-list");
  lista.innerHTML = "";
  dados.forEach(gasto => {
    const li = document.createElement("li");
    li.innerHTML = `\${gasto.descricao} - R$ \${gasto.valor.toFixed(2)} (\${gasto.categoria})
      <button onclick="editarGasto(\${gasto.id})">✏️</button>
      <button onclick="deletarGasto(\${gasto.id})">🗑️</button>`;
    lista.appendChild(li);
  });
}
carregarGastos();