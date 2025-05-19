import bcrypt from "bcrypt";
import path from "path";
import { servidor } from "./1.Servidor.js";
import { conexao } from "./6.DB.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////// CRIAÇÃO DO CLIENTE ///////////////////

servidor.get("/", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "../FrontEnd/1.Inicial.html"));
});

servidor.post("/", async function (requisicao, resposta) {
    const {nome, cpf, email, numerodaconta, senha} = requisicao.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    await conexao.query(`
        INSERT INTO Clientes (nome, cpf, email, numerodaconta, senha)
        VALUES ($1, $2, $3, $4, $5)`,
        [nome, cpf, email, numerodaconta, senhaHash]);
    resposta.status(201).send("<h1> Cadastrado Com Sucesso! <h1>");
});

/////////////////// LOGIN DO CLIENTE ///////////////////

export let clienteLogadoId = null;

servidor.get("/login", (requisicao, resposta) => {
    return resposta.sendFile(path.join(__dirname, "../FrontEnd/2.Login.html"));
});

servidor.post("/loginid", async function (requisicao, resposta) {
    const {numerodaconta, senha} = requisicao.body;

    const dados = await conexao.query("SELECT * FROM Clientes WHERE numerodaconta = $1", [numerodaconta]);
    if (!dados.rows.length) {
        return resposta.send("Senha Não Está Cadastrada!")
    }
    
    const senhaCerta = await bcrypt.compare(senha, dados.rows[0].senha);
    if (!senhaCerta) {
        return resposta.status(401).send("Senha Não Confere!");
    } else {
        clienteLogadoId = dados.rows[0].id;
        return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
    }
});
