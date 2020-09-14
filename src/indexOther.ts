import { print, fetchLink } from "./buildlink"

const APECLink='https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=59&motsCles=ing%C3%A9nieur%20systeme&page=0'
const selectString=/number-candidat.*/
// const selectString=/number-candidat.*/
const selectString2=/Offres.*ici/g
const dd="Mes Offres  présentes ici d'emploi"
// console.log(dd.match(selectString2))


const main=() => {
    const run=async ()=>{
        const data = await fetchLink(APECLink)
        const found=data.match(/number-candidat.*Offres/)
        console.log(data)
    }
    run()
    
}
main()