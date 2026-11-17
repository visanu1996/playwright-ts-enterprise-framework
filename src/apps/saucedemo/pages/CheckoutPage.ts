import { SauceDemoBasePage } from "../SauceDemoBasePage";
import { expect } from "@playwright/test";

/** Page object for checkout information, order review, and order completion. */
export class CheckoutPage extends SauceDemoBasePage{
    checkoutLocators = {
        header : 'text=Checkout: Your Information',
        infomation: {
            fnameInput : 'id=first-name',
            lnameInput : 'id=last-name',
            postalInput: 'id=postal-code',
            continueBtn : 'id=continue',
        },
        overview : {
            paymentInfo : '//div[@data-test="payment-info-value"]',
            shippingInfo : '//div[@data-test="shipping-info-value"]',
            itemsPrice : '//div[@data-test="subtotal-label"]',
            tax : '//div[@data-test="tax-label"]',
            totalPrice: '//div[@data-test="total-label"]',
            finishBtn: 'id=finish'
        },
        completeHeader : '//h2[@data-test="complete-header"]',
    }

    /** Asserts that the checkout information form is visible. */
    async verifyCheckoutPageArrive(){
        await this.verifyLocator(this.checkoutLocators.header)
    }

    /**
     * Fills and submits the checkout information form.
     * @param fname Customer's first name.
     * @param lname Customer's last name.
     * @param postal Customer's postal code.
     */
    async informCheckout(fname: string, lname: string, postal: string){
        await this.fill(this.checkoutLocators.infomation.fnameInput,fname)
        await this.fill(this.checkoutLocators.infomation.lnameInput,lname)
        await this.fill(this.checkoutLocators.infomation.postalInput,postal)
        await this.click(this.checkoutLocators.infomation.continueBtn)
    }

    /** Reads payment, shipping, subtotal, tax, and total information from the order overview. */
    async getInvoiceInfomation(){
        let invoiceDetails : Record<string,any> = {}
        let [paymentInfo, shippingInfo, itemPrice, tax, totalPrice] = await Promise.all([
            this.page.locator(this.checkoutLocators.overview.paymentInfo).innerText(),
            this.page.locator(this.checkoutLocators.overview.shippingInfo).innerText(),
            (await this.page.locator(this.checkoutLocators.overview.itemsPrice).innerText()).split('$').slice(1),
            (await this.page.locator(this.checkoutLocators.overview.tax).innerText()).split('$').slice(1),
            (await this.page.locator(this.checkoutLocators.overview.totalPrice).innerText()).split('$').slice(1),
        ])

        return invoiceDetails = {
            'paymentInfo':paymentInfo,
            'shippingInfo':shippingInfo,
            'itemPrice':itemPrice,
            'tax': tax,
            'totalPrice': totalPrice
        } 
    }

    /**
     * Asserts that item prices match the invoice subtotal and that subtotal plus tax matches the total.
     * @param itemDetails Item details keyed by item name.
     * @param invoiceDetails Invoice values returned by getInvoiceInfomation().
     */
    async verifySummary(itemDetails:Record<string,any>, invoiceDetails: Record<string,any>){
        let itemPrice : number = 0
        for(let [name,details] of Object.entries(itemDetails)){
            itemPrice += Number(details.price)
        }

        let totalPrice : number = itemPrice + Number(invoiceDetails.tax)
        expect(itemPrice).toEqual(Number(invoiceDetails.itemPrice))
        expect(totalPrice).toEqual(Number(invoiceDetails.totalPrice))
    }

    /**
     * Asserts the number of item cards shown in the order overview.
     * @param itemsCount Expected number of item cards.
     */
    async verifyItemsCount(itemsCount: number){
        let target = this.page.locator(this.commonLocators.item.allCards)
        await expect(target).toHaveCount(itemsCount)
    }

    /** Asserts that the order-completion confirmation is displayed. */
    async verifyCompletePayment(){
        await expect(this.page.locator(this.checkoutLocators.completeHeader)).toContainText('thank you for your order',{ignoreCase:true})
    }

    /** Submits the reviewed order and completes checkout. */
    async finishCheckout(){
        await this.click(this.checkoutLocators.overview.finishBtn)
    }

}