import { Page } from '@playwright/test'
import { websUrl } from '../../../config/config'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
/**
 * Entry point for the Sauce Demo application.
 * Exposes page objects for login, product, cart, and checkout workflows.
 */
export class SauceDemoFacade {
    page : Page
    login : LoginPage
    product : ProductPage
    cart : CartPage
    checkout : CheckoutPage

    constructor(page:Page){
        this.page = page
        this.login = new LoginPage(page)
        this.product = new ProductPage(page)
        this.cart = new CartPage(page)
        this.checkout = new CheckoutPage(page)
    }
    
    /** Navigates to the configured Sauce Demo URL. */
    async openSD(){
        await this.page.goto(websUrl.sd)
    }

}