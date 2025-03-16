const { test, expect } = require('@playwright/test');

export class MoviesPage {

    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*admin.*/);
        const logoutLink = this.page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible();
    }

    async createMovie(title, overview, company, release_year) {
        await this.page.locator('a[href$="register"]').click();
        await this.page.locator('#title').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);

        await this.page.locator('#select_company_id .react-select__indicator').click();
        //pegando html da página para identificar o elemento que é montado após o click do react-select
        // const html = await this.page.content();
        // console.log(html);
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    
    }
}