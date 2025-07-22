// services/get.js
import { API_URL } from '../api.js';

export async function fetchGastos() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) throw new Error('Erro ao buscar gastos');
    return await response.json();
  } catch (error) {
    console.error('Falha em fetchGastos:', error);
    return []; 
  }
}