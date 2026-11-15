import { SauceDemoBasePage } from '../SauceDemoBasePage'

/**
 * Page object for the Sauce Demo login screen.
 * Encapsulates login form interactions, validation checks, and credential retrieval.
 */
export class LoginPage extends SauceDemoBasePage{
    private loginLocators = {
        userInput: 'id=user-name',
        passwordInput: 'id=password',
        loginBtn: 'id=login-button',
        toast: '//h3[@data-test="error"]',
        availableCreds: 'id=login_credentials'
    }

    async verifyLoginPage(){
        await this.verifyLocator(this.loginLocators.userInput)
    }

    async login(username:string, password:string){
        await this.fill(this.loginLocators.userInput,username)
        await this.fill(this.loginLocators.passwordInput,password)
        await this.click(this.loginLocators.loginBtn)
        
    }

    async getCredentials(){
        let target = this.page.locator(this.loginLocators.availableCreds)
        let creds = await target.innerText()
        return creds.split('\n').slice(1).filter((cred) => cred)
    }

    
}