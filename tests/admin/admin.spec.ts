import { expect, test } from '../../fixtures/admin'
import { RandomUser, urls } from '../../resources/helper'

const authFileSuperAdmin = '.auth/admin/storageStateSuperAdmin.json'
const authFileProductAdmin = './auth/admin/storageStateProductAdmin.json'

test.describe('Suite: super admin', () => {
    test.use({ storageState: authFileSuperAdmin, userToken: process.env.TOKEN_ADMIN_SUPER })

    test('as super admin user, add new admin user', async ({ dashboardPage, navigationPanelPage, usersPage, addUserPage }) => {
        const user = new RandomUser()
        const username = user.email.match(/(?<=\.).*(?=@)/)?.[0]    // trying to be as unique as possible while sticking to given email and fitting into 20-char limit

        await dashboardPage.handleModal()    // handle security warning in case it appears
        await navigationPanelPage.expandMenu(navigationPanelPage.mainMenuItemSystem)
        await navigationPanelPage.expandMenu(navigationPanelPage.systemMenuItemUsers)
        await navigationPanelPage.clickPageLink(navigationPanelPage.systemUsersMenuLinkUsers, urls.admin.users)

        await usersPage.clickAddUserButton()
        await addUserPage.inputText(addUserPage.usernameField, username ? username : `${user.firstName}.${user.lastName}`)
        await addUserPage.setUserGroupRandom()
        await addUserPage.inputText(addUserPage.firstNameField, user.firstName)
        await addUserPage.inputText(addUserPage.lastNameField, user.lastName)
        await addUserPage.inputText(addUserPage.emailField, user.email)
        await addUserPage.inputText(addUserPage.passwordField, user.password)
        await addUserPage.inputText(addUserPage.confirmField, user.password)
        await addUserPage.setStatusActive()
        await addUserPage.saveForm()
        await expect(addUserPage.successBanner, 'Success banner should be visible').toBeVisible()
        await expect(addUserPage.successBanner, 'Success banner should have proper message').toHaveText('Success: You have modified users!')
        await addUserPage.returnToUsersPage()
    })
})

test.describe('Suite: product admin', () => {
    test.use({ storageState: authFileProductAdmin, userToken: process.env.TOKEN_ADMIN_PRODUCT })

    test('stub', async ({ dashboardPage }) => {
        // temp stub to verify login
    })
})
