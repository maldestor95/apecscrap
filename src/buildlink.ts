import { launch } from 'puppeteer'
import { DataSet, importJSON, dataInterface } from "./datamanager"


/**
 * Grab number of results from APEC website
 * @param APECLink string: link such as "https://example.com&motsCles=$$REPLACE$$&page=0" where $$REPLACE$$ will be replace by a succession of keywords
 * @param keywords Array of string
 */
export const getAPECdata = async (APECLink: string, keywords: Array<string>): Promise<number> => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(buildLink(APECLink, keywords));
    const searchValue = await page.$eval('.number-candidat span', el => el.innerHTML);
    await browser.close();
    //search value contains a gap ' ' between thousand; eg '1 398'
    return <number><unknown>searchValue.replace(/[^0-9.]/, '')
}
export enum runOptionEnum {
    ALL = 'all',
    NODATE = 'date',
    NORESULT = 'result'
}

export interface runOption {
    all: runOptionEnum
    APEClink: string
}
export const importData = async (datapath:string): Promise<DataSet> => {
    // `${__dirname}/../data.json`
    // const importDataFromJSON = await importJSON(datapath)
    //     .catch((err: string) => { console.log(err) })
        return new Promise((resolve) => {
            resolve (<DataSet>[])
        });
    // return <DataSet>await importDataFromJSON
}
const updateDatafromLink = async (keywords: Array<string>,link:string): Promise<dataInterface> => {
    const getAPECQty = await getAPECdata(link, keywords)
    const resultFormatted: dataInterface = {
        "result": getAPECQty,
        "date": new Date().toLocaleDateString(),
        "keywords": keywords
    }
    return resultFormatted
}
export const run = async (runOption: runOption): Promise<DataSet | undefined> => {
    if (runOption) console.log(`runOption : ${JSON.stringify(runOption)}`)

    const importedData = <DataSet>await importData( `${__dirname}/../data.json`)
    const newQuery = importedData.filter(data => {
        return !Object.keys(data).includes(<string>runOption.all)
    })  
    const newQueryPromise = newQuery.map(async (q) => {
        return await updateDatafromLink(q.keywords,runOption.APEClink)
    })
    const processedPromise: Promise<DataSet> = Promise.all(newQueryPromise).then((values) => {
        return values
    })
    return await processedPromise


}

const buildLink = (link: string, keywords: Array<string>): string => {
    const keywordChain = keywords.reduce((a, b) => `${a}%20${b}`)
    const newLink = link.replace('$$REPLACE$$', keywordChain)
    return newLink
}
