import { expect, test } from '../../fixtures/main'
import fs from 'fs'

const userFile = '.auth/user/shopping/customer.json'
const productsFile = '.db/products.json'
const registeredCustomer = JSON.parse(fs.readFileSync(userFile, 'utf-8'))
const availableProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))

test('pick product from catalog and proceed to payment @regression', async ({ homePage, searchResultsPage, productPage, checkoutPage, buyingConvenience }) => {
    const parentCategory = 'Components'
    const category = 'Monitors'

    await homePage.expandCategoryTypeDropdown(parentCategory)
    await homePage.clickCategory(category)
    await expect(searchResultsPage.parentCategoryBreadcrumb, 'Chosen category type should be displayed in breadcrumbs').toHaveText(parentCategory)
    await expect(searchResultsPage.categoryBreadcrumb, 'Chosen category should be displayed in breadcrumbs').toHaveText(category)
    
    await buyingConvenience.buyProduct(searchResultsPage, productPage, checkoutPage)
})

test('search for product, pick from search results and proceed to payment', async ({ homePage }) => {
    // not implemented due to broken search functionality in opencart
})
