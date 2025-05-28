import bcrypt from "bcrypt";
import path from "path";
import {servidor} from "./1.Servidor.js";
import {conexao} from "./6.DB.js";
import {fileURLToPath} from "url";
import {gerarToken} from "./7.JWT.js";
import {validar} from "./8.ValidarDados.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////// CRIAÇÃO DO CLIENTE ///////////////////

servidor.get("/", function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, "../FrontEnd/1.Inicial.html"));
});

servidor.post("/", async function (requisicao, resposta) {

    let {nome, cpf, email, numerodaconta, senha} = requisicao.body;

    const {error} = validar({ nome, cpf, email, numerodaconta, senha});
    if (error) {return resposta.send("Erro Nos Dados: Verifique e Tente Novamente! <br> Verifique Se Digitou Um E-mail Válido!");}

    const verificarConta = await conexao.query("SELECT * FROM Clientes WHERE numerodaconta = $1", [numerodaconta])
    if (verificarConta.rows.length > 0) {return resposta.send("Número De Conta Já Existe. Tente Novamente!")}
    const senhaHash = await bcrypt.hash(senha, 10);

    await conexao.query(`INSERT INTO Clientes (nome, cpf, email, numerodaconta, senha) VALUES ($1, $2, $3, $4, $5)`, [nome, cpf, email, numerodaconta, senhaHash]);
    resposta.status(201).send("<h1> Cadastrado Com Sucesso! <h1>");
});

/////////////////// LOGIN DO CLIENTE ///////////////////

servidor.get("/login", function (requisicao, resposta) {
    return resposta.sendFile(path.join(__dirname, "../FrontEnd/2.Login.html"));
});

servidor.post("/user/logado", async function (requisicao, resposta) {
    const { nome, numerodaconta, senha } = requisicao.body;

    const dados = await conexao.query("SELECT * FROM Clientes WHERE numerodaconta = $1", [numerodaconta]);
    if (!dados.rows.length) {return resposta.send("Número Da Conta Não Encontrado! Não Esqueça De Se Cadastrar!");}
    const senhaCerta = await bcrypt.compare(senha, dados.rows[0].senha);
    if (!senhaCerta) {return resposta.send("Encontramos Sua Conta, Mas Não Sua Senha! Esqueceu Sua Senha?");}
 
    const token = gerarToken({id: dados.rows[0].id});
    resposta.cookie("token", token, {httpOnly: true, path: "/user/" , maxAge: 3600000});
    resposta.clearCookie("nome", {path: "/user/"});
    resposta.cookie("nome", dados.rows[0].nome, {path: "/user/", maxAge: 3600000});

    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});
