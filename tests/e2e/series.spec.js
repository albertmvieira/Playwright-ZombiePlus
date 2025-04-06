const { test, expect } = require('../support'); //importa a função test do arquivo support/index.js

const data = require('../support/fixtures/series.json'); //importa o arquivo movies.json
const { executeSql } = require('../support/database'); //importa a função executeSql do arquivo database.js


test.beforeAll(async () => {
    await executeSql(`DELETE from tvshows;`); //chama a função executeSql passando o script SQL para deletar todos as series do banco de dados
})

test('deve poder cadastrar uma nova serie', async ({ page }) => {

    const serie = data.create; //cria uma constante serie que recebe o objeto create do arquivo serie.json

    await page.login.loginAsAdmin(process.env.USER_ADMIN, process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login
    await page.series.createSerie(serie); //chama o método createSerie da classe Series passando o objeto serie como parâmetro
    await page.components.popUpHaveText(`A série '${serie.title}' foi adicionada ao catálogo.`); //chama o método haveText da classe Components
})

test('deve poder remover uma serie', async ({ page, request }) => {
    const serie = data.to_remove
    await request.api.postSerie(serie); //chama o método postSerie da classe Api passando o objeto serie como parâmetro
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login

    await page.series.deleteSerie(serie.title); //chama o método deleteMovie da classe movies passando o título do filme como parâmetro
    await page.components.popUpHaveText('Série removida com sucesso.') 

})

test('não deve cadastrar serie com titulo duplicado', async ({ page, request }) => {

    const serie = data.duplicate; //cria uma constante movie que recebe o objeto create do arquivo movies.json

    await request.api.postSerie(serie); //chama o método postMovie da classe Api passando o objeto movie como parâmetro
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login
    await page.series.createSerie(serie); //chama o método createMovie da classe movies
    await page.components.popUpHaveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`); //chama o método haveText da classe Components

})

test('não deve cadastrar uma serie quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.loginAsAdmin(process.env.USER_ADMIN, process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login

    await page.series.goSeries(); //chama o método goSeries da classe movies
    await page.series.goForm(); //chama o método goForm da classe movies
    await page.series.submit(); //chama o método submit da classe movies

    await page.components.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'

    ]);
})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const series = data.search; //cria uma constante series que recebe o objeto search do arquivo series.json
    series.data.forEach(async (serie) => {
        await request.api.postSerie(serie); //chama o método postSerie da classe Api passando o objeto serie como parâmetro 
    })
    await page.login.loginAsAdmin(process.env.USER_ADMIN , process.env.USER_ADMIN_PASSWORD, 'Admin'); //chama o método loginAsAdmin da classe login
    await page.series.searchSerie(series.input); //chama o metodo searchSerie da classe series passando o termo de input como parâmetro
    await page.series.tableHaveContent(series.outputs); //chama o método tableHaveContent da classe series passando o termo de output como parâmetro
})