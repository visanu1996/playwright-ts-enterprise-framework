import { SauceDemoBasePage } from "../SauceDemoBasePage";

/**
 * Page object for the Sauce Demo inventory/products page.
 * Contains selectors and assertions for page-level product listing verification.
 */
export class ProductPage extends SauceDemoBasePage{
    private productLocators= {
        header:'text=Products'
    }

    async verifyPageArrive(){
        await this.verifyLocator(this.productLocators.header)
    }
}