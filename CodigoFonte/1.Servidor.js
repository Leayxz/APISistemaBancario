// INSTANCIANDO SERVIDOR E CONFIGURANDO PRA RECEBER REQUISIÇÃO POST E COOKIE
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const servidor = express();

servidor.use(cors({origin: "http://localhost:3000", credentials: true, methods: ["GET", "POST"]}));
servidor.use(express.urlencoded({ extended:true }));
servidor.use(cookieParser());