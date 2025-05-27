# API Sistema Bancário - V003
A evolução da minha API bancária. Ela permite o cadastro de clientes, login, depósitos, saques, consulta de saldos e visualização de histórico de transações. Nesta versão, implementei validação robusta dos dados e controle de unicidade do número da conta no banco de dados.

## 🚀 Novas Tecnologias Utilizadas
- **Joi** – Validação de dados recebidos no backend;
- **HTML5 & Regex** – Validação básica e restrição de inputs no frontend;
- **Modularização** – Separação da lógica de validação em arquivo dedicado;

## 📌 Novas Funcionalidades
- Formulário com validação usando regex e atributos HTML pattern, maxlength, required;
- Backend que valida os dados recebidos com Joi, garantindo formato, presença e padrões específicos;
- Uso de regex customizado para validar nomes compostos, emails e números;
- Tratamento de espaços em branco no início e fim dos campos com .trim() no Joi;
- Consulta no banco para evitar duplicidade do número da conta, retornando erro caso já exista;
- Modularização da validação para facilitar manutenção e clareza do código;

## 🧠 Novos Aprendizados
- Validação dupla para garantir segurança, validando sempre no frontend e no backend, evitando dados inválidos ou maliciosos;
- Regex personalizado para validar padrões específicos e impedir inputs mal formatados;
- Uso combinado de .trim() + regex no Joi para limpeza e validação rigorosa dos dados no backend;
- Consulta de unicidade no banco para prevenir dados duplicados como número de conta;

## 🧪 Caso Queira Testar
- Acredito que basta abrir o terminal e digitar:
```bash
git clone https://github.com/Leayxz/APISistemaBancario.git
docker compose up --build
```
- E no navegador: localhost:3000