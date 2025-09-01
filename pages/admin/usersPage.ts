import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/config'

export class UsersPage {
    readonly page: Page
    readonly addUserButton: Locator

    constructor(page: Page) {
        this.page = page
        this.addUserButton = this.page.locator('.fa-plus')
    }

    async clickAddUserButton() {
        await expect(this.addUserButton, 'Add user button should be visible').toBeVisible()
        await this.addUserButton.click()
        await this.page.waitForURL(`${urls.admin.addUser}**`)
    }
}