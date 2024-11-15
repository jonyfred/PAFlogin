const { Pool } = require('pg');

// Configurações de conexão
const pool = new Pool({
    user: 'seu_usuario',      // Seu nome de usuário do PostgreSQL
    host: 'localhost',        // Ou o endereço do seu servidor
    database: 'seu_banco',    // Nome do seu banco de dados
    password: 'sua_senha',     // Sua senha do PostgreSQL
    port: 5432,               // Porta padrão do PostgreSQL
});

// Função para conectar ao banco de dados
const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Conectado ao banco de dados!");
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
};

module.exports = { pool, connectDB };