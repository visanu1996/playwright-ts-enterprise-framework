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
            allCards : '//div[@data-test="inventory-item"]',
            card: '//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and contains(text(),"[TO_CHANGE]")]]',
            name: '//div[@data-test="inventory-item-name"]',
            desc: '//div[@data-test="inventory-item-desc"]',
            price: '//div[@data-test="inventory-item-price"]',
            button: '//button'
        },
    }
    /**
     * Opens the menu if needed, then selects the requested menu entry.
     * @param menu The menu entry to select.
     */
    async menuSelect(menu:keyof typeof this.commonLocators.menuChoices){
        let menuVisible = await this.page.locator(this.commonLocators.menuChoices[menu]).isVisible()
        if(!menuVisible) await this.click(this.commonLocators.burgerMenu)
        await this.click(this.commonLocators.menuChoices[menu])

    }

    /**
     * Sorts the inventory by the selected order.
     * @param value The sort order: name ascending/descending or price ascending/descending.
     */
    async filter(value: 'za'|'az'|'lohi'|'hilo'){
        let target = this.page.locator(this.commonLocators.filter)
        await target.selectOption({value:value})
        await expect(target).toHaveJSProperty('value', value)

    }

    /**
     * Asserts that the error toast contains the expected message.
     * @param msg The message expected in the toast.
     */
    async verifyToast(msg: string){
        let target = this.page.locator(this.commonLocators.toast)
        await expect(target).toContainText(msg, {ignoreCase:true})

    }

    /**
     * Reads details for the named inventory items.
     * @param itemsName Item names to look up.
     * @returns Item details keyed by item name.
     */
    async getItemDetails(...itemsName:string[]){
        let items : Record<string,any> = []
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

    /**
     * Reads details for every inventory card currently displayed.
     * @returns Item details keyed by each item's displayed name.
     */
    async getAllItemsDetails(){
        const allItems = this.page.locator(this.commonLocators.item.allCards)
        const itemCount = await allItems.count()
        let items : Record<string,any> = []
        
        for(let index = 0; index < itemCount; index++){
            const item = allItems.nth(index)
            let [name,desc, price] = await Promise.all([
                item.locator(this.commonLocators.item.name).innerText(),
                item.locator(this.commonLocators.item.desc).innerText(),
                (await (item.locator(this.commonLocators.item.price).innerText())).split('$').slice(1),
            ])
            items[name] = {'description':desc, 'price':price,'status':'in-cart'}
        }
        return items
    }
}