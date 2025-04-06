const { test, expect } = require('../support'); //importa a função test do arquivo support/index.js

const data = require('../support/fixtures/movies.json'); //importa o arquivo movies.json
const { executeSql } = require('../support/database'); //importa a função executeSql do arquivo database.js


test.beforeAll(async () => {
    await executeSql(`DELETE from movies;`); //chama a função executeSql passando o script SQL para deletar todos os filmes do banco de dados
})

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    //comentado para não deletar o filme do banco de dados pois já está sendo deletado no beforeAll
    //await executeSql(`delete from movies where title = '${movie.title}';`); //chama a função executeSql passando o script SQL para deletar o filme com o título do objeto movie

    await page.login.loginAsAdmin('admin@zombieplus.com', 'pwd123', 'Admin'); //chama o método loginAsAdmin da classe login
    await page.movies.createMovie(movie); //chama o método createMovie da classe movies
    await page.components.popUpHaveText(`O filme '${movie.title}' foi adicionado ao catálogo.`); //chama o método haveText da classe Components

})

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove
    await request.api.postMovie(movie); //chama o método postMovie da classe Api passando o objeto movie como parâmetro
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login

    await page.movies.deleteMovie(movie.title); //chama o método deleteMovie da classe movies passando o título do filme como parâmetro
    await page.components.popUpHaveText('Filme removido com sucesso.') 

})

test('não deve cadastrar filme com titulo duplicado', async ({ page, request }) => {

    const movie = data.duplicate; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    await request.api.postMovie(movie); //chama o método postMovie da classe Api passando o objeto movie como parâmetro
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login
    await page.movies.createMovie(movie); //chama o método createMovie da classe movies
    await page.components.popUpHaveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`); //chama o método haveText da classe Components

})

test('não deve cadastrar um filme quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.loginAsAdmin('admin@zombieplus.com', 'pwd123', 'Admin'); //chama o método loginAsAdmin da classe login

    await page.movies.goForm(); //chama o método goForm da classe movies
    await page.movies.submit(); //chama o método submit da classe movies

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]);
})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search; //cria uma constante movies que recebe o objeto search do arquivo movies.json
    movies.data.forEach(async (movie) => {
        await request.api.postMovie(movie); //chama o método postMovie da classe Api passando o objeto movie como parâmetro
    })
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login
    await page.movies.searchMovie(movies.input); //chama o método searchMovie da classe movies passando o termo de input como parâmetro
    await page.movies.tableHaveContent(movies.output); //chama o método tableHaveContent da classe movies passando o termo de output como parâmetro
})