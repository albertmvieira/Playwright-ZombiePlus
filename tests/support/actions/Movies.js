const { test, expect } = require('@playwright/test');

export class Movies {

    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async createMovie(movie) {
        await this.goForm();
        await this.page.locator('#title').fill(movie.title);
        await this.page.getByLabel('Sinopse').fill(movie.overview);

        await this.page.locator('#select_company_id .react-select__indicator').first().click();
        //pegando html da página para identificar o elemento que é montado após o click do react-select
        // const html = await this.page.content();
        // console.log(html);
        await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click();
        await this.page.locator('input[name="cover"]').setInputFiles('./tests/support/fixtures' + movie.cover);
        
        // se o filme em movies.json possui featured = true, clica no switch
        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click();
            console.log('Clicou no switch');
        }
        
        await this.submit();
    }

    async alertHaveText(target) { 
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async deleteMovie(title) {
        await this.page.getByRole('row', {name: title}).getByRole('button').click(); //clica no botão remover filme
        await this.page.click('.confirm-removal') //clica no botão de confirmar remoção
    }

    async searchMovie(title) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(title);
        await this.page.click('.actions button')
    }

    async tableHaveContent(content) {
        const rows = this.page.getByRole('row');
        await expect(rows).toContainText(content);
    }


}