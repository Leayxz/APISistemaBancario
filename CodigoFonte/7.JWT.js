import jwt from "jsonwebtoken";

/////////////////// GERAR TOKEN ///////////////////

const JWT_SECRET = "teste";
const JWT_EXPIRES_IN = "1h";

export function gerarToken(dados) {
    return jwt.sign(dados, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

export function verificarToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

/////////////////// MIDDLEWARE PRA VERIFICAR O HEADERS ///////////////////

export function middleware(requisicao, resposta, next) {

    const token = requisicao.cookies.token;
    const dadosUsuario = verificarToken(token);
    requisicao.cookieUsuario = dadosUsuario;
    
    next();
}
