// INICIANDO O SERVIDOR E IMPORTANDO TODA A API

import { servidor } from "./1.Servidor.js";

import "./3.CadastroLogin.js";
import "./4.DepositoSaque.js";
import "./5.HistoricoSaldo.js";

servidor.listen(3000, console.log("Servidor Rodando!"));
