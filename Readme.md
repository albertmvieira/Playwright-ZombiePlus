![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído durante o curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências:
```
npm install
```

2. Executar testes em Headless:
```
npx playwright test 
```

3. Visualizar o relatório dos testes:
```
npx playwright show-report
```

## 🧪 Testes Automatizados

### Leads1.spec
Este conjunto de testes cobre o fluxo de cadastro de leads na fila de espera. Os cenários incluem:
- **Cadastro bem-sucedido de um lead**: Verifica se o sistema permite cadastrar um lead com nome e e-mail válidos.
- **Cadastro com e-mail já existente**: Garante que o sistema exibe uma mensagem de erro ao tentar cadastrar um e-mail duplicado.
- **Cadastro com e-mail inválido**: Valida que o sistema exibe um alerta ao inserir um e-mail incorreto.
- **Campos obrigatórios**: Testa se o sistema impede o cadastro quando o nome ou e-mail não são preenchidos.

### login.spec
Este conjunto de testes cobre o fluxo de autenticação de administradores. Os cenários incluem:
- **Login bem-sucedido**: Verifica se o administrador consegue acessar o sistema com credenciais válidas.
- **Senha incorreta**: Garante que o sistema exibe uma mensagem de erro ao inserir uma senha inválida.
- **E-mail inválido ou ausente**: Valida que o sistema exibe alertas apropriados ao inserir um e-mail inválido ou deixar o campo vazio.
- **Campos obrigatórios**: Testa se o sistema impede o login quando nenhum campo é preenchido.

### movies.spec
Este conjunto de testes cobre o fluxo de cadastro de filmes no sistema. Os cenários incluem:
- **Cadastro de um novo filme**: Verifica se o sistema permite cadastrar um filme com título, sinopse, produtora e ano de lançamento válidos.
- **Validação de mensagens de sucesso**: Garante que o sistema exibe uma mensagem de sucesso após o cadastro.

### series.spec
Este conjunto de testes cobre o fluxo de cadastro de séries no sistema. Os cenários incluem:
- **Cadastro de uma nova série**: Verifica se o sistema permite cadastrar uma série com título, sinopse, produtora, ano de lançamento e número de temporadas válidos.
- **Validação de mensagens de sucesso**: Garante que o sistema exibe uma mensagem de sucesso após o cadastro.
- **Campos obrigatórios**: Testa se o sistema impede o cadastro quando algum campo obrigatório não é preenchido.

Os testes utilizam dados fictícios fornecidos pelo Faker e um banco de dados PostgreSQL para validação de cenários.

## 📂 Estrutura do Projeto

- **tests/e2e**: Contém os testes de ponta a ponta, como `Leads1.spec.js`, `login.spec.js`, `movies.spec.js` e `series.spec.js`.
- **tests/actions**: Contém os arquivos que encapsulam as interações com as páginas, como `LandingActions.js`, `LoginActions.js` e `MoviesActions.js`.
- **tests/support**: Contém utilitários e configurações, como o banco de dados e o contexto de teste customizado.
  - **database.js**: Gerencia as conexões com o banco de dados PostgreSQL e executa operações como limpeza e inserção de dados para os testes.
  - **index.js**: Contém métodos auxiliares para realizar requisições HTTP, como autenticação e envio de dados via API.
  - **.env**: Arquivo que armazena variáveis de ambiente globais, como a URL base da API (`BASE_API`) e credenciais de acesso.

## 🚀 Let's Rock

- Projeto de estudo finalizado com melhorias na cobertura de teste.