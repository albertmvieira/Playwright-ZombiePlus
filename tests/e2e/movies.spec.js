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

test('deve poder cadastrar um novo filme', async ({page}) => {
    await loginPage.visit(); //chama o método visit da classe LoginPage
    await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123'); //chama o método submitLoginForm da classe LoginPage
    await moviesPage.isLoggedIn(); //chama o método isLoggedIn da classe LoginPage

    await moviesPage.createMovie('Filme 1', 'Sinopse do filme 1', 'Sony Pictures', '2021');
})
