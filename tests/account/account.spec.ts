import { expect, test } from '../../fixtures/main'
import { RandomUser } from '../../resources/helper'
import fs from 'fs'

const user = new RandomUser
const userFile = '.auth/user/account/customer.json'
fs.writeFileSync(userFile, JSON.stringify(user)) // save user data to reuse in further tests

test('check registration process @regression', async ({ navigationBarPage, registrationPage, accountCreatedPage }) => {   
    await navigationBarPage.selectAccountAction('Register')
    await registrationPage.inputFirstName(user.firstName)
    await registrationPage.inputLastName(user.lastName)
    await registrationPage.inputEmail(user.email)
    await registrationPage.inputPassword(user.password)
    await registrationPage.checkNewsletter()
    await registrationPage.checkPolicy()
    await registrationPage.clickSubmitButton(true)
    await expect(accountCreatedPage.successMessage, 'After registration success message should be displayed').toBeVisible()
    await accountCreatedPage.clickContinueButton()
    await expect(navigationBarPage.logoutLink, 'Logout action link should be present').toBeAttached()
})
