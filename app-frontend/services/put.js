// services/put.js
import { API_URL } from '../api.js';

export async function updateGasto(id, gasto) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasto),
    });
    if (!response.ok) throw new Error('Erro ao atualizar gasto');
    return await response.json();
  } catch (error) {
    console.error('Falha em updateGasto:', error);
  }
}