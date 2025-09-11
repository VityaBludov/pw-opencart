import { expect } from '@playwright/test'
import { SearchResultsPage } from '../../pages/shopping/searchResultsPage'
import { ProductPage } from '../../pages/shopping/productPage'
import { CheckoutPage } from '../../pages/shopping/checkoutPage'

export class PurchaseFlow {
    /**
     * Executes product buying steps, common for different tests
     * @param searchResultsPage 
     * @param productPage 
     * @param checkoutPage 
     */
    async buyProduct(searchResultsPage: SearchResultsPage, productPage: ProductPage, checkoutPage: CheckoutPage) {
        const purchaseQty = 2
    
        const productName = await searchResultsPage.productTitle.innerText()
        await searchResultsPage.openProductPage()
        expect(productName, 'Product name should match name in search results').toEqual(await productPage.productTitle.innerText())
    
        const successMessage = await productPage.addProductToCart(purchaseQty)
        const cartButtonText = await productPage.cartButton.innerText()
        const itemsCount = Number(cartButtonText.match(/.*(?= item\(s\) - )/)?.[0])
        const orderTotal = Number(cartButtonText.match(/(?<= item\(s\) - ).*/)?.[0])
    
        expect(successMessage, 'Success banner should contain proper message').toEqual(` Success: You have added ${productName} to your shopping cart!`)
        expect(itemsCount, 'Proper quantity should be indicated in cart button').toEqual(purchaseQty)
        await productPage.viewCart()
        await expect(productPage.cart, 'Cart should be visible').toBeVisible()
        await productPage.proceedToCheckout()
        await expect(checkoutPage.pageTitle).toHaveText('Checkout')
        
        // payment steps not implemented due to broken opencart's endpoints
    }
}
