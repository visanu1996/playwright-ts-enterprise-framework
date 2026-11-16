import { SauceDemoBasePage } from "../SauceDemoBasePage";

export class CartPage extends SauceDemoBasePage {
    cartLocators = {
        allCards : '//div[@data-test="inventory-item"]',
        item: {
            card : '//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and contains(text(),"[TO_CHANGE]")]]',
            name: '//div[@data-test="inventory-item-name"]',
            desc: '//div[@data-test="inventory-item-desc"]',
            price: '//div[@data-test="inventory-item-price"]',
            button: '//button'
        },

    }


}