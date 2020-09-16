import * as buildLink from "../datamanager"
import { expect } from "chai"
import * as fs from "fs"
describe('datamanager', () => {
    it('importJSON', async () => {
        await buildLink.importJSON(`${__dirname}/./inexistentfile.json`)
            .catch(error => {
                expect(error.code).to.eq('ENOENT')
            })

        await buildLink.importJSON(`${__dirname}/./wrong.extension`)
            .catch(error => {
                expect(error).to.eq('JSON file required!')
            })
        await buildLink.importJSON(`${__dirname}/./badjson.json`)
            .catch(error => {
                expect(error).to.eq('JSON file corrupted')
            })


        await buildLink.importJSON(`${__dirname}/datain.json`)
            .catch((error: string) => {
                expect(error).to.eq('JSON file required!')
            })
            .then((promiseData) => {
                const data = <buildLink.DataSet>promiseData
                expect(Array.isArray(data)).to.eq(true)
                expect(data.length).to.be.gt(1)
                // console.log(data.length)
            })
    })
    it('writeJSON', async () => {
        const testDataSet: buildLink.DataSet = [{ keywords: ['a'] }]
        const fname = `${__dirname}/testdataout.json`
        await buildLink.writeJSON(fname, testDataSet)
            .then(async (data) => {
                expect(data).to.eq("saved")
                await fs.unlinkSync(fname)
            })
            .catch(data => { expect(data).to.eq("error writing file") })

        await buildLink.writeJSON(`${__dirname}/bad.extension`, testDataSet)
            .then(data => { expect(data).to.eq("saved") })
            .catch(data => { expect(data).to.eq('JSON file required!') })

    })
})