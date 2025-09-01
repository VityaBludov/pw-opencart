import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/helper'

export class AddProductPage {
    readonly page: Page
    readonly navTabs: Locator

    readonly generalTab: Locator
    readonly productNameField: Locator
    readonly descriptionField: Locator
    readonly metaTagTitleField: Locator

    readonly dataTab: Locator
    readonly modelField: Locator
    readonly priceField: Locator
    readonly taxClassList: Locator
    readonly quantityField: Locator
    readonly lengthField: Locator
    readonly widthField: Locator
    readonly heightField: Locator
    readonly lengthClassList: Locator
    readonly weightField: Locator
    readonly weightClassList: Locator

    readonly linksTab: Locator
    readonly manufacturerField: Locator
    readonly manufacturerList: Locator
    readonly categoriesField: Locator
    readonly categoriesList: Locator

    readonly imageTab: Locator
    readonly editImageButton: Locator
    readonly imageModal: Locator
    readonly uploadButton: Locator

    readonly seoTab: Locator
    readonly keywordField: Locator

    readonly saveButton: Locator
    readonly returnButton: Locator
    readonly successBanner: Locator

    constructor(page: Page) {
        this.page = page
        this.navTabs           = this.page.locator('.nav-tabs').first()

        this.generalTab        = this.navTabs.locator('li', { hasText: 'General' })
        this.productNameField  = this.page.getByRole('textbox', { name: 'Product Name' })
        this.descriptionField  = this.page.frameLocator('iframe').getByRole('textbox')
        this.metaTagTitleField = this.page.getByRole('textbox', { name: 'Meta Tag Title' })

        this.dataTab           = this.navTabs.locator('li', { hasText: 'Data' })
        this.modelField        = this.page.getByRole('textbox', { name: 'Model' })
        this.priceField        = this.page.getByRole('textbox', { name: 'Price' })
        this.taxClassList      = this.page.getByRole('combobox', { name: 'Tax Class' })
        this.quantityField     = this.page.getByRole('textbox', { name: 'Quantity' }).first()
        this.lengthField       = this.page.locator('[placeholder="Length"]')
        this.widthField        = this.page.locator('[placeholder="Width"]')
        this.heightField       = this.page.locator('[placeholder="Height"]')
        this.lengthClassList   = this.page.getByRole('combobox', { name: 'Length Class' })
        this.weightField       = this.page.locator('[placeholder="Weight"]')
        this.weightClassList   = this.page.getByRole('combobox', { name: 'Weight Class' })

        this.linksTab          = this.navTabs.locator('li', { hasText: 'Links' })
        this.manufacturerField = this.page.getByRole('textbox', { name: 'Manufacturer' })
        this.manufacturerList  = this.page.locator('#autocomplete-manufacturer')
        this.categoriesField   = this.page.getByRole('textbox', { name: 'Categories' })
        this.categoriesList    = this.page.locator('#autocomplete-category')

        this.imageTab          = this.navTabs.locator('li', { hasText: 'Image' })
        this.editImageButton   = this.page.getByRole('button', { name: 'Edit' })
        this.imageModal        = this.page.locator('.modal-dialog')
        this.uploadButton      = this.page.locator('.fa-upload')

        this.seoTab            = this.navTabs.locator('li', { hasText: 'SEO' })
        this.keywordField      = this.page.getByRole('textbox', { name: 'Keyword' })

        this.saveButton        = this.page.locator('.fa-floppy-disk')
        this.returnButton      = this.page.locator('[aria-label="Back"]')
        this.successBanner     = this.page.locator('#alert')
    }

    async isTabActive(tab: Locator): Promise<boolean> {
        const isActive = await tab.locator('a').getAttribute('aria-selected')
        
        if (isActive === 'true') {
            return true
        } else {
            return false
        }
    }

    async inputText(field: Locator, text: string) {
        await expect(field, 'Target input field should be editable').toBeEditable()
        await field.fill(text)
    }

    async selectListOptionRandom(list: Locator) {
        const listLength = (await list.getByRole('option').all()).length
        const index = Math.floor(Math.random() * listLength)

        await expect(list, 'List options should be visible').toBeVisible()
        await list.selectOption({ index: index })
    }

    async switchToTab(tab: Locator) {
        await expect(tab, 'Target tab should be visible').toBeVisible()
        await tab.click()
    }

    async selectManufacturerRandom() {
        await expect(this.manufacturerField, 'Manufacturer field should be visible').toBeVisible()
        await this.manufacturerField.click()
        await this.page.waitForResponse(`${urls.endpoint.admin.manufacturers}**`)
        await expect(this.manufacturerList, 'Manufacturer list options should be visible').toBeVisible()

        const listLength = (await this.manufacturerList.locator('li').all()).length
        const index = Math.floor(Math.random() * listLength)

        await this.manufacturerList.locator('li').nth[index]
    }

    async selectCategoryRandom() {
        await expect(this.categoriesField, 'Categories field should be visible').toBeVisible()
        await this.categoriesField.click()
        await this.page.waitForResponse(`${urls.endpoint.admin.categories}**`)
        await expect(this.categoriesList, 'Categories list options should be visible').toBeVisible()

        const listLength = (await this.categoriesList.locator('li').all()).length
        const index = Math.floor(Math.random() * listLength)

        await this.categoriesList.locator('li').nth[index]
    }

    async uploadImage(path: string) {
        await expect(this.editImageButton, '"Edit" button should be visible').toBeVisible()
        await this.editImageButton.click()
        await this.page.waitForResponse(`${urls.endpoint.admin.images}**`)

        await expect(this.uploadButton, '"Upload" button should be visible').toBeVisible()
        const fileChoosePromise = this.page.waitForEvent('filechooser')
        await this.uploadButton.click()
        const fileChooser = await fileChoosePromise
        await fileChooser.setFiles(path)
    }

    async selectUploadedImage(name: string) {
        await expect(this.imageModal, 'Image select modal should be visible').toBeVisible()
        const imageThumb = this.page.locator(`[title="${name}"]`)
        await imageThumb.click()
    }

    async saveForm() {
        await expect(this.saveButton, 'Save button should be visible').toBeVisible()
        await this.saveButton.click()
        await this.page.waitForResponse(`${urls.endpoint.admin.products}**`)
    }

    async returnToProductsPage() {
        await expect(this.returnButton, 'Return button should be visible').toBeVisible()
        await this.returnButton.click()
        await this.page.waitForURL(`${urls.admin.products}**`)
    }
}
