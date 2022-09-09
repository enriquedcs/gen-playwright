import { test, expect } from '@playwright/test'

import { loadHomepage, assertionTitle } from '../helpers'


test.describe('First Test Suite', () => {
    test('Basic test @Regression', async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageTitle = await page.locator('h1')
        await expect(pageTitle).toContainText('Example Domain')
    })
    
    test('Clicking on Elements @Regression', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.click('text=Sign In')
    
        const errorMsg = await page.locator('.alert-error')
        await expect(errorMsg).toContainText('Login and/or password are wrong')
    })
    
    test.skip('Selectors', async ({page}) => {
        //text
        await page.click("text+some text")
    
        //Css Selectors
        await page.click('button')
        await page.click('#id')
        await page.click('.class')
    
        //Only visible CSS Selector
        await page.click('.submit-button:visible')
    
        //Combinations
        await page.click('#username .first')
    
        //Xpath
        await page.click('//button')
    
    })
    
    test('Working with inputs', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        //
        await page.type('#user_login', 'some value')
        await page.type('#user_password', 'same password')
        await page.click('text=Sign In')
    
        const errorMsg = await page.locator('.alert-error')
        await expect(errorMsg).toContainText('Login and/or password are wrong')
    
    })
    
    test('Assertions @Regression', async ({page}) => {
        await page.goto('https://www.example.com')
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain")
        await expect(element).toHaveCount(1)
    
        const noElement = page.locator('h5')
        await expect(noElement).not.toBeVisible()
    
    })

})

test.describe.parallel.only("Hooks learning", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.example.com')
    })

    test('Screenshots', async ({page}) => {        
        //Screenshot
        await page.screenshot({ path: 'screenshot.png', fullPage: true})
    })

    test('Screenshots elements', async ({page}) => {
        //Screenshot element
        const element = await page.locator('h1')
        await element.screenshot({ path: 'single_el_screenshot.png'})
    })
})

test('Custome Helpers', async ({page}) => {
    await loadHomepage(page)
    //await page.pause()
    await assertionTitle(page)
})