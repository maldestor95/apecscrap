import { writeJSON } from "./datamanager"
import { fetchUrl, JOBqs, BoardEngine } from "./jobboardquery"



let qs: JOBqs = {
    where: '59',
    words: 'anglais projet'
}

import * as readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = async () => {
    rl.question("keywords separated with spaces ? ", async (words) => {
        try {

            qs.words = words
            console.log(`APEC: ${await fetchUrl(qs, BoardEngine["APEC"])}`)
            console.log(`MONSTER: ${await fetchUrl(qs, BoardEngine["MONSTER"])}`)
            question()
        } catch (error) {
            question()
        }
    })
}

question()

rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});