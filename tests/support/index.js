const {test: base, expect} = require('@playwright/test'); 

const { Leads } = require('./actions/Leads'); //importa a classe LandingPage do arquivo LandingPage.js
const { Login } = require('./actions/Login'); //importa a classe LoginPage do arquivo LoginPage.js
const { Components } = require('./actions/Components'); //importa a classe Components do arquivo Components.js
const { Movies } = require('./actions/Movies'); //importa a classe MoviesPage do arquivo MoviesPage.js
const { Api } = require('./api'); //importa a classe Api do arquivo api.js

// Criando novo contexto test customizado herdando do test base do Playwright
// Este novo contexto test será utilizado para instanciar as classes de Page Objects e disponibilizar para os testes
const test = base.extend({
    page: async ({page}, use) => {
        
        const context = page        
        context['leads'] = new Leads(page), //instancia a classe LandingPage
        context['login'] = new Login(page), //instancia a classe LoginPage
        context['components'] = new Components(page), //instancia a classe Components
        context['movies'] = new Movies(page) //instancia a classe MoviesPage
        await use(context) //disponibiliza o contexto para os testes
    },
    request: async ({request}, use) => {
        const context = request
        context['api'] = new Api(request) //instancia a classe Api passando o request como parâmetro
        await context['api'].setToken(process.env.USER_ADMIN, process.env.USER_ADMIN_PASSWORD);
        await use(context) //disponibiliza o contexto para os testes
    }
})

export {test, expect};
