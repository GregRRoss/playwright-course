import { test, expect } from "@playwright/test"

test.skip("Product Page add to basket", async ({ page }) => {
    await page.goto("/")
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()//page.getByRole('button', { name: 'Add to Basket', }).first()
    await addToBasketButton.waitFor()
    const basketCount = page.locator('[data-qa="header-basket-count"]')
    await basketCount.waitFor()
    await expect(basketCount).toHaveText("0") 
    let basketCountNumberOriginal = await basketCount.innerHTML()
    basketCountNumberOriginal = parseInt( basketCountNumberOriginal)
    console.log(basketCountNumberOriginal)
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await addToBasketButton.click()
    await expect(addToBasketButton).toHaveText("Remove from Basket")
    let basketCountPostNumber = await basketCount.innerHTML()
    basketCountPostNumber = parseInt(basketCountPostNumber)
    console.log(basketCountPostNumber)
    if (basketCountPostNumber === (basketCountNumberOriginal + 1)){
        console.log("Succesful Increment")
    } else {
        console.log("Faile Increment")
    }
    await expect(basketCount).toHaveText("1") 

    
    const checkoutButton = page.getByRole('link', { name: 'Checkout' })
    await checkoutButton.waitFor()
    await checkoutButton.click()
    await page.waitForURL("/bask7t")


})

