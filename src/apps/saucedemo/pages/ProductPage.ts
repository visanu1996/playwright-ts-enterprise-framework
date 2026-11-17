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

    /** Asserts that the product inventory page is visible. */
    async verifyPageArrive(){
        await this.verifyLocator(this.productLocators.header)
    }

    /**
     * Adds the named items to the cart when they are not already there.
     * @param itemsName Names of the items to add.
     */
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


    /**
     * Removes the named items from the cart when they are currently in it.
     * @param itemsName Names of the items to remove.
     */
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

    /**
     * Asserts the cart badge count, or that the badge is hidden when empty.
     * @param itemsCount Expected number of items in the cart.
     */
    async verifyBadge(itemsCount: number){
        let target = this.page.locator(this.commonLocators.cartBadge)
        if(itemsCount > 0){
            await expect(target).toContainText(String(itemsCount))
        } else await expect(target).not.toBeVisible()

    }

    /** Opens the cart page from the product inventory. */
    async enterCartPage(){
        await this.click(this.commonLocators.cart)
        await expect(this.page.locator(this.productLocators.header)).not.toBeVisible()
    }

}