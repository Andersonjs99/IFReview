// src/lib/server/db.ts
import mysql from 'mysql2/promise';

// Configuração simplificada para testes
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Substitua pelo seu usuário
  password: '',          // Sua senha (vazia para teste local)
  database: 'ifreview_svelte'    // Nome do banco criado
});

// Exporta diretamente a conexão
export const db = {
  query: async (sql: string, params?: any[]) => {
    const [rows] = await (await connection).query(sql, params);
    return rows;
  }
};