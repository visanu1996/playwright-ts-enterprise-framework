import { expect } from "@playwright/test";
import { BasePage } from "../../core/BasePage";

/**
 * Base page object for the Sauce Demo application.
 * Centralizes common selectors and reusable actions shared by all Sauce Demo pages,
 * including menu interactions, filtering, and error toast validation.
 */
export abstract class SauceDemoBasePage extends BasePage {
    protected commonLocators = {
        burgerMenu: 'id=react-burger-menu-btn',
        menuChoices: {
            allItems: 'text=All Items',
            about: 'text=About',
            logout: 'text=Logout',
            reset: 'text=Reset App State'
        },
        cart: '//a[@data-test="shopping-cart-link"]',
        cartBadge: '//span[@data-test="shopping-cart-badge"]',
        filter: '//select[@data-test="product-sort-container"]',
        toast: '//h3[@data-test="error"]'
    }
    async menuSelect(menu:keyof typeof this.commonLocators.menuChoices){
        let menuVisible = await this.runFunctionAndReturnStatus(this.verifyLocator(this.commonLocators.menuChoices[menu]))
        if(!menuVisible) await this.click(this.commonLocators.burgerMenu)
        await this.click(this.commonLocators.menuChoices[menu])

    }

    async filter(value: 'za'|'az'|'lohi'|'hilo'){
        let target = this.page.locator(this.commonLocators.filter)
        await target.selectOption({value:value})
        await expect(target).toHaveJSProperty('value', value)

    }

    async verifyToast(msg: string){
        let target = this.page.locator(this.commonLocators.toast)
        await expect(target).toContainText(msg, {ignoreCase:true})

    }
}