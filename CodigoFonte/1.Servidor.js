// INSTANCIANDO SERVIDOR E CONFIGURANDO PRA RECEBER REQUISIÇÃO POST E COOKIE
import express from "express";
import cookieParser from "cookie-parser";

export const servidor = express();

servidor.use(express.urlencoded({ extended:true }));
servidor.use(cookieParser());