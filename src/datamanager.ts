import fs from "fs"
import { resolve } from "path"

export type DataSet = Array<dataInterface>

export interface dataInterface {
    result?: number,
    date?: string,
    keywords: Array<string>
}
export const importJSON = async (filepath: string): Promise<DataSet> => {
    return new Promise((resolve, reject) => {
        if (!filepath.match(/.json$/)) reject('JSON file required!')
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) reject(err)
            else {
                try {
                    resolve(JSON.parse(data))
                }
                catch (error) {
                    reject('JSON file corrupted')
                }
            }
        });
    })
}
export const writeJSON = async (filepath: string, data: DataSet): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!filepath.match(/.json$/)) return reject('JSON file required!')
        fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
            if (err) reject("error writing file")
            resolve("saved")
        });
    });
}