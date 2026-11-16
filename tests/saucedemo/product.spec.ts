import { SauceDemoFacade } from '../../src/apps/saucedemo/SauceDemoFacade'
import { sdCredential } from '../../config/secret'
import { expect, test } from '@playwright/test'

test.describe('SD product page', () => {
    let sd: SauceDemoFacade

    test.beforeEach(async ({ page }) => {
        sd = new SauceDemoFacade(page)
        await sd.openSD()
        await sd.login.verifyLoginPage()
        await sd.login.login(sdCredential.std, sdCredential.password)
        await sd.product.verifyPageArrive()
    })

    test('TC001 - verify items detail is correct', async () => {
        const items = await sd.product.getItemsDetail('Sauce Labs Backpack','Sauce Labs Bike Light')
        expect(items['Sauce Labs Backpack']).toMatchObject({price: ['29.99']})
        expect(items['Sauce Labs Bike Light']).toMatchObject({price: ['9.99']})
    })

    test('TC002 - adds multiple products to the cart then verify it', async () => {
        await sd.product.addItems('Sauce Labs Backpack', 'Sauce Labs Bike Light')

        const items = await sd.product.getItemsDetail('Sauce Labs Backpack','Sauce Labs Bike Light')
        expect(items['Sauce Labs Backpack'].status).toBe('in-cart')
        expect(items['Sauce Labs Bike Light'].status).toBe('in-cart')

    })

    test('TC003 - removes a product while keeping other products in the cart then verify it', async () => {
        await sd.product.addItems('Sauce Labs Backpack', 'Sauce Labs Bike Light')
        await sd.product.removeItems('Sauce Labs Backpack')

        const items = await sd.product.getItemsDetail('Sauce Labs Backpack','Sauce Labs Bike Light')
        expect(items['Sauce Labs Backpack'].status).toBe('not-in-cart')
        expect(items['Sauce Labs Bike Light'].status).toBe('in-cart')
    })

    test('TC004 - Filter product', async()=>{
        await sd.product.filter('lohi')
        await sd.product.filter('hilo')
        await sd.product.filter('za')
        await sd.product.filter('az')

    })

    test('TC005 - Reset app state then verify items and badge', async()=>{
        await sd.product.addItems('Sauce Labs Backpack', 'Sauce Labs Bike Light')
        await sd.product.verifyBadge(2)

        await sd.product.menuSelect('reset')
        await sd.product.verifyBadge(0)

        const items = await sd.product.getItemsDetail('Sauce Labs Backpack','Sauce Labs Bike Light')
        expect(items['Sauce Labs Backpack'].status).toBe('not-in-cart')
        expect(items['Sauce Labs Bike Light'].status).toBe('not-in-cart')   
    })
})