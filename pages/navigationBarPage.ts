import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../resources/config'

export class NavigationBarPage {
    page: Page
    private readonly navigationBar: Locator
    private readonly accountDropdown: Locator
    readonly logoutLink: Locator

    constructor(page: Page) {
        this.page = page

        this.navigationBar   = this.page.locator('.text-end')
        this.accountDropdown = this.navigationBar.getByText('My Account')
        this.logoutLink      = this.navigationBar.getByText('Logout')
    }

    async selectAccountAction(action: string) {
        await expect(this.accountDropdown, 'Account dropdown should be visible').toBeVisible()
        const isExpanded = await this.accountDropdown.getAttribute('aria-expanded')
        if (!isExpanded) {
            await this.accountDropdown.click()
        }
        const actionLink = this.navigationBar.getByText(action)
        await expect(actionLink, `Link ${action} should be visible`).toBeVisible()
        await actionLink.click()
        await this.page.waitForURL(urls.page.registration)
    }
}
