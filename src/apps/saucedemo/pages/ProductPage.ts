import { expect } from "@playwright/test";
import { SauceDemoBasePage } from "../SauceDemoBasePage";

/**
 * Page object for the Sauce Demo inventory/products page.
 * Contains selectors and assertions for page-level product listing verification.
 */
export class ProductPage extends SauceDemoBasePage{
    private productLocators= {
        header:'text=Products',
        item : {
            card: '//div[@data-test="inventory-item-description" and .//div[@data-test="inventory-item-name" and contains(text(),"[TO_CHANGE]")]]',
            name: '//div[@data-test="inventory-item-name"]',
            desc: '//div[@data-test="inventory-item-desc"]',
            price: '//div[@data-test="inventory-item-price"]',
            button: '//button'
        },
        
    }

    async verifyPageArrive(){
        await this.verifyLocator(this.productLocators.header)
    }

    async getItemsDetail(...itemsName:string[]){
        let items : Record<string,any> = {}
        for(let item of itemsName){
            let card = this.page.locator(this.productLocators.item.card.replace('[TO_CHANGE]',item))
            let [name,desc, price, button] = await Promise.all([
                card.locator(this.productLocators.item.name).innerText(),
                card.locator(this.productLocators.item.desc).innerText(),
                (await (card.locator(this.productLocators.item.price).innerText())).split('$').slice(1),
                card.locator(this.productLocators.item.button).innerText(),
            ])

            let status:string = button === 'Remove' ? 'in-cart' : 'not-in-cart' 
            items[name] = {'description':desc, 'price':price, 'status': status}
        }
        return items
    }

    async addItems(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.productLocators.item.card.replace('[TO_CHANGE]',item))
            let button = card.locator(this.productLocators.item.button)

            if(await button.innerText() === "Add to cart"){
                await button.click()
                button = card.locator(this.productLocators.item.button)
                await expect(button).toContainText('Remove')
                console.log(`Add item : ${item}, in cart.`);

            }else console.log(`Item : ${item} is already in cart.`);
        }
    }


    async removeItems(...itemsName:string[]){
        for(let item of itemsName){
            let card = this.page.locator(this.productLocators.item.card.replace('[TO_CHANGE]',item))
            let button = card.locator(this.productLocators.item.button)

            if(await button.innerText() === "Remove"){
                await button.click()
                button = card.locator(this.productLocators.item.button)
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

}