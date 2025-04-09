// Login não foi alterado para usar o novo contexto test customizado para mostrar o uso tanto com o contexto padrão do Playwright quanto com o contexto customizado:

const { test, expect } = require('@playwright/test'); //importa a função test do Playwright
const { Login } = require('../support/actions/Login'); //importa a classe login do arquivo login.js
const { Components } = require('../support/actions/Components'); //importa a classe Components do arquivo Components.js

let login;
let components;

test.beforeEach(({ page }) => {
    login = new Login(page); //instancia a classe login
    components = new Components(page); //instancia a classe Components
});

test('deve logar como administrador', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm(process.env.USER_ADMIN, process.env.USER_ADMIN_PASSWORD);
    await login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm('admin@zombieplus.com', 'abc123'); //chama o método submitLoginForm da classe login
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await components.popUpHaveText(message); //chama o método toastContainText da classe login
});

test('não deve logar quando o email é inválido ', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm('www.albert.com.br', 'abc123'); //chama o método submitLoginForm da classe login
    await components.alertHaveText('Email incorreto'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm('', 'abc123'); //chama o método submitLoginForm da classe login
    await components.alertHaveText('Campo obrigatório'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm('', 'abc123'); //chama o método submitLoginForm da classe login
    await components.alertHaveText('Campo obrigatório'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando nenhum campo é preenchida', async ({ page }) => {
    await login.visit(); //chama o método visit da classe login
    await login.submitLoginForm('', ''); //chama o método submitLoginForm da classe login
    await components.alertHaveText(['Campo obrigatório', 'Campo obrigatório']); //chama o método alertHaveText da classe Components
});