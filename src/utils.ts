export const areKeysInArray=(InputArray:Array<string>,keysArray:Array<string>):Array<boolean>=>{
    console.log(InputArray)
    const keyPresent= function(key:string){return key in InputArray}
    const result=keysArray.map(k=>keyPresent(k))
    return result

}