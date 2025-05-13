const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const servidor = express();
const db = new sqlite3.Database("./bancoSQLITE.db");
servidor.use(express.urlencoded({extended: true}));
servidor.use(express.json());
let clienteLogadoId = null;

/////////////////// CRIAÇÃO DO CLIENTE ///////////////////

db.run(`CREATE TABLE IF NOT EXISTS Clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cpf TEXT,
    email TEXT,
    numerodaconta TEXT,
    senha TEXT)`);

servidor.get("/", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "criarcliente.html"));
});

servidor.post("/", async (requisicao, resposta) => {
    const {nome, cpf, email, numerodaconta, senha} = requisicao.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    db.run(`INSERT INTO Clientes (nome, cpf, email, numerodaconta, senha) VALUES (?, ?, ?, ?, ?)`, [nome, cpf, email, numerodaconta, senhaHash], (erro) => {
        if (erro) {
            resposta.status(500).send("ERRO AO CADASTRAR!");
        } else {
            resposta.send("<h1> Cadastrado Com Sucesso! <h1>");
        }
    });
});

/////////////////// LOGIN DO CLIENTE ///////////////////

servidor.get("/login", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "login.html"));
});

servidor.post("/loginid", (requisicao, resposta) => {
    const {numerodaconta, senha} = requisicao.body;

    db.get("SELECT * FROM Clientes WHERE numerodaconta = ?", [numerodaconta], async (erro, dados) => {
        if (erro) {
           return resposta.status(500).send("Erro! Ao Consultar Banco De Dados!");
        } if (!dados) {
            return resposta.status(401).send("Número Da Conta Inválido!");
        }

        const senhaCerta = await bcrypt.compare(senha, dados.senha);

        if (!senhaCerta) {
            return resposta.status(401).send("Senha Não Confere!");
        } else {
            clienteLogadoId = dados.id
            resposta.sendFile(path.join(__dirname, "depositosaque.html"));
        }
    });
});

/////////////////// DEPÓSITOS ///////////////////

db.run(`CREATE TABLE IF NOT EXISTS transacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientid INTEGER,
    deposito INTEGER,
    saque INTEGER,
    FOREIGN KEY (clientid) REFERENCES Clientes (id)
)`);

servidor.post("/depositos", (requisicao, resposta) => {
    let {deposito} = requisicao.body;

    if (!clienteLogadoId) {
        return resposta.status(401).send("Cliente Não Logado!");
    }

    deposito = deposito.replace(",", ".");
    const depositoFloat = parseFloat(deposito);
    const depositoReal = Math.round(depositoFloat * 100);

    db.run("INSERT INTO transacoes (clientid, deposito, saque) VALUES (?, ?, ?)", [clienteLogadoId, depositoReal, 0], (erro, dados) => {
        if (erro) {
            return resposta.status(500).send("Erro! Ao Inserir Dados!");
        } else {
            resposta.sendFile(path.join(__dirname, "depositosaque.html"));
        }
    });
});

/////////////////// SAQUES ///////////////////

servidor.post("/saques", (requisicao, resposta) => {
    let {sacar} = requisicao.body;

    sacar = sacar.replace(",", ".");
    const saqueFloat = parseFloat(sacar);
    const sacarReal = Math.round(saqueFloat * 100);

    if (!clienteLogadoId) {
        return resposta.status(401).send("Cliente Não Logado!")
    }

    db.run("INSERT INTO transacoes (clientid, saque, deposito) VALUES (?, ?, ?)", [clienteLogadoId, sacarReal, 0], (erro, dados) => {
        if (erro) {
            resposta.status(500).send("Erro No INSERT!");
        } else {
            resposta.sendFile(path.join(__dirname, "depositosaque.html"));
        }
    });
});

/////////////////// VER HISTÓRICO ///////////////////

servidor.post("/vertransacoes", (requisicao, resposta) => {
    db.all("SELECT deposito / 100.0 AS deposito, saque / 100.0 AS saque FROM transacoes WHERE clientid = ?", [clienteLogadoId], (erro, dados) => {
        if (erro) {
            resposta.status(500).send("Erro Ao Pegar Dados");
        } else {
            resposta.json(dados);
        }
    });
});

/////////////////// VER SALDO ATUAL ///////////////////

servidor.post("/saldoatual", (requisicao, resposta) => {
    db.get("SELECT SUM(deposito) - SUM(saque) AS saldo FROM transacoes WHERE clientid = ?", [clienteLogadoId], (erro, dados) => {
        if (erro) {
            resposta.status(500).send("Erro Ao Pegar Dados!");
        } else {
            resposta.json({saldo: (dados.saldo / 100)});
        }
    });
});

servidor.listen(3000, console.log("Servidor Rodando!"));
