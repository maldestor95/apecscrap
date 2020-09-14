import { getAPECdata } from './buildlink'


const main = async () => {
    keywords.forEach(async (kw) => {
        const result = await getAPECdata(APECLink, kw)
        console.log(result, kw.toString())
    }
    )
}


const APECLink = "https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=$$REPLACE$$&page=0"
const keywords = [
    ['ingenieur', 'systeme'],
    // ['projet'],
    // ['projet','anglais'],
    // ['anglais'],
    // ['javascript'],
    // ['js'],
    // ['vuejs'],
    // ['react'],
    // ['coordinateur'],

]

main()