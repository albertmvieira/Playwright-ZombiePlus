const { test, expect } = require('@playwright/test');

export class Series {

    constructor(page) {
        this.page = page;
    }

    async goSeries() {
        await this.page.locator('a[href$="tvshows"]').click();
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async createSerie(serie) {
        await this.goSeries();
        await this.goForm();
        await this.page.locator('#title').fill(serie.title);
        await this.page.getByLabel('Sinopse').fill(serie.overview);

        await this.page.locator('#select_company_id .react-select__indicator').first().click();
        await this.page.locator('.react-select__option').filter({ hasText: serie.company }).click();
        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: serie.release_year }).click();
        await this.page.locator('#seasons').fill(serie.season);
        await this.page.locator('input[name="cover"]').setInputFiles('./tests/support/fixtures' + serie.cover);
        
        
        // se a serie em series.json possui featured = true, clica no switch
        if (serie.featured) {
            await this.page.locator('.featured .react-switch').click();
            console.log('Clicou no switch');
        }
        
        await this.submit();
    }

    async deleteSerie(title) {
        await this.goSeries();
        await this.page.getByRole('row', {name: title}).getByRole('button').click(); //clica no botão remover serie
        await this.page.click('.confirm-removal') //clica no botão de confirmar remoção
    }

    async searchSerie(title) {
        await this.goSeries();
        await this.page.getByPlaceholder('Busque pelo nome').fill(title);
        await this.page.click('.actions button')
    }

    async tableHaveContent(content) {
        await this.page.waitForSelector('tbody tr'); //espera a tabela carregar
        const rows = this.page.getByRole('row');
        await expect(rows).toContainText(content);
    }
}