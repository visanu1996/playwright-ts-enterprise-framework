import { SauceDemoBasePage } from "../SauceDemoBasePage";
import { expect } from "@playwright/test";

/** Page object for viewing and managing items in the shopping cart. */
export class CartPage extends SauceDemoBasePage {
    cartLocators = {
        header : 'text=Your Cart',
        backToProductPageBtn: 'id=continue-shopping',
        checkoutBtn: 'id=checkout'
    }

    /** Asserts that the cart page is visible. */
    async verifyPageArrive(){
        await this.verifyLocator(this.cartLocators.header)
    }

    /**
     * Removes the named items from the cart.
     * @param itemsName Names of the items to remove.
     */
    async removeItemsFromCartPage(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.commonLocators.item.card.replace('[TO_CHANGE]',item))
            await card.locator(this.commonLocators.item.button).click()
            await expect(card.locator(this.commonLocators.item.button)).not.toBeVisible()
        }
    }

    /** Returns from the cart to the product inventory. */
    async continueShopping(){
        await this.click(this.cartLocators.backToProductPageBtn)
        await expect(this.page.locator(this.cartLocators.header)).not.toBeVisible()
    }

    /** Starts checkout from the cart. */
    async checkout(){
        await this.click(this.cartLocators.checkoutBtn)
        await expect(this.page.locator(this.cartLocators.header)).not.toBeVisible()
    }

    /**
     * Asserts the number of item cards currently in the cart.
     * @param itemsCount Expected number of item cards.
     */
    async verifyItemsCount(itemsCount: number){
        let target = this.page.locator(this.commonLocators.item.allCards)
        await expect(target).toHaveCount(itemsCount)
    }

}