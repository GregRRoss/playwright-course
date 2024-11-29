import { expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'


export class RegisterPage{
    constructor(page){
        this.page = page
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.emailField = page.getByPlaceholder('E-Mail')
        this.passwordField = page.getByPlaceholder('Pass')
    }

    signUpAsNewUser = async (email, password) => {
    
            await this.emailField.waitFor()

            await this.emailField.fill(email)
  
            await this.passwordField.fill(password)
        
            await this.registerButton.waitFor()
            
            await this.registerButton.click()
            
    }

}