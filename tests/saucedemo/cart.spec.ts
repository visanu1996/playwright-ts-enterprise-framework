import { SauceDemoFacade } from "../../src/apps/saucedemo/SauceDemoFacade";
import {test, expect} from '@playwright/test'
import { sdCredential } from "../../config/secret";

test.describe('SD cart page', ()=>{
    let sd : SauceDemoFacade
    let productItems: Record<string, { description: string; price: string[]; status: string }>
    const initialItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']

    test.beforeEach(async({page})=>{
        sd = new SauceDemoFacade(page)
        await sd.openSD()
        await sd.login.login(sdCredential.std,sdCredential.password)
        await sd.product.addItems(...initialItems)
        productItems = await sd.product.getItemDetails(...initialItems)
        await sd.product.enterCartPage()
        await sd.cart.verifyPageArrive()
    })

    test('TC001 - compare product items detail with cart items detail', async()=>{
        const cartItems = await sd.cart.getAllItemsDetails()
        expect(cartItems).toEqual(productItems)
    })

    test('TC002 - removes an item from the cart', async({page})=>{
        await sd.cart.removeItemsFromCartPage('Sauce Labs Backpack')
        await sd.cart.verifyItemsCount(1)
        await expect(page.getByText('Sauce Labs Backpack', {exact: true})).not.toBeVisible()
        await expect(page.getByText('Sauce Labs Bike Light', {exact: true})).toBeVisible()
    })

    test('TC003 - add more item from product page and verify', async()=>{
        await sd.cart.continueShopping()
        await sd.product.addItems('Sauce Labs Bolt T-Shirt')
        await sd.product.verifyBadge(3)
        await sd.product.enterCartPage()
        await sd.cart.verifyItemsCount(3)

    })
    
})