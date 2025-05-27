# API Sistema Bancário - V004
A evolução da minha API bancária. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldos e visualização de histórico de transações. Nesta versão, foi implementada proteção CORS para garantir segurança no acesso à API, permitindo que somente frontends autorizados consumam os dados.

## 🚀 Novas Tecnologias Utilizadas
- CORS – Controle de acesso baseado em domínio;

## 📌 Novas Funcionalidades
- CORS configurado para liberar apenas domínios autorizados;
- Restrições para métodos HTTP permitidos via CORS (GET e POST);

## 🧠 Novos Aprendizados
- Implementação e testes práticos do CORS para segurança da API;
- Como configurar o CORS no Express para aceitar apenas origens específicas;
- Entendimento da importância do CORS na prevenção de ataques do tipo Cross-Site Request Forgery (CSRF);

## 🧪 Caso Queira Testar
- Acredito que basta abrir o terminal e digitar:
```bash
git clone https://github.com/Leayxz/APISistemaBancario.git
docker compose up --build
```
- E no navegador: localhost:3000
- Para testar o CORS, rode um frontend separado na porta 2000 e tente acessar a API.