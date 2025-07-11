import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    private readonly catalogBar: Locator

    constructor(page: Page) {
        this.page = page
        this.catalogBar = this.page.locator('#navbar-menu')
    }

    async expandCategoryTypeDropdown(dropdownName: string) {
        const dropdown = this.catalogBar.locator('.dropdown', { hasText: dropdownName })

        await expect(this.catalogBar, 'Catalog bar should be visible').toBeVisible()
        await dropdown.hover()
        await expect(dropdown.locator('.dropdown-inner'), 'Items in dropdown should be visible').toBeVisible()
    }

    async clickCategory(categoryName: string) {
        const categoryLink = this.catalogBar.locator('.dropdown-item', { hasText: categoryName })

        await expect(categoryLink, 'Link to category should be visible').toBeVisible()
        await categoryLink.click()
    }
}
