import bcrypt from "bcrypt";
import path from "path";
import { servidor } from "./1.Servidor.js";
import { conexao } from "./6.DB.js";
import { fileURLToPath } from "url";
import { gerarToken } from "./7.JWT.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////// CRIAÇÃO DO CLIENTE ///////////////////

servidor.get("/", function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, "../FrontEnd/1.Inicial.html"));
});

servidor.post("/", async function (requisicao, resposta) {

    const {nome, cpf, email, numerodaconta, senha} = requisicao.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    await conexao.query(`INSERT INTO Clientes (nome, cpf, email, numerodaconta, senha) VALUES ($1, $2, $3, $4, $5)`, [nome, cpf, email, numerodaconta, senhaHash]);
    resposta.status(201).send("<h1> Cadastrado Com Sucesso! <h1>");
});

/////////////////// LOGIN DO CLIENTE ///////////////////

servidor.get("/login", function (requisicao, resposta) {
    return resposta.sendFile(path.join(__dirname, "../FrontEnd/2.Login.html"));
});

servidor.post("/user/logado", async function (requisicao, resposta) {
    const { numerodaconta, senha } = requisicao.body;

    const dados = await conexao.query("SELECT * FROM Clientes WHERE numerodaconta = $1", [numerodaconta]);
    if (!dados.rows.length) {resposta.send("Número Da Conta Não Encontrado! Não Esqueça De Se Cadastrar!");}
    const senhaCerta = await bcrypt.compare(senha, dados.rows[0].senha);
    if (!senhaCerta) {resposta.send("Encontramos Sua Conta, Mas Não Sua Senha! Esqueceu Sua Senha?");}
 
    const token = gerarToken({id: dados.rows[0].id});
    resposta.cookie("token", token, {httpOnly: true, path: "/user/" , maxAge: 3600000});

    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});
