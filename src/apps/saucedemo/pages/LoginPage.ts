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

    /** Asserts that the login form is visible. */
    async verifyLoginPage(){
        await this.verifyLocator(this.loginLocators.userInput)
    }

    /**
     * Fills in and submits the login form.
     * @param username Account username.
     * @param password Account password.
     */
    async login(username:string, password:string){
        await this.fill(this.loginLocators.userInput,username)
        await this.fill(this.loginLocators.passwordInput,password)
        await this.click(this.loginLocators.loginBtn)
        
    }

    /** Returns the account credentials displayed on the login page. */
    async getCredentials(){
        let target = this.page.locator(this.loginLocators.availableCreds)
        let creds = await target.innerText()
        return creds.split('\n').slice(1).filter((cred) => cred)
    }

    
}