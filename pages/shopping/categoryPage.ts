import { Locator, Page } from '@playwright/test'

export class CategoryPage {
    readonly page: Page
    readonly categoryTypeBreadcrumb: Locator
    readonly categoryBreadcrumb: Locator

    constructor(page: Page) {
        this.page = page
        this.categoryTypeBreadcrumb = this.page.locator('.breadcrumb-item').nth(1)
        this.categoryBreadcrumb = this.page.locator('.breadcrumb-item').nth(2)
    }
}
