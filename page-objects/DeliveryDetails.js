import { expect } from "@playwright/test"
import { v4 as uuidv4} from "uuid"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameBlank = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameBlank = page.locator('[data-qa="delivery-last-name"]')
        this.streetBlank = page.locator('[data-qa="delivery-address-street"]')
        this.postalCodeBlank = page.locator('[data-qa="delivery-postcode"]')
        this.cityBlank = page.locator('[data-qa="delivery-city"]')
        this.countryDrop = page.locator('[data-qa="country-dropdown"]')
        this.saveDetailsButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveBox = page.locator('[data-qa="saved-address-container"]')

        //SaveBox Details
        this.saveBoxFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.saveBoxLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.saveBoxStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveBoxPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveBoxCity = page.locator('[data-qa="saved-address-city"]')
        this.saveBoxCountry = page.locator('[data-qa="saved-address-country"]')

        this.paymentPageButton = page.getByRole('button', { name: 'Continue to payment' })
 
    }

    fillDetails = async (deliveryDetails) => {
        this.firstNameBlank.waitFor()
        await this.firstNameBlank.fill(deliveryDetails.firstName)

        this.lastNameBlank.waitFor()
        await this.lastNameBlank.fill(deliveryDetails.lastName)

        this.streetBlank.waitFor()
        await this.streetBlank.fill(deliveryDetails.street)

        this.postalCodeBlank.waitFor()
        await this.postalCodeBlank.fill(deliveryDetails.postcode)

        this.cityBlank.waitFor()
        await  this.cityBlank.fill(deliveryDetails.city)

        this.countryDrop.waitFor()
        await this.countryDrop.selectOption(deliveryDetails.country)

    }

    saveDetails = async () => {
        const currentSavesCount = await this.saveBox.count()
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await this.saveBox.waitFor()
        await expect(this.saveBox).toHaveCount(currentSavesCount+1)

        await this.saveBoxFirstName.first().waitFor()
        expect(await this.saveBoxFirstName.first().innerText()).toBe(await this.firstNameBlank.inputValue())


        await this.saveBoxLastName.first().waitFor()
        expect(await this.saveBoxLastName.first().innerText()).toBe(await this.lastNameBlank.inputValue())

        await this.saveBoxStreet.first().waitFor()
        expect(await this.saveBoxStreet.first().innerText()).toBe(await this.streetBlank.inputValue())

        await this.saveBoxPostCode.first().waitFor()
        expect(await this.saveBoxPostCode.first().innerText()).toBe(await this.postalCodeBlank.inputValue())

        await this.saveBoxCity.first().waitFor()
        expect(await this.saveBoxCity.first().innerText()).toBe(await this.cityBlank.inputValue())

        await this.saveBoxCountry.first().waitFor()
        expect(await this.saveBoxCountry.first().innerText()).toBe(await this.countryDrop.inputValue())


        
    }

    continueToPay = async () => {
        await this.paymentPageButton.waitFor()
        await this.paymentPageButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 30000})
        
        
    }


}