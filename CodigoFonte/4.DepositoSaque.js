import path from "path";
import { servidor } from "./1.Servidor.js";
import { conexao } from "./6.DB.js";
import { fileURLToPath } from "url";
import { middleware } from "./7.JWT.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/////////////////// DEPÓSITOS ///////////////////

servidor.post("/user/depositos", middleware, async function (requisicao, resposta) {

    let {deposito} = requisicao.body;
    deposito = deposito.replace(",", ".");
    const depositoFloat = parseFloat(deposito);
    const depositoReal = Math.round(depositoFloat * 100);

    const {id} = requisicao.cookieUsuario;
    await conexao.query("INSERT INTO transacoes (id_cliente, deposito, saque) VALUES ($1, $2, $3)", [id, depositoReal, 0]);

    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});

/////////////////// SAQUES ///////////////////

servidor.post("/user/saques", middleware, async function (requisicao, resposta) {
    
    let {sacar} = requisicao.body;
    sacar = sacar.replace(",", ".");
    const saqueFloat = parseFloat(sacar);
    const sacarReal = Math.round(saqueFloat * 100);

    const {id} = requisicao.cookieUsuario;
    await conexao.query("INSERT INTO transacoes (id_cliente, saque, deposito) VALUES ($1, $2, $3)", [id, sacarReal, 0]);

    return resposta.sendFile(path.join(__dirname, "../FrontEnd/3.DepositoSaque.html"));
});
