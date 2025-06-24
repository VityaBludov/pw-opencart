import { test as base } from '@playwright/test'
import { config } from '../resources/helper'

import { HomePage } from '../pages/homePage'
import { NavigationBarPage  } from '../pages/navigationBarPage'
import { RegistrationPage } from '../pages/account/registrationPage'
import { AccountCreatedPage } from '../pages/account/accountCreatedPage'


type MainFixtures = {
    homePage: HomePage
    navigationBarPage: NavigationBarPage
    registrationPage: RegistrationPage
    accountCreatedPage: AccountCreatedPage
}

export const test = base.extend<MainFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto(config.address.home)
        await use(homePage)
    },

    navigationBarPage: async ({ page, homePage }, use) => {
        await use(new NavigationBarPage(page))
    },

    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page))
    },

    accountCreatedPage: async ({ page }, use) => {
        await use(new AccountCreatedPage(page))
    },
})

export { expect } from '@playwright/test'
