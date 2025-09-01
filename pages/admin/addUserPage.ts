import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/config'

export class AddUserPage {
    readonly page: Page
    readonly usernameField: Locator
    readonly userGroupList: Locator
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly confirmField: Locator
    readonly statusSwitch: Locator
    readonly saveButton: Locator
    readonly returnButton: Locator
    readonly successBanner: Locator

    constructor(page: Page) {
        this.page = page

        this.usernameField  = this.page.getByRole('textbox', { name: 'Username' })
        this.userGroupList  = this.page.getByRole('combobox', { name: 'User Group' })
        this.firstNameField = this.page.getByRole('textbox', { name: 'First Name' })
        this.lastNameField  = this.page.getByRole('textbox', { name: 'Last Name' })
        this.emailField     = this.page.getByRole('textbox', { name: 'E-Mail' })
        this.passwordField  = this.page.getByRole('textbox', { name: 'Password' })
        this.confirmField   = this.page.getByRole('textbox', { name: 'Confirm' })
        this.statusSwitch   = this.page.getByRole('checkbox')
        this.saveButton     = this.page.locator('.fa-floppy-disk')
        this.returnButton   = this.page.locator('.btn-light')
        this.successBanner  = this.page.locator('#alert')
    }

    async inputText(field: Locator, text: string) {
        await expect(field, 'Target input field should be editable').toBeEditable()
        await field.fill(text)
    }
    
    async setUserGroupRandom() {
        const listLength = (await this.userGroupList.getByRole('option').all()).length
        const index = Math.floor(Math.random() * listLength)
        
        await expect(this.userGroupList, 'User group list should be visible').toBeVisible()
        await this.userGroupList.selectOption({ index: index })
    }

    async setStatusActive() {
        await expect(this.statusSwitch, 'Status switch should be visible').toBeVisible()
        await this.statusSwitch.check()
    }

    async saveForm() {
        await expect(this.saveButton, 'Save button should be visible').toBeVisible()
        await this.saveButton.click()
    }

    async returnToUsersPage() {
        await expect(this.returnButton, 'Return button should be visible').toBeVisible()
        await this.returnButton.click()
        await this.page.waitForURL(`${urls.admin.users}**`)
    }
}
