import { servidor } from "./1.Servidor.js";
import { conexao } from "./6.DB.js"
import { clienteLogadoId } from "./3.CadastroLogin.js";

/////////////////// VER HISTÓRICO ///////////////////

servidor.post("/vertransacoes", async function (requisicao, resposta) {
    const dados = await conexao.query("SELECT (deposito / 100.0)::numeric(10,2) AS deposito, (saque / 100.0)::numeric(10,2) AS saque FROM transacoes WHERE id_cliente = $1", [clienteLogadoId]);
    return resposta.json(dados.rows);
});

/////////////////// VER SALDO ATUAL ///////////////////

servidor.post("/saldoatual", async function (requisicao, resposta) {
    const dados = await conexao.query("SELECT ((SUM(deposito) - SUM(saque)) / 100.0)::decimal(10,2) AS saldo FROM transacoes WHERE id_cliente = $1", [clienteLogadoId]);
    return resposta.json(dados.rows[0]);
});
