const { test } = require('../support'); //importa a função test do arquivo support/index.js

const data = require('../support/fixtures/movies.json'); //importa o arquivo movies.json
const { executeSql } = require('../support/database'); //importa a função executeSql do arquivo database.js

//create a beforeeach method calling the loginAsAdmin method from the login class

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    await executeSql(`delete from movies where title = '${movie.title}';`); //chama a função executeSql passando o script SQL para deletar o filme com o título do objeto movie

    await page.login.loginAsAdmin('admin@zombieplus.com', 'pwd123', 'Admin'); //chama o método loginAsAdmin da classe login
    await page.movies.createMovie(movie); //chama o método createMovie da classe movies
    await page.components.toastContainText('Cadastro realizado com sucesso!'); //chama o método haveText da classe Components

})

test('não deve cadastrar filme com titulo duplicado', async ({ page }) => {

    const movie = data.create; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    await executeSql(`delete from movies where title = '${movie.title}';`); //chama a função executeSql passando o script SQL para deletar o filme com o título do objeto movie

    await page.login.loginAsAdmin('admin@zombieplus.com', 'pwd123', 'Admin'); //chama o método loginAsAdmin da classe login
    await page.movies.createMovie(movie); //chama o método createMovie da classe movies
    await page.components.toastContainText('Cadastro realizado com sucesso!'); //chama o método haveText da classe Components

})

test('não deve cadastrar um filme quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.loginAsAdmin('admin@zombieplus.com', 'pwd123', 'Admin'); //chama o método loginAsAdmin da classe login

    await page.movies.goForm(); //chama o método goForm da classe movies
    await page.movies.submit(); //chama o método submit da classe movies

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
})
