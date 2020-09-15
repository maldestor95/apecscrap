import fs from "fs"

export type DataSet = Array<dataInterface>

export interface dataInterface {
    result?:number,
    date?: string,
    keywords:Array<string>
}
export const importJSON = async (filepath: string): Promise<DataSet> => {
    return new Promise((resolve, reject) => {
        if (!filepath.match(/.json$/)) reject('JSON file required!')
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data))
        });
    });
}
// export const writeJSON= async (filepath:string)=>{

// }