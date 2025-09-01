import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/config'

export class AccountCreatedPage {
    readonly page: Page
    readonly successMessage: Locator
    private readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.successMessage = this.page.locator('h1', { hasText: 'Your Account Has Been Created!' })
        this.continueButton = this.page.getByRole('link', { name: 'Continue' })
    }

    async clickContinueButton() {
        await expect(this.continueButton, '"Continue" button should be visible').toBeVisible()
        await this.continueButton.click()
        await this.page.waitForURL(`${urls.page.account}**`)
    }
}
