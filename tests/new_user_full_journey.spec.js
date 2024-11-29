import { test } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { Login } from "../page-objects/Login.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { PayPage } from "../page-objects/PayPage.js"
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js"
import { deliveryDetails as addressStuff } from "../data/deliveryDetails.js"
import { paymentDetails as paydata } from "../data/paymentDetails.js"
import { v4 as uuidv4 } from 'uuid'

 test("New user full end-to-end test jounrey", async ({ page }) => {
    console.log("TEST")
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByCheapest()


    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    

    const navigator = new Navigation( page)
    await navigator.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    
    await checkout.continueToCheckout()
    
    const login = new Login(page)
    await login.continueToRegister()
    

    const registerPage = new RegisterPage(page)
    let email =  uuidv4()
    email = email + "@test.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)
    
    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(addressStuff)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPay()

    const payPage = new PayPage(page)
    await payPage.activateDiscount()

    await payPage.fillPaymentDetails(paydata)
    await payPage.completePayment()

})
