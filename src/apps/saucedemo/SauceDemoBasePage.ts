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
        toast: '//h3[@data-test="error"]',
        item : {
            card: '//div[@data-test="inventory-item-description" and .//div[@data-test="inventory-item-name" and contains(text(),"[TO_CHANGE]")]]',
            name: '//div[@data-test="inventory-item-name"]',
            desc: '//div[@data-test="inventory-item-desc"]',
            price: '//div[@data-test="inventory-item-price"]',
            button: '//button'
        },
    }
    async menuSelect(menu:keyof typeof this.commonLocators.menuChoices){
        let menuVisible = await this.page.locator(this.commonLocators.menuChoices[menu]).isVisible()
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

    async getItemDetails(...itemsName:string[]){
        let items : Record<string,any> = {}
        for(let item of itemsName){
            let card = this.page.locator(this.commonLocators.item.card.replace('[TO_CHANGE]',item))
            let [name,desc, price, button] = await Promise.all([
                card.locator(this.commonLocators.item.name).innerText(),
                card.locator(this.commonLocators.item.desc).innerText(),
                (await (card.locator(this.commonLocators.item.price).innerText())).split('$').slice(1),
                card.locator(this.commonLocators.item.button).innerText(),
            ])

            let status:string = button === 'Remove' ? 'in-cart' : 'not-in-cart' 
            items[name] = {'description':desc, 'price':price, 'status': status}
        }
        return items
    }
}