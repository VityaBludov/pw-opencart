import { test as base } from '@playwright/test'
import { urls } from '../resources/config'

import { HomePage } from '../pages/homePage'
import { NavigationBarPage  } from '../pages/navigationBarPage'
import { RegistrationPage } from '../pages/account/registrationPage'
import { AccountCreatedPage } from '../pages/account/accountCreatedPage'
import { SearchResultsPage } from '../pages/shopping/searchResultsPage'
import { ProductPage } from '../pages/shopping/productPage'
import { CheckoutPage } from '../pages/shopping/checkoutPage'


type MainFixtures = {
    homePage: HomePage
    navigationBarPage: NavigationBarPage
    registrationPage: RegistrationPage
    accountCreatedPage: AccountCreatedPage
    searchResultsPage: SearchResultsPage
    productPage: ProductPage
    checkoutPage: CheckoutPage
}

export const test = base.extend<MainFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto(urls.page.home)
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

    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page))
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
})

export { expect } from '@playwright/test'
