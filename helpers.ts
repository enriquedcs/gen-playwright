export async function loadHomepage(page) {
    await page.goto('https://www.example.com')
}

export async function assertionTitle(page) {
    await page.waitForSelector('h1')
}