const { test } = require('../support'); //importa a função test do arquivo support/index.js

const data = require('../support/fixtures/movies.json'); //importa o arquivo movies.json
const { executeSql } = require('../support/database'); //importa a função executeSql do arquivo database.js


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    await executeSql(`delete from movies where title = '${movie.title}';`); //chama a função executeSql passando o script SQL para deletar o filme com o título do objeto movie

    await page.loginPage.visit(); //chama o método visit da classe LoginPage
    await page.loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123'); //chama o método submitLoginForm da classe LoginPage
    await page.moviesPage.isLoggedIn(); //chama o método isLoggedIn da classe LoginPage

    await page.moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year); //chama o método createMovie da classe MoviesPage
    await page.components.toastContainText('Cadastro realizado com sucesso!'); //chama o método haveText da classe Components

})

test('não deve cadastrar um filme quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.loginPage.visit(); //chama o método visit da classe LoginPage
    await page.loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123'); //chama o método submitLoginForm da classe LoginPage
    await page.moviesPage.isLoggedIn(); //chama o método isLoggedIn da classe LoginPage

    await page.moviesPage.goForm(); //chama o método goForm da classe MoviesPage
    await page.moviesPage.submit(); //chama o método submit da classe MoviesPage

    await page.moviesPage.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
})
