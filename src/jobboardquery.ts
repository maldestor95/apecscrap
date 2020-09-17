import * as querystring from "querystring"
import { launch } from 'puppeteer'

export const BoardEngine: JOBBoards = {
    "APEC": {
        where: 'lieux',
        words: 'motsCles',
        keywordSeparator: ' ',
        url: 'https://www.apec.fr/candidat/recherche-emploi.html/emploi',
        cssSelector: '.number-candidat span',
        cssParsefunction: (x:string):number => Number(x.replace(/\s/g, ''))
    },
    "MONSTER": {
        where: 'where',
        words: 'q',
        keywordSeparator: '-',
        url: 'https://www.monster.fr/emploi/recherche/',
        cssSelector: '.figure',
        cssParsefunction: (x:string):number => {
            const y = <string>x
                .replace(/\n/g, '')
                .replace(/ offres.*/g, '')
                .replace(/\(/g, '')
                .trim()
            return Number(y)
        }
    }
}

export type JOBBoards = {
    [key: string]: JOBBoard
}

export interface JOBqs {
    where: string
    words: string
}
export interface JOBBoard extends JOBqs {
    keywordSeparator: string
    url: string
    cssSelector: string
    cssParsefunction: (text: string) => number

}

export const buildQS = (qs: JOBqs, JOBBoardEnum: JOBBoard): string => {
    const tempQueryString: querystring.ParsedUrlQueryInput = {
        [JOBBoardEnum.where]: qs.where,
        [JOBBoardEnum.words]: qs.words.trim().replace(/ /g, JOBBoardEnum.keywordSeparator)
    }
    return querystring.encode(tempQueryString)
}
export const buildUrl = (qs: JOBqs, JOBBoardEnum: JOBBoard): string => {
    if (!JOBBoardEnum.url) throw `url is missing in ${JOBBoardEnum}`
    return `${JOBBoardEnum.url}?${buildQS(qs, JOBBoardEnum)}`
}

export const fetchUrl = async (qs: JOBqs, JOBBoardEnum: JOBBoard): Promise<number> => {
    try {
        const browser = await launch();
        const page = await browser.newPage();
        const url = buildUrl(qs, JOBBoardEnum)
        await page.goto(url);
        const searchValue = await page.$eval(JOBBoardEnum.cssSelector, el => el.innerHTML);
        await browser.close();
        //search value contains a gap ' ' between thousand; eg '1 398'
        return JOBBoardEnum.cssParsefunction(searchValue)
    } catch (error) {
        throw `check url, css selector as this happened: ${error}`
    }
}
