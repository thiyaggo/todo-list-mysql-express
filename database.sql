-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS gerenciando_tarefas;
USE gerenciando_tarefas;

-- Tabela de Usuários
CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    descricao_tarefa TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES cadastro(id) ON DELETE CASCADE
);
