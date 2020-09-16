import * as buildLink from "../buildlink"
import {expect} from "chai"
describe('buildLink',()=>{
    it('importData',async()=>{
        const datapath='./datain.json'
        const data=await buildLink.importData(datapath)
        console.log(data)
        expect(true).to.eq(true)
    })
    // getAPECdata
    // importData
    // run
    // buildLink

})