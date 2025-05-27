import Joi from "joi"

const validarDados = Joi.object({

    nome: Joi.string().trim().pattern(/^[A-Za-zÀ-ú]+( [A-Za-zÀ-ú]+)*$/).max(100).required(),
    
    cpf: Joi.string().trim().pattern(/^\d{11}$/).max(11).required(),
    
    email: Joi.string().trim().email().required(),
    
    numerodaconta: Joi.string().trim().pattern(/^\d{6}$/).max(6).required(),
    
    senha: Joi.string().trim().pattern(/^\d{4}$/).max(4).required(),
});

export function validar(dados) {
    return validarDados.validate(dados);
}
