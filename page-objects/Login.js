import { expect } from "@playwright/test"

export class Login {
    constructor(page){
        this.page=page
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    continueToRegister = async () => {
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000}) // Regular expression is surrounded by / and /. \ is escape character
    }

}