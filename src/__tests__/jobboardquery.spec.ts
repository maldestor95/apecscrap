import * as apec from "../jobboardquery"
import {expect} from "chai"
describe.only('apec', function() {
    this.timeout(10000)
    const qs:apec.JOBqs={
        where:'59',
        words:'anglais projet voiture'
    }
    it('buildQS',()=>{
        expect(apec.buildQS(qs,apec.BoardEngine["APEC"])).to.eq('lieux=59&motsCles=anglais%20projet%20voiture')
        expect(apec.buildQS(qs,apec.BoardEngine["MONSTER"])).to.eq('where=59&q=anglais-projet-voiture')
    })
    it('buildURL',()=>{
        expect(apec.buildUrl(qs,apec.BoardEngine["APEC"])).to.eq('https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=anglais%20projet%20voiture')
    })
    it('fetchURL',async()=>{
        const testFetchApec= await (apec.fetchUrl(qs,apec.BoardEngine["APEC"]))
        expect(testFetchApec).to.be.a('number')
        const testFetchMonster= await (apec.fetchUrl(qs,apec.BoardEngine["MONSTER"]))
        expect(testFetchMonster).to.be.a('number')
        const result={
            keywords:qs.words,
            where:qs.where,
            results:{
                APEC:testFetchApec,
                Monster:testFetchMonster
            }
        }
        console.log(JSON.stringify(result,null,2))
    })

})