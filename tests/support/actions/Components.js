const { expect } = require('@playwright/test');

export class Components {

    constructor(page) {
        this.page = page;
    }

    async popUpHaveText(msg) {
        const element = await this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(msg)
    }

    //Aplicação alterada e não será mais um tipo toast, porém deixarei o metodo criado para relembrarem como fazer
    async toastContainText(msg) {
        const element = await this.page.locator('.toast')
        await expect(element).toContainText(msg)
        //await expect(toast).toBeHidden({ timeout: 5000 }) //valida que é escondido após 5 segundos
        await expect(toast).not.toBeVisible({ timeout: 6000 }) //valida que não está visível em até 6 segundos
    }

    async alertHaveText(target) { 
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(target)
    }

}