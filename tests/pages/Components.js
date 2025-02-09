const { expect } = require('@playwright/test');

export class Components {

    constructor(page) {
        this.page = page;
    }

    async toastHaveText(msg) {
        const toast = await this.page.locator('.toast')
        await expect(toast).toHaveText(msg)
        //await expect(toast).toBeHidden({ timeout: 5000 }) //valida que é escondido após 5 segundos
        await expect(toast).not.toBeVisible({ timeout: 6000 }) //valida que não está visível em até 6 segundos
    }

    async alertHaveText(target) { 
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(target)
    }

}