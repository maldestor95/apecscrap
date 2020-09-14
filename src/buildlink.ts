import { launch } from 'puppeteer'

const buildLink = (link: string, keywords: Array<string>): string => {
    const keywordChain = keywords.reduce((a, b) => `${a}%20${b}`)
    const newLink = link.replace('$$REPLACE$$', keywordChain)
    return newLink
}

/**
 * Grab number of results from APEC website
 * @param APECLink string: link such as "https://example.com&motsCles=$$REPLACE$$&page=0" where $$REPLACE$$ will be replace by a succession of keywords
 * @param keywords Array of string
 */
export const getAPECdata = async (APECLink: string,keywords:Array<string>):Promise<string> => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(buildLink(APECLink,keywords));
    const searchValue = await page.$eval('.number-candidat span', el => el.innerHTML);
    await browser.close();
    return searchValue
}
