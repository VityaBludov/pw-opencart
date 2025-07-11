import { expect, test } from '../fixtures/main'
import fs from 'fs'

const userFile = '.auth/user/shopping/customer.json'
const registeredCustomer = JSON.parse(fs.readFileSync(userFile, 'utf-8'))

test('pick single item from catalog and proceed to payment @regression', async ({ homePage, categoryPage }) => {
    // TODO: populate categories from DB and pick random category for shopping
    const categoryType = 'Components'
    const category = 'Monitors'

    await homePage.expandCategoryTypeDropdown(categoryType)
    await homePage.clickCategory(category)
    await expect(categoryPage.categoryTypeBreadcrumb, 'Chosen category type should be displayed in breadcrumbs').toHaveText(categoryType)
    await expect(categoryPage.categoryBreadcrumb, 'Chosen category should be displayed in breadcrumbs').toHaveText(category)
})
