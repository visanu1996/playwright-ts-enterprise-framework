import { SauceDemoFacade } from "../../src/apps/saucedemo/SauceDemoFacade";
import { sdCredential } from "../../config/secret";
import { test, expect } from '@playwright/test'

test.describe('SD checkout page', ()=>{
    let sd: SauceDemoFacade
    let productItems: Record<string, { description: string; price: string[]; status: string }>
    const initialItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']


    test.beforeEach(async({page})=>{
        sd = new SauceDemoFacade(page)
        await sd.openSD()
        await sd.login.login(sdCredential.std,sdCredential.password)
        await sd.product.addItems(...initialItems)
        await sd.product.enterCartPage()
        productItems = await sd.cart.getAllItemsDetails()
        console.log(productItems);
        await sd.cart.checkout()
        await sd.checkout.verifyCheckoutPageArrive()
    })

    test('TC001 - requires a first name',async()=>{
        await sd.checkout.informCheckout('', 'Doe', '12345')
        await sd.checkout.verifyToast('Error: First Name is required')
    })

    test('TC002 - requires a last name',async()=>{
        await sd.checkout.informCheckout('Jane', '', '12345')
        await sd.checkout.verifyToast('Error: Last Name is required')
    })

    test('TC003 - requires a postal code',async()=>{
        await sd.checkout.informCheckout('Jane', 'Doe', '')
        await sd.checkout.verifyToast('Error: Postal Code is required')
    })

    test('TC004 - completes checkout and verifies the order summary',async()=>{
        await sd.checkout.informCheckout('Jane', 'Doe', '12345')
        await sd.checkout.verifyItemsCount(initialItems.length)

        const invoice = await sd.checkout.getInvoiceInfomation()
        await sd.checkout.verifySummary(productItems, invoice)

        await sd.checkout.finishCheckout()
        await sd.checkout.verifyCompletePayment()
    })
})