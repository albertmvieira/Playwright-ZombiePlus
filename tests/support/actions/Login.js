const { expect } = require('@playwright/test');

export class Login {

    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');
    }

    async submitLoginForm(email, password) {
        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible();

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn(username) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*admin.*/);
        const loggedUser = this.page.locator('.logged-user');
        await expect(loggedUser).toHaveText(`Olá, ${username}`);
    }


    /**
     * Logs in as an admin user by visiting the login page, submitting the login form, 
     * and verifying the login status.
     *
     * @param {string} email - The email address of the admin user.
     * @param {string} password - The password of the admin user.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    async loginAsAdmin(email, password, username) {
        await this.visit();
        await this.submitLoginForm(email, password);
        await this.isLoggedIn(username);
    }
    
}