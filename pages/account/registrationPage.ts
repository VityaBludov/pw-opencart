import { expect, Locator, Page } from '@playwright/test'
import { urls } from '../../resources/config'

export class RegistrationPage {
    readonly page: Page
    private readonly firstNameField: Locator
    private readonly lastNameField: Locator
    private readonly emailField: Locator
    private readonly passwordField: Locator
    private readonly newsletterSwitch: Locator
    private readonly policySwitch: Locator
    private readonly submitButton: Locator

    constructor(page: Page) {
        this.page = page

        this.firstNameField   = this.page.getByRole('textbox', { name: 'First Name' })
        this.lastNameField    = this.page.getByRole('textbox', { name: 'Last Name' })
        this.emailField       = this.page.getByRole('textbox', { name: 'E-Mail' })
        this.passwordField    = this.page.getByRole('textbox', { name: 'Password' })
        this.newsletterSwitch = this.page.locator('#input-newsletter')
        this.policySwitch     = this.page.locator('#input-agree')
        this.submitButton     = this.page.getByRole('button', { name: 'Continue' })
    }

    async inputFirstName(name: string) {
        await expect(this.firstNameField, 'First name field should be visible').toBeVisible()
        await expect(this.firstNameField, 'First name field should be editable').toBeEditable()
        await this.firstNameField.fill(name)
    }

    async inputLastName(name: string) {
        await expect(this.lastNameField, 'Last name field should be visible').toBeVisible()
        await expect(this.lastNameField, 'Last name field should be editable').toBeEditable()
        await this.lastNameField.fill(name)
    }

    async inputEmail(email: string) {
        await expect(this.emailField, 'Email field should be visible').toBeVisible()
        await expect(this.emailField, 'Email field should be editable').toBeEditable()
        await this.emailField.fill(email)
    }

    async inputPassword(password: string) {
        await expect(this.passwordField, 'Password field should be visible').toBeVisible()
        await expect(this.passwordField, 'Password field should be editable').toBeEditable()
        await this.passwordField.fill(password)
    }

    async checkNewsletter() {
        await expect(this.newsletterSwitch, 'Newsletter switch should be visible').toBeVisible()
        await expect(this.newsletterSwitch, 'Newsletter switch should be editable').toBeEditable()
        await this.newsletterSwitch.check()
    }

    async checkPolicy() {
        await expect(this.policySwitch, 'Policy switch should be visible').toBeVisible()
        await expect(this.policySwitch, 'Policy switch should be editable').toBeEditable()
        await this.policySwitch.check()
    }

    async clickSubmitButton(toBeSuccessful: boolean) {
        await expect(this.submitButton, 'Form submit button should be visible').toBeVisible()
        await this.submitButton.click()
        if (toBeSuccessful) {
            await this.page.waitForURL(`${urls.page.accountCreated}**`)
        }
    }
}
