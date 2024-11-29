import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./utils/isDesktopViewport.js"

export class ProductPage {

    constructor(page) {
        this.page = page
        this.addButton = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.navigator = new Navigation(this.page)
        this.priceTag = page.locator('[datatype="product-price"]')
        this.title = page.locator('[data-qa="product-title"]')
    }

    visit = async () => { 
        await this.page.goto("/")
    }

    addProductToBasket = async(productNumber) => {
        let beforeCount
        //Only in desktop view basket count
        if ( isDesktopViewport(this.page) ) {
            beforeCount = await this.navigator.getBasketCount()
        }
        const specificButton = this.addButton.nth(productNumber)
        await expect(specificButton).toHaveText("Add to Basket")
        await specificButton.waitFor()
        await specificButton.click()
        await expect(specificButton).toHaveText("Remove from Basket")
             //Only in desktop view basket count
         if ( isDesktopViewport(this.page)  ) {
            const afterCount = await this.navigator.getBasketCount()
            expect(afterCount).toBeGreaterThan(beforeCount)
        }
    }

    sortByCheapest = async() => {
        await this.title.first().waitFor()
        console.log("SORTY SORTY SORTY SORTY SORTY")
        await this.sortDropdown.waitFor()
        const titleOrder1 = await this.getProductOrder()
        await this.sortDropdown.selectOption("price-asc")
        const titleOrder2 = await this.getProductOrder()
        await expect (titleOrder1).not.toEqual(titleOrder2)

    }

    getProductOrder = async() => {
        console.log("order/")
        const allProductsTitle = await this.title.allInnerTexts()
        const allProductsPrice = await this.priceTag.allInnerTexts()
        const productOrder = allProductsPrice.map((element) => {
            let withoutDollarSign = element.replace('$', '')
            withoutDollarSign = parseInt(withoutDollarSign, 10)
            return withoutDollarSign
        })
        const numberOfItems = await this.title.count()
        for(let i=0;i<numberOfItems;++i){
            console.log(allProductsTitle[i] + ": " + allProductsPrice[i] )
        }
        return allProductsTitle
    }

}