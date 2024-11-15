const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Configuração do Pool de Conexões
const pool = new Pool({
    user: 'seu_usuario', // Normalmente 'postgres'
    host: 'localhost',
    database: 'meu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Endpoint para registrar um usuário
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Hash a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: result.rows[0] });
    } catch (error) {
        console.error('Erro ao registrar:', error);
        res.status(500).json({ message: 'Erro ao registrar. Tente novamente.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});