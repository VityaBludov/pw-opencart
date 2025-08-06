import { expect, test } from '../fixtures/main'
import fs from 'fs'

const userFile = '.auth/user/shopping/customer.json'
const productsFile = '.db/products.json'
const registeredCustomer = JSON.parse(fs.readFileSync(userFile, 'utf-8'))
const availableProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))

test('pick product from catalog and proceed to payment @regression', async ({ homePage, searchResultsPage, productPage, checkoutPage }) => {
    const parentCategory = 'Components'
    const category = 'Monitors'
    const purchaseQty = 2

    await homePage.expandCategoryTypeDropdown(parentCategory)
    await homePage.clickCategory(category)
    await expect(searchResultsPage.parentCategoryBreadcrumb, 'Chosen category type should be displayed in breadcrumbs').toHaveText(parentCategory)
    await expect(searchResultsPage.categoryBreadcrumb, 'Chosen category should be displayed in breadcrumbs').toHaveText(category)
    const productName = await searchResultsPage.productTitle.innerText()
    
    // TODO: move following section (to fixture) so that it can be reused in other tests
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
    // end of TODO
})

test('search for product, pick from search results and proceed to payment', async ({ homePage }) => {
    // WIP
})
