import { expect, test } from '../fixtures/main'
import { RandomUser } from '../resources/helper'

test('check registration process', async ({ navigationBarPage, registrationPage, accountCreatedPage }) => {
    const user = new RandomUser
    
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
