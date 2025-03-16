const {test: base, expect} = require('@playwright/test'); 

const { LandingPage } = require('../pages/LandingPage'); //importa a classe LandingPage do arquivo LandingPage.js
const { LoginPage } = require('../pages/LoginPage'); //importa a classe LoginPage do arquivo LoginPage.js
const { Components } = require('../pages/Components'); //importa a classe Components do arquivo Components.js
const { MoviesPage } = require('../pages/MoviesPage'); //importa a classe MoviesPage do arquivo MoviesPage.js

// Criando novo contexto test customizado herdando do test base do Playwright
// Este novo contexto test será utilizado para instanciar as classes de Page Objects e disponibilizar para os testes
const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page,
            landingPage: new LandingPage(page), //instancia a classe LandingPage
            loginPage: new LoginPage(page), //instancia a classe LoginPage
            components: new Components(page), //instancia a classe Components
            moviesPage: new MoviesPage(page) //instancia a classe MoviesPage
        });
    }
})

export {test, expect};
