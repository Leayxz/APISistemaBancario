# API Sistema Bancário - V002
A evolução da minha API bancária. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldos e visualização de histórico de transações. Nesta versão, implementei autenticação com JWT, cookies HTTP-only e proteção de rotas com middleware personalizado, garantindo segurança para múltiplos usuários simultaneamente.

## 🚀 Novas Tecnologias Utilizadas
- **JWT - jsonwebtoken** – Autenticação via token;
- **cookie-parser** – Leitura de cookies para autenticação persistente;
- **Git & GitHub** – Controle de versão com branches e commits claros, demonstrando evolução contínua do projeto;

## 📌 Novas Funcionalidades
- Login autenticado com geração de token JWT e limite de tempo;
- Armazenamento seguro do token em cookies HTTP-only (Inacessível via JS);
- Middleware para proteção de rotas (Verificando o token);
- Redirecionamento de usuários logados para página protegida;
- Suporte a múltiplos usuários autenticados simultaneamente;

## 🧠 Novos Aprendizados
- Autenticação com JWT + cookies;
- Uso real de cookies HTTP-only para autenticação persistente;
- Implementação do JWT com controle de acesso por sessão;
- Criação de middleware para proteger rotas;

## 🧪 Caso Queira Testar
- Acredito que basta abrir o terminal e digitar:
```bash
git clone https://github.com/Leayxz/APISistemaBancario.git
docker compose up --build
```
- E no navegador: localhost:3000