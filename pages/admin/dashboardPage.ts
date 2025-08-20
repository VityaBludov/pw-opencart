import { expect, Locator, Page } from '@playwright/test'

export class DashboardPage {
    readonly page: Page
    readonly modalHeader: Locator
    readonly modalCloseButton: Locator

    constructor(page: Page) {
        this.page = page
        this.modalHeader      = this.page.locator('.modal-header', { hasText: 'Important Security Notification!' })
        this.modalCloseButton = this.modalHeader.locator('.btn-close')
    }

    async handleModal() {
        if (await this.modalHeader.isVisible()) {
            await expect(this.modalCloseButton, 'Modal close button should be visible').toBeVisible()
            await this.modalCloseButton.click()
            await expect(this.modalHeader, 'Modal header should not be visible after closing').not.toBeVisible()
        }
    }
}
