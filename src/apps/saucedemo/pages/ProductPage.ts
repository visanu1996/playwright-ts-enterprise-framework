import { expect } from "@playwright/test";
import { SauceDemoBasePage } from "../SauceDemoBasePage";

/**
 * Page object for the Sauce Demo inventory/products page.
 * Contains selectors and assertions for page-level product listing verification.
 */
export class ProductPage extends SauceDemoBasePage{
    private productLocators= {
        header:'text=Products',        
    }

    async verifyPageArrive(){
        await this.verifyLocator(this.productLocators.header)
    }

    async addItems(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.commonLocators.item.card.replace('[TO_CHANGE]',item))
            let button = card.locator(this.commonLocators.item.button)

            if(await button.innerText() === "Add to cart"){
                await button.click()
                button = card.locator(this.commonLocators.item.button)
                await expect(button).toContainText('Remove')
                console.log(`Add item : ${item}, in cart.`);

            }else console.log(`Item : ${item} is already in cart.`);
        }
    }


    async removeItems(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.commonLocators.item.card.replace('[TO_CHANGE]',item))
            let button = card.locator(this.commonLocators.item.button)

            if(await button.innerText() === "Remove"){
                await button.click()
                button = card.locator(this.commonLocators.item.button)
                await expect(button).toContainText('Add to cart')
                console.log(`Remove item : ${item}, from cart.`);
                
            }else console.log(`Item : ${item} is not in cart.`);
        }
    }

    async verifyBadge(itemsCount: number){
        let target = this.page.locator(this.commonLocators.cartBadge)
        if(itemsCount > 0){
            await expect(target).toContainText(itemsCount.toString())
        } else await expect(target).not.toBeVisible()

    }

    async enterCartPage(){
        await this.click(this.commonLocators.cart)
    }

}