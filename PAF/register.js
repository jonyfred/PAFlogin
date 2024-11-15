const { pool } = require('./db'); // Importa a conexão com o banco de dados
const bcrypt = require('bcrypt'); // Importa a biblioteca bcrypt

// Função para registrar um usuário
const registerUser  = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash a senha
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        console.log("Usuário registrado com sucesso:", result.rows[0]);
    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
    }
};

// Exemplo de uso da função de registro
const main = async () => {
    const username = 'usuario1'; // Substitua por dados de entrada do usuário
    const email = 'usuario1@example.com';
    const password = 'senha123';

    await registerUser (username, email, password);
};

// Chama a função principal
main();