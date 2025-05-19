import { servidor } from "./1.Servidor.js";
import { conexao } from "./6.DB.js";
import { clienteLogadoId } from "./3.CadastroLogin.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////// DEPÓSITOS ///////////////////

servidor.post("/depositos", async function (requisicao, resposta) {
    let {deposito} = requisicao.body;

    if (!clienteLogadoId) {
        return resposta.status(401).send("Cliente Não Logado!");
    }

    deposito = deposito.replace(",", ".");
    const depositoFloat = parseFloat(deposito);
    const depositoReal = Math.round(depositoFloat * 100);

    await conexao.query("INSERT INTO transacoes (id_cliente, deposito, saque) VALUES ($1, $2, $3)", [clienteLogadoId, depositoReal, 0]);
    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});

/////////////////// SAQUES ///////////////////

servidor.post("/saques", async function (requisicao, resposta) {
    let {sacar} = requisicao.body;

    sacar = sacar.replace(",", ".");
    const saqueFloat = parseFloat(sacar);
    const sacarReal = Math.round(saqueFloat * 100);

    if (!clienteLogadoId) {
        return resposta.status(401).send("Cliente Não Logado!")
    }

    await conexao.query("INSERT INTO transacoes (id_cliente, saque, deposito) VALUES ($1, $2, $3)", [clienteLogadoId, sacarReal, 0]);
    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});
