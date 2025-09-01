import { expect, test } from '../../fixtures/admin'
import { RandomUser } from '../../resources/helper'
import { urls } from '../../resources/config'
import { faker } from '@faker-js/faker'

const authFileSuperAdmin = '.auth/admin/storageStateSuperAdmin.json'
const authFileProductAdmin = '.auth/admin/storageStateProductAdmin.json'

test.describe('Suite: super admin @regression', () => {
    test.use({ storageState: authFileSuperAdmin, userToken: process.env.TOKEN_ADMIN_SUPER })

    test('as super admin user, add new admin user @regression', async ({ dashboardPage, navigationPanelPage, usersPage, addUserPage }) => {
        const user = new RandomUser()
        const username = user.email.match(/(?<=\.).*(?=@)/)?.[0]    // trying to be as unique as possible while sticking to given email and fitting into 20-char limit

        await dashboardPage.handleModal()    // handle security warning in case it appears
        await navigationPanelPage.expandMenu(navigationPanelPage.mainMenuItemSystem)
        await navigationPanelPage.expandMenu(navigationPanelPage.systemMenuItemUsers)
        await navigationPanelPage.clickPageLink(navigationPanelPage.systemUsersMenuLinkUsers, urls.admin.users)

        await usersPage.clickAddUserButton()
        await addUserPage.inputText(addUserPage.usernameField, username ? username : `${user.firstName}.${user.lastName}`)
        await addUserPage.setUserGroupRandom()
        await addUserPage.inputText(addUserPage.firstNameField, user.firstName)
        await addUserPage.inputText(addUserPage.lastNameField, user.lastName)
        await addUserPage.inputText(addUserPage.emailField, user.email)
        await addUserPage.inputText(addUserPage.passwordField, user.password)
        await addUserPage.inputText(addUserPage.confirmField, user.password)
        await addUserPage.setStatusActive()
        await addUserPage.saveForm()
        await expect(addUserPage.successBanner, 'Success banner should be visible').toBeVisible()
        await expect(addUserPage.successBanner, 'Success banner should have proper message').toHaveText('Success: You have modified users!')
        await addUserPage.returnToUsersPage()
    })
})

test.describe('Suite: product admin @regression', () => {
    test.use({ storageState: authFileProductAdmin, userToken: process.env.TOKEN_ADMIN_PRODUCT })

    test('as product admin, add new product to catalog @regression', async ({ dashboardPage, navigationPanelPage, productsPage, addProductPage }) => {
        const productName = `testProduct${faker.number.int(999)}`
        const productImageName = 'product.png'
        const productImagePath = 'resources/test-data/img/'
        
        await dashboardPage.handleModal()    // handle security warning in case it appears
        await navigationPanelPage.expandMenu(navigationPanelPage.mainMenuItemCatalog)
        await navigationPanelPage.clickPageLink(navigationPanelPage.catalogMenuLinkProducts, urls.admin.products)
        
        await productsPage.clickAddProductButton()
        await addProductPage.switchToTab(addProductPage.generalTab)
        expect(await addProductPage.isTabActive(addProductPage.generalTab), '"General" tab should be active').toBeTruthy()
        await addProductPage.inputText(addProductPage.productNameField, productName)
        await addProductPage.inputText(addProductPage.descriptionField, faker.lorem.paragraph(5))
        await addProductPage.inputText(addProductPage.metaTagTitleField, productName)

        await addProductPage.switchToTab(addProductPage.dataTab)
        expect(await addProductPage.isTabActive(addProductPage.dataTab), '"Data" tab should be active').toBeTruthy()
        await addProductPage.inputText(addProductPage.modelField, productName)
        await addProductPage.inputText(addProductPage.priceField, faker.commerce.price({ min: 10, max: 100 }))
        await addProductPage.selectListOptionRandom(addProductPage.taxClassList)
        await addProductPage.inputText(addProductPage.quantityField, '1000')
        await addProductPage.inputText(addProductPage.lengthField, '30')
        await addProductPage.inputText(addProductPage.widthField, '40')
        await addProductPage.inputText(addProductPage.heightField, '50')
        await addProductPage.selectListOptionRandom(addProductPage.lengthClassList)
        await addProductPage.inputText(addProductPage.weightField, '50')
        await addProductPage.selectListOptionRandom(addProductPage.weightClassList)

        await addProductPage.switchToTab(addProductPage.linksTab)
        expect(await addProductPage.isTabActive(addProductPage.linksTab), '"Links" tab should be active').toBeTruthy()
        await addProductPage.selectManufacturerRandom()
        await addProductPage.selectCategoryRandom()

        await addProductPage.switchToTab(addProductPage.imageTab)
        expect(await addProductPage.isTabActive(addProductPage.imageTab), '"Image" tab should be active').toBeTruthy()
        await addProductPage.uploadImage(`${productImagePath}${productImageName}`)
        await addProductPage.selectUploadedImage(productImageName)

        await addProductPage.switchToTab(addProductPage.seoTab)
        expect(await addProductPage.isTabActive(addProductPage.seoTab), '"SEO" tab should be active').toBeTruthy()
        await addProductPage.inputText(addProductPage.keywordField, faker.string.alpha(10))

        await addProductPage.saveForm()
        await expect(addProductPage.successBanner, 'Success banner should be visible').toBeVisible()
        await expect(addProductPage.successBanner, 'Success banner should have proper message').toHaveText('Success: You have modified products!')
    })
})
