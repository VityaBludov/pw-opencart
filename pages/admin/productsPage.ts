import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/helper'

export class ProductsPage {
    readonly page: Page
    readonly addProductButton: Locator

    constructor(page: Page) {
        this.page = page
        this.addProductButton = this.page.locator('[title="Add New"]')
    }

    async clickAddProductButton() {
        await expect(this.addProductButton, 'Add product button should be visible').toBeVisible()
        await this.addProductButton.click()
        await this.page.waitForURL(`${urls.admin.addProduct}**`)
    }
}
