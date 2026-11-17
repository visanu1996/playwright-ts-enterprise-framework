import { SauceDemoFacade } from "../../src/apps/saucedemo/SauceDemoFacade";
import { sdCredential } from "../../config/secret";
import { test, expect } from '@playwright/test';
import { csvReader } from "../../src/utils/csvReader";
import { writeCSV } from "../../src/utils/writeCSV";

test.describe.serial('SD data driven testing', ()=>{
    let sd : SauceDemoFacade
    let testData: Record<any,any>[]
    testData = csvReader('checkout-cases.csv')
    testData = testData.map((row:Record<any,any>) => {return {...row,Result: 'Not Execute'}})

    test.beforeEach(async({page})=>{
        sd = new SauceDemoFacade(page)
        await sd.openSD()
    })

    test.afterAll(async()=>{
        const now = new Date()
        const dateTime = `${now.toLocaleDateString('en-CA')}_${now.toTimeString().slice(0, 8).replace(/:/g, '')}`
        writeCSV(testData,`sauce-demo-${dateTime}-result.csv`)
        
    })

    for(let [index, data] of testData.entries()){
        test(`Data driven testing - ${data.ID}`, async()=>{
            let productItems : Record<string,any>
            try {
                // prepare data
                const products: string[] = data.Products.split('|')
                const [fname,lname,postalCode] = data.CheckoutInformation.split('|')

                await test.step('Login SD',async()=>{
                await sd.login.verifyLoginPage()
                await sd.login.login(sdCredential.std, sdCredential.password)
                })
               

                await test.step('Adding products', async()=>{
                    await sd.product.verifyPageArrive()
                    await sd.product.addItems(...products)
                    productItems = await sd.product.getItemDetails(...products)
                    await sd.product.enterCartPage()
                })

                await test.step('Validate Cart', async()=>{
                    let cartItems = await sd.cart.getAllItemsDetails()
                    expect(cartItems).toEqual(productItems)
                    await sd.cart.checkout()
                })


                // Checkout
                await test.step('Verify checkout success', async()=>{
                    await sd.checkout.verifyCheckoutPageArrive()
                    await sd.checkout.informCheckout(fname, lname, postalCode)
                    let invioceDetails = await sd.checkout.getInvoiceInfomation()
                    await sd.checkout.verifySummary(productItems, invioceDetails)
                    await sd.checkout.finishCheckout()
                    await sd.checkout.verifyCompletePayment()
                })


                if(testData[index]) testData[index].Result = "Pass" 

            } catch (error) {
                if(testData[index]) testData[index].Result = "Fail"
                throw error
            }
        
        })
    }
})
