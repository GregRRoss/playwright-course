import { expect } from  "@playwright/test"

export class Checkout {
    constructor (page) {
        this.page = page
        this.basketCard = page.locator('[data-qa="basket-card"]')
        this.basketCardPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCard.first().waitFor()
        const itemsBeforeRemoval = await this.basketCard.count()
        await this.basketCardPrice.first().waitFor()
        const allPriceTexts = await this.basketCardPrice.allInnerTexts()
        const priceNumbers = allPriceTexts.map((element) => {
            let withoutDollarSign = element.replace('$', '')
            withoutDollarSign = parseInt(withoutDollarSign, 10)

            return withoutDollarSign
        })
        const smallestPrice = Math.min(...priceNumbers)
        const indexOfSmallest = priceNumbers.indexOf(smallestPrice)
        console.warn(priceNumbers + " smallest: (" + indexOfSmallest + ') ' + smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(indexOfSmallest)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        // const itemsAfterRemoval = await this.basketCard.count()
        await expect(this.basketCard).toHaveCount(itemsBeforeRemoval -1)
        //await this.page.pause()
    }


    continueToCheckout = async () => {
        await this.continueCheckoutButton.first().waitFor()
        await this.continueCheckoutButton.first().click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }

}