const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // troque se necessário
  database: 'cadastro_aluno'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco:', err);
    return;
  }

  console.log('✅ Conectado ao MySQL');

  // Cria tabela de usuários
  db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(100) NOT NULL
    )
  `);

  // Cria tabela de alunos
  db.query(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      idade INT NOT NULL,
      turma VARCHAR(50) NOT NULL,
      data_cadastro DATETIME NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);
});

// Cadastro de usuário
app.post('/api/register', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro ao fazer login' });
      if (results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

      res.status(200).json({ user: results[0] });
    }
  );
});

// Cadastro de aluno
app.post('/alunos', (req, res) => {
  const { usuario_id, nome, email, idade, turma, data_cadastro } = req.body;

  if (!usuario_id || !nome || !email || !idade || !turma || !data_cadastro) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query(
    'INSERT INTO alunos (usuario_id, nome, email, idade, turma, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)',
    [usuario_id, nome, email, idade, turma, data_cadastro],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar aluno' });
      res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
    }
  );
});

// Listar alunos por usuário
app.get('/alunos/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  db.query(
    'SELECT * FROM alunos WHERE usuario_id = ? ORDER BY data_cadastro DESC',
    [usuario_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar alunos' });
      res.status(200).json(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
