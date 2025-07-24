import { expect, test } from '../fixtures/main'
import { randomElement } from '../resources/helper'
import fs from 'fs'

const userFile = '.auth/user/shopping/customer.json'
const productsFile = '.db/products.json'
const registeredCustomer = JSON.parse(fs.readFileSync(userFile, 'utf-8'))
const availableProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))

test('pick product from catalog and proceed to payment @regression', async ({ homePage, categoryPage }) => {
    const categoryType = 'Components'
    const category = 'Monitors'

    await homePage.expandCategoryTypeDropdown(categoryType)
    await homePage.clickCategory(category)
    await expect(categoryPage.categoryTypeBreadcrumb, 'Chosen category type should be displayed in breadcrumbs').toHaveText(categoryType)
    await expect(categoryPage.categoryBreadcrumb, 'Chosen category should be displayed in breadcrumbs').toHaveText(category)
})

test('search for product, pick from search results and proceed to payment', async ({ homePage }) => {

})
