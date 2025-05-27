import {Pool} from "pg"
import "dotenv/config"

export const conexao = new Pool({
    host: "db",
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

/////////////////// CRIAÇÃO DAS TABELAS ///////////////////

async function criarTabela() {
    await conexao.query(`
        CREATE TABLE IF NOT EXISTS Clientes (
        id SERIAL PRIMARY KEY,
        nome TEXT,
        cpf TEXT,
        email TEXT,
        numerodaconta TEXT UNIQUE,
        senha TEXT)`);

    await conexao.query(`
        CREATE TABLE IF NOT EXISTS transacoes (
        id SERIAL PRIMARY KEY,
        id_cliente INTEGER,
        deposito INTEGER,
        saque INTEGER,
        FOREIGN KEY (id_cliente) REFERENCES Clientes (id)
    )`);
}

criarTabela();