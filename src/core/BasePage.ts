import { expect, Page } from '@playwright/test'

/**
 * Shared browser-page utilities used across all Playwright page object classes.
 * Provides common actions such as clicking, filling inputs, verifying visibility,
 * and handling repeated logic for page-level interactions.
 */
export abstract class BasePage {
    protected page : Page

    constructor(page: Page){
        this.page = page
    }

    async uploadFiles(locator:string ,...fileNames:string[]){
        let target = this.page.locator(locator)
        let files:string[] = []

        for(let file in fileNames){
            files.push('../data/'+file)
        }

        await target.setInputFiles(files)
    
    }

    async click(locator:string, options?:{timeout?: number, force?: boolean}){
        let target = this.page.locator(locator)
        await target.click({timeout: options?.timeout, force: options?.force})

    }

    async fill(locator: string, msg: string, options?:{timeout?: number, isSecret?: boolean}){
        let target = this.page.locator(locator)
        await expect(target).toBeVisible()
        await target.fill(msg,{timeout: options?.timeout})
        if(options?.isSecret) console.log(`Filled locator: ${locator}.\n`);
        else console.log(`Filled locator: ${locator}, with ${msg}.\n`);

    }

    protected async verifyLocator(locator: string){
        let target = this.page.locator(locator)
        await expect(target).toBeVisible()
    }

    async runFunctionAndReturnStatus(func: Promise<any>){
        try {
            await func
            return true
        } catch {
            return false
        }
    }

}