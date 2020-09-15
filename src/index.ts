import { getAPECdata , run, runOptionEnum} from './buildlink'
import { importJSON} from "./datamanager"


/*const main = async () => {
    keywords.forEach(async (kw) => {
        const result = await getAPECdata(APECLink, kw)
        console.log(result, kw.toString())
    }
    )
}


const keywords:Array<Array<string>> = [['ingenieur', 'systeme']]
/*
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
*/
// main()

(async () => {
    const APECLink = "https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=$$REPLACE$$&page=0"
    // const test=await importJSON(`${__dirname}/../data.json`)
    //     .catch((err:string)=>{console.log(err)})        
    // console.log(test)
    const res=await run({all:runOptionEnum.NODATE,APEClink:APECLink})  
    // const res=await run({all:runOptionEnum.NORESULT,APEClink:APECLink})  
    // const res=await run({all:runOptionEnum.ALL,APEClink:APECLink})  
    console.log(res)
    // const res2=await run({all:runOptionEnum.ALL,APEClink:APECLink})  
    // console.log(res2)
    // const res3=await run({all:runOptionEnum.NORESULT,APEClink:APECLink})  
    // console.log(res3) 
})()