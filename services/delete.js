// services/delete.js
import { API_URL } from '../api.js';
console.log("appiiii",API_URL);


export async function deleteGasto(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    console.log('id',id);
    
    if (!response.ok) throw new Error('Erro ao deletar gasto');
    // DELETE não costuma retornar corpo, então apenas confirmamos o sucesso
    return { success: true }; 
  } catch (error) {
    console.error('Falha em deleteGasto:', error);
  }
}