import { expect, Locator, Page } from '@playwright/test'

export class SearchResultsPage {
    readonly page: Page
    readonly parentCategoryBreadcrumb: Locator
    readonly categoryBreadcrumb: Locator
    readonly productThumbnail: Locator
    readonly productTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.parentCategoryBreadcrumb = this.page.locator('.breadcrumb-item').nth(1)
        this.categoryBreadcrumb       = this.page.locator('.breadcrumb-item').nth(2)
        this.productThumbnail         = this.page.locator('.product-thumb').first()
        this.productTitle             = this.productThumbnail.locator('a').nth(1)
    }

    async openProductPage() {
        const targetPage = await this.productTitle.getAttribute('href')
        
        await expect(this.productThumbnail, 'Product thumbnail should be visible').toBeVisible()
        await this.productTitle.click()
        targetPage ? await this.page.waitForURL(targetPage) : console.log('no product URL found')
    }
}
