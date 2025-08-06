import { expect, Locator, Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page
    readonly pageTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = this.page.locator('h1')
    }
}
