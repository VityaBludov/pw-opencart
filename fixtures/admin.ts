import { test as base } from '@playwright/test'
import { urls } from '../resources/helper'

import { DashboardPage } from '../pages/admin/dashboardPage'
import { NavigationPanelPage } from '../pages/admin/navigationPanelPage'
import { UsersPage } from '../pages/admin/usersPage'
import { AddUserPage } from '../pages/admin/addUserPage'

type AdminFixtures = {
    dashboardPage: DashboardPage,
    navigationPanelPage: NavigationPanelPage,
    usersPage: UsersPage,
    addUserPage: AddUserPage,
}

export const test = base.extend<AdminFixtures>({
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page)
        await page.goto(`${urls.admin.dashboard}${process.env.TOKEN_ADMIN_SUPER}`)
        await page.waitForURL(`${urls.admin.dashboard}${process.env.TOKEN_ADMIN_SUPER}`)
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
})

export { expect } from '@playwright/test'
