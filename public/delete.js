async function deletarGasto(id) {
  await fetch(`http://localhost:3000/api/gastos/\${id}`, {
    method: "DELETE",
  });
  carregarGastos();
}