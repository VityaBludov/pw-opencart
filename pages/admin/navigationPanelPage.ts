import { expect, Locator, Page } from '@playwright/test'

export class NavigationPanelPage {
    readonly page: Page
    readonly navigationPanel: Locator
    readonly mainMenuItemSystem: Locator
    readonly systemMenuItemUsers: Locator
    readonly systemUsersMenuLinkUsers: Locator

    constructor(page: Page) {
        this.page = page
        this.navigationPanel          = this.page.locator('#column-left')
        this.mainMenuItemSystem       = this.navigationPanel.locator('#menu-system')
        this.systemMenuItemUsers      = this.mainMenuItemSystem.locator('li', { hasText: 'Users' }).first()
        this.systemUsersMenuLinkUsers = this.systemMenuItemUsers.locator('li', { hasText: 'Users' }).first()
    }

    async expandMenu(menuItem: Locator) {
        await expect(menuItem, 'Menu item to be expanded should be visible').toBeVisible()
        const collapsible = menuItem.locator('a').first()
        const isExpanded = (await collapsible.getAttribute('class'))?.match(/(collapsed)/)?.[0]
        
        if ((isExpanded === 'collapsed') || !isExpanded) {
            await menuItem.click()
        }
        await expect(collapsible).toHaveAttribute('aria-expanded', 'true')
    }

    async clickPageLink(menuLink: Locator, targetPage: string) {
        await expect(menuLink, 'Link should be visible').toBeVisible()
        await menuLink.click()
        await this.page.waitForURL(`${targetPage}**`)
    }
}
