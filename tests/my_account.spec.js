import { test } from '@playwright/test'
import { AccountPage } from '../page-objects/AccountPage.js'
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

test("Account using cookie injection w/ network request mocking", async ( { page }) => {


    // Make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    console.log({loginToken})

    // Change the network response to fail instead of succeed
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })

    // Inject the token into the browser
    const myAccount = new AccountPage(page)
    await myAccount.visit()
    //await page.pause()
    await page.evaluate(([loginTokenInBrowserCode]) => {
        document.cookie = "token=" + loginTokenInBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForHeader()
    await myAccount.waitForError()
    //await page.pause()
});