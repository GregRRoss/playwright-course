import { isDesktopViewport } from "./utils/isDesktopViewport.js"

export class Navigation {
    constructor (page) {
        this.page = page
        this.basketCount = page.locator('[data-qa="header-basket-count"]')
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' })
        this.burger = page.locator('[data-qa="burger-button"]')
    }   

    getBasketCount = async () => {
        await this.basketCount.waitFor()
        let basketCountPostNumber = await this.basketCount.innerText()
        basketCountPostNumber = parseInt(basketCountPostNumber, 10)
        return basketCountPostNumber
    }

    goToCheckout = async () => {
        // If mobile mviewport first open the burger menu
        if(!isDesktopViewport(this.page)) {
            this.burger.waitFor()
            this.burger.click()
        }

        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL("/basket")
        //await this.page.goto("/basket")
    }
}
