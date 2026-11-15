import { Page } from '@playwright/test'
import { websUrl } from '../../../config/config'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'

/**
 * High-level facade for the Sauce Demo application.
 * Provides a simple entry point for navigating the app and accessing page objects
 * for the main user flows such as login and product browsing.
 */
export class SauceDemoFacade {
    page : Page
    login : LoginPage
    product : ProductPage
    constructor(page:Page){
        this.page = page
        this.login = new LoginPage(page)
        this.product = new ProductPage(page)
    }
    
    /**
     * Open SD web application.
     */
    async openSD(){
        await this.page.goto(websUrl.sd)
    }

}