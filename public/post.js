document.getElementById("gasto-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;

  await fetch("http://localhost:3000/api/gastos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, valor, categoria }),
  });

  document.getElementById("gasto-form").reset();
  carregarGastos();
});