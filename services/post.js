// services/post.js
import { API_URL } from '../api.js';

export async function addGasto(gasto) {
  try {
    const response = await fetch(`${API_URL}/api/gastos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasto),
    });
    if (!response.ok) throw new Error('Erro ao adicionar gasto');
    return await response.json();
  } catch (error) {
    console.error('Falha em addGasto:', error);
  }
}