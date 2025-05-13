# 1ª API: Sistema Bancário
Esse é meu primeiro projeto: Uma API bancária simples. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldo e visualização de histórico de transações. Além disso, esse é meu primeiro contato prático com Git, GitHub e versionamento de código.


## 🚀 Tecnologias Utilizadas
- **Node.js** – Ambiente de execução JavaScript;
- **Express** – Framework web para criação da API;
- **SQLite3** – Banco de dados leve e embutido;
- **bcrypt** – Para hash e verificação segura de senhas;
- **HTML** – Formulários simples para interação;

## 📌 Funcionalidades
- Cadastro de clientes com hash de senha usando bcrypt;
- Login com validação;
- Depósitos e saques com suporte a valores com ponto ou vírgula;
- Armazenamento de transações com precisão em centavos, evitando erros de arredondamento;
- Visualização de saldo atual individual por cliente;
- Histórico completo de transações individualizado por cliente;

## 🧠 Aprendizados
- Criptografia de senhas com bcrypt;
- Manipulação segura de valores monetários em JavaScript;
- Interação entre backend, banco de dados com SQLite, e HTML;
- Estruturação de rotas e lógica RESTful com Express;
- Boas práticas de modelagem de banco de dados e tabelas;
