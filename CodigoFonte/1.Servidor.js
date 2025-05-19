// INSTANCIANDO EXPRESS, SERVIDOR E CONFIGURANDO PRA RECEBER REQUISIÇÃO POST POR URL

import express from "express";

export const servidor = express();
servidor.use(express.urlencoded({ extended:true }));
