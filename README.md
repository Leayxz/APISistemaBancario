# API Sistema Bancário - V001
A evolução da minha API bancária. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldo e visualização de histórico de transações. Nesta versão, implementei modularização, conteinerização com Docker, e migrei para o banco de dados PostgreSQL, aprimorando a escalabilidade, manutenção e segurança do sistema.

## 🚀 Novas Tecnologias Utilizadas
- **PostgreSQL** – Banco de dados relacional robusto e confiável;
- **Docker & Docker Compose** – Conteinerização do backend e banco de dados;
- **dotenv** – Gerenciamento seguro de variáveis de ambiente;
- **ESModules** – Organização do código em múltiplos arquivos, melhorando manutenção e legibilidade;
- **Git & GitHub** – Controle de versão com branches e commits claros, demonstrando evolução contínua do projeto;

## 📌 Novas Funcionalidades
- API separada por módulos para cadastro/login, depósito/saque e histórico/saldo;
- Configuração Docker que orquestra Backend e PostgreSQL, facilitando testes e deploy;

## 🧠 Novos Aprendizados
- Modularização do código para facilitar escalabilidade e manutenção;
- Docker & Docker Compose para orquestração de containers, garantindo ambientes de desenvolvimento ou produção;
- Migração do banco SQLite para PostgreSQL, adaptando queries e criação de tabelas;
- Uso de dotenv para gerenciamento seguro das credenciais;
- Versionamento git no uso de branches para controle de versões;
- Desenvolvimento de APIs RESTful com boas práticas de nomenclatura, verbos HTTP e separação de responsabilidades;
