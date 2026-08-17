import axios from 'axios';

// ATENÇÃO PARA O IP:
// - Se estiver testando no emulador Android do Android Studio: use 'http://10.0.2.2:8080'
// - Se estiver testando no celular físico via Expo Go: use o IP da sua máquina na rede local (ex: 'http://192.168.1.15:8080')
// - Se o servidor Spring Boot rodar em outra porta (ex: 8080 ou 3000), ajuste a porta abaixo.

export const api = axios.create({
  baseURL: 'http://10.0.0.151:8080', // Substitua pelo seu IP local e porta do Spring Boot
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});