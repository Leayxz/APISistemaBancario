# API Sistema Bancário - V005
A evolução da minha API bancária. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldos e visualização de histórico de transações. Nesta versão, foram implementadas práticas de segurança contra ataques XSS e melhorias no gerenciamento de sessões com cookies e tokens JWT.

## 🚀 Novas Tecnologias Utilizadas
- Nenhuma, apenas reforço de segurança com as já aprendidas;

## 📌 Novas Funcionalidades
- Nomes de usuários cadastrado individualizados pós login;
- Limpeza de cookies antigos antes de definir novos, evitando vazamento de dados entre sessões;
- Proteção contra XSS ao evitar innerHTML, utilizando textContent e decodeURIComponent;

## 🧠 Novos Aprendizados
- Proteção contra Cross-Site Scripting (XSS);
- .textContent ao invés de innerHTML;
- encodeURIComponent() para URLs seguras;
- Validação e limpeza de cookies de entradas do usuário;
- Leituras com document.cookie;
- Extração de valores com .split() e .find(startsWith());

## 🧪 Caso Queira Testar
- Acredito que basta abrir o terminal e digitar:
```bash
git clone https://github.com/Leayxz/APISistemaBancario.git
docker compose up --build
```
- E no navegador: localhost:3000
- Para testar o CORS, rode um frontend separado na porta 2000 e tente acessar a API.