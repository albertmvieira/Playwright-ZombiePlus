// Login não0 foi alterado para usar o novo contexto test customizado para mostrar o uso tanto com o contexto padrão do Playwright quanto com o contexto customizado:

const { test, expect } = require('@playwright/test'); //importa a função test do Playwright


const { LoginPage } = require('../pages/LoginPage'); //importa a classe LoginPage do arquivo LoginPage.js
const { Components } = require('../pages/Components'); //importa a classe Components do arquivo Components.js
const { MoviesPage } = require('../pages/MoviesPage'); //importa a classe MoviesPage do arquivo MoviesPage.js

let loginPage;
let components;
let moviesPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page); //instancia a classe LoginPage
    components = new Components(page); //instancia a classe Components
    moviesPage = new MoviesPage(page); //instancia a classe MoviesPage
});

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123'); //chama o método submitLoginForm da classe LoginPage
    await moviesPage.isLoggedIn(); //chama o método isLoggedIn da classe LoginPage
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('admin@zombieplus.com', 'abc123'); //chama o método submitLoginForm da classe LoginPage
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await components.toastContainText(message); //chama o método toastContainText da classe LoginPage
});

test('não deve logar quando o email é inválido ', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('www.albert.com.br', 'abc123'); //chama o método submitLoginForm da classe LoginPage
    await components.alertHaveText('Email incorreto'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('', 'abc123'); //chama o método submitLoginForm da classe LoginPage
    await components.alertHaveText('Campo obrigatório'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('', 'abc123'); //chama o método submitLoginForm da classe LoginPage
    await components.alertHaveText('Campo obrigatório'); //chama o método alertHaveText da classe Components
});

test('não deve logar quando nenhum campo é preenchida', async ({ page }) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('', ''); //chama o método submitLoginForm da classe LoginPage
    await components.alertHaveText(['Campo obrigatório', 'Campo obrigatório']); //chama o método alertHaveText da classe Components
});