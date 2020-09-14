import { launch } from 'puppeteer'

// const APECLink = "https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=ing%C3%A9nieur%20systeme&page=0"
const APECLink = "https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=$$REPLACE$$&page=0"
//  const APECLink= "http://www.ludovicdeparis.fr/#/about"
//  const APECLink= "abc"


const keywords = ['ingenieur', 'systeme','english']
const buildLink = (link: string, keywords: Array<string>): string => {
    const keywordChain = keywords.reduce((a, b) => `${a}%20${b}`)
    const newLink = APECLink.replace('$$REPLACE$$', keywordChain)
    return newLink
}

const getAPECdata = async (APECLink: string) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(APECLink);
    const searchValue = await page.$eval('.number-candidat span', el => el.innerHTML);
    await browser.close();
    return searchValue
}

const main = async ()=>{
    const link = buildLink(APECLink, keywords)
    console.log(link)

    console.log(await getAPECdata(link))
}

main()