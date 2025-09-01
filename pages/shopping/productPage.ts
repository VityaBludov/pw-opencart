import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/config'

export class ProductPage {
    readonly page: Page
    readonly productTitle: Locator
    readonly availabilityTag: Locator
    readonly priceTag: Locator
    readonly quantityField: Locator
    readonly addToCartButton: Locator
    readonly cartButton: Locator
    readonly successBanner: Locator
    readonly cart: Locator
    readonly checkoutLink: Locator

    constructor(page: Page) {
        this.page = page
        this.productTitle    = this.page.locator('h1')
        this.availabilityTag = this.page.locator('li', { hasText: 'Availability:' })
        this.priceTag        = this.page.locator('x-currency').nth(1)
        this.quantityField   = this.page.locator('#input-quantity')
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' })
        this.cartButton      = this.page.locator('[class= "btn btn-lg btn-dark d-block dropdown-toggle"]')
        this.successBanner   = this.page.locator('.alert-success')
        this.cart            = this.page.locator('ul', { hasText: 'View Cart' })
        this.checkoutLink    = this.cart.locator('a', { hasText: 'Checkout' })
    }

    async addProductToCart(qty: number): Promise<string> {
        await expect(this.quantityField, 'Input field for quantity should be editable').toBeEditable()
        await this.quantityField.fill(qty.toString())
        await this.addToCartButton.click()
        await expect(this.successBanner, 'Success banner should be visible').toBeVisible()
        const successMessage = await this.successBanner.innerText()
        await this.page.waitForResponse(urls.endpoint.cartInfo)
        
        return successMessage
    }

    async viewCart() {
        await expect(this.cartButton, 'Cart button should be visible').toBeVisible()
        await this.cartButton.click()
    }

    async proceedToCheckout() {
        await expect(this.checkoutLink, 'Link to checkout should be visible').toBeVisible()
        await this.checkoutLink.click()
        await this.page.waitForURL(urls.page.checkout)
    }
}
