import { test as base } from '@playwright/test'
import { urls } from '../resources/config'

import { DashboardPage } from '../pages/admin/dashboardPage'
import { NavigationPanelPage } from '../pages/admin/navigationPanelPage'
import { UsersPage } from '../pages/admin/usersPage'
import { AddUserPage } from '../pages/admin/addUserPage'
import { ApiHandler } from '../handlers/apiHandler'
import { ProductsPage } from '../pages/admin/productsPage'
import { AddProductPage } from '../pages/admin/addProductPage'

export type FixtureOptions = {
    userToken: string,
}

type AdminFixtures = {
    dashboardPage: DashboardPage,
    navigationPanelPage: NavigationPanelPage,
    usersPage: UsersPage,
    addUserPage: AddUserPage,
    apiHandler: ApiHandler,
    productsPage: ProductsPage,
    addProductPage: AddProductPage,
}

export const test = base.extend<FixtureOptions & AdminFixtures>({
    userToken: ['', { option: true }],

    dashboardPage: async ({ page, userToken }, use) => {
        const dashboardPage = new DashboardPage(page)
        await page.goto(`${urls.admin.dashboard}${userToken}`)
        await page.waitForURL(`${urls.admin.dashboard}${userToken}`)
        await use(dashboardPage)
    },
    navigationPanelPage: async ({ page, dashboardPage }, use) => {
        await use(new NavigationPanelPage(page))
    },
    usersPage: async ({ page }, use) => {
        await use(new UsersPage(page))
    },
    addUserPage: async ({ page }, use) => {
        await use(new AddUserPage(page))
    },
    apiHandler: async ({ request }, use) => {
        await use(new ApiHandler(request))
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    },
    addProductPage: async ({ page }, use) => {
        await use(new AddProductPage(page))
    },
})

export { expect } from '@playwright/test'
