export class AccountPage {
    constructor(page) {
        this.page = page
        this.pageHeader =  page.getByRole('heading', { name: 'My Account' })
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto("/my-account")
    }

    waitForHeader = async () => {
        await this.pageHeader.waitFor()
    }

    waitForError = async () => {
        await this.errorMessage.waitFor()
    }
}