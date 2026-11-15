import { SauceDemoFacade } from '../src/apps/saucedemo/SauceDemoFacade'
import { test } from '@playwright/test'
import { sdCredential } from '../config/secret'

test.describe('SD login page',()=>{
    let sd: SauceDemoFacade
    test.beforeEach(async({page})=>{
        sd = new SauceDemoFacade(page)
        await sd.openSD()
        await sd.login.verifyLoginPage()
    })

    test('TC001 - login without username',async()=>{
        await sd.login.login('','password')
        await sd.login.verifyToast('Epic sadface: Username is required')
    })

    test('TC002 - login without password',async()=>{
        await sd.login.login('test','')
        await sd.login.verifyToast('Epic sadface: Password is required')
    })

    test('TC003 - login with unregistered credential',async()=>{
        await sd.login.login('mock','data')
        await sd.login.verifyToast('Epic sadface: Username and password do not match any user in this service')
    })

    test('TC004 - login with locked credential',async()=>{
        await sd.login.login(sdCredential.lck, sdCredential.password)
        await sd.login.verifyToast('Epic sadface: Sorry, this user has been locked out.')
    })

    test('TC005 - login with valid credential', async()=>{
        await sd.login.login(sdCredential.std, sdCredential.password)
        await sd.product.verifyPageArrive()
    })

    test('TC006 - shows available creds from login page', async()=>{
        console.log(await sd.login.getCredentials())
    })
})