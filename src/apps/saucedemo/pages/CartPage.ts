import { SauceDemoBasePage } from "../SauceDemoBasePage";
import { expect } from "@playwright/test";

export class CartPage extends SauceDemoBasePage {
    cartLocators = {
        header : 'text=Your Cart',
        allCards : '//div[@data-test="inventory-item"]',
        backToProductPageBtn: 'id=continue-shopping',
        checkoutBtn: 'id=checkout'
    }

    async verifyPageArrive(){
        await this.verifyLocator(this.cartLocators.header)
    }

    async removeItemsFromCartPage(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.commonLocators.item.card.replace('[TO_CHANGE]',item))
            await card.locator(this.commonLocators.item.button).click()
            await expect(card.locator(this.commonLocators.item.button)).not.toBeVisible()
        }
    }

    async continueShopping(){
        await this.click(this.cartLocators.backToProductPageBtn)
        await expect(this.page.locator(this.cartLocators.header)).not.toBeVisible()
    }

    async checkout(){
        await this.click(this.cartLocators.checkoutBtn)
        await expect(this.page.locator(this.cartLocators.header)).not.toBeVisible()
    }

    async verifyItemsCount(itemsCount: number){
        let target = this.page.locator(this.cartLocators.allCards)
        await expect(target).toHaveCount(itemsCount)
    }

}