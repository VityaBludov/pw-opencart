import { test as base } from '@playwright/test'
import { urls } from '../resources/helper'

import { DashboardPage } from '../pages/admin/dashboardPage'
import { NavigationPanelPage } from '../pages/admin/navigationPanelPage'
import { UsersPage } from '../pages/admin/usersPage'
import { AddUserPage } from '../pages/admin/addUserPage'
import { ApiPage } from '../pages/admin/apiPage'

export type FixtureOptions = {
    userToken: string,
}

type AdminFixtures = {
    dashboardPage: DashboardPage,
    navigationPanelPage: NavigationPanelPage,
    usersPage: UsersPage,
    addUserPage: AddUserPage,
    apiPage: ApiPage,
}

export const test = base.extend<FixtureOptions & AdminFixtures>({
    userToken: ['', { option: true }],

    dashboardPage: async ({ page, userToken }, use) => {
        const dashboardPage = new DashboardPage(page)
        console.log(`userToken: ${userToken}`)
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
    apiPage: async ({ request }, use) => {
        await use(new ApiPage(request))
    },
})

export { expect } from '@playwright/test'
