import { expect } from '@playwright/test'

export class PayPage {
    constructor (page) {
        this.page = page
        this.discountCode = page
                                .frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.codeBlank = page.locator('[data-qa="discount-code-input"]')
        this.applyDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.normalPrice = page.locator('[data-qa="total-value"]')
        this.discountedPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.discountIndicator = page.locator('[data-qa="discount-active-message"]')

        // pay data blanks
        this.ownerBlank = page.locator('[data-qa="credit-card-owner"]')
        this.numberBlank = page.locator('[data-qa="credit-card-number"]')
        this.expirationBlank = page.locator('[data-qa="valid-until"]')
        this.cvcBlank = page.locator('[data-qa="credit-card-cvc"]')

        this.payButton = page.getByRole('button', { name: 'Pay' })
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.codeBlank.waitFor()
       
        // Option 1 fill 
        await this.codeBlank.fill(code)
        await expect(this.codeBlank).toHaveValue(code) 

        //Option 2 keyboard
        //await this.codeBlank.focus()
        //await this.page.keyboard.type(code, {delay: 1000})
        //expect(await this.codeBlank.inputValue()).toBe(code)

        expect(await this.discountIndicator.isVisible()).toBe(false)
        expect(await this.discountedPrice.isVisible()).toBe(false)
        await this.applyDiscountButton.waitFor()
        await this.applyDiscountButton.click()
        // Check discounted price activated
        await this.discountIndicator.waitFor()
        // check that discounted price is showing
        await this.discountedPrice.waitFor()

        await this.normalPrice.waitFor()
      
        const originalPrice = parseInt(await this.normalPrice.innerText(), 10)
        console.log("Original price: " + originalPrice + " Discounted Price: " + parseInt(await this.discountedPrice.innerText() ))
        expect(originalPrice).toBeGreaterThan(parseInt(await this.discountedPrice.innerText(),10))
        
    }

    fillPaymentDetails = async (paydata) => {
 
        // wait for blanks
        await this.ownerBlank.waitFor()
        await this.numberBlank.waitFor()
        await this.expirationBlank.waitFor()
        await this.cvcBlank.waitFor()
        // fill the blanks
        await  this.ownerBlank.fill(paydata.cardOwner)
        await  this.numberBlank.fill(paydata.cardNumber)
        await this.expirationBlank.fill(paydata.expiration)
        await this.cvcBlank.fill(paydata.CVC)


    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()

        await this.page.waitForURL(/\/thank-you/)
    }
}