const axios = require("axios")
const cheerio = require("cheerio")

const fs = require("fs").promises

let website = "https://unicode.org"
let urls = ["emoji/charts/full-emoji-list.html", "emoji/charts/full-emoji-modifiers.html"]

let emojiMonster = async (url) => {
    //let response = await fs.readFile("test/full-emoji-list.html", "utf8")
    
    let response = (await axios.get(url)).data
    let $ = cheerio.load(response)

    let base64 = (el) => {
        let element = $(el).children("img").first()
        return element == undefined ? null : element.attr("src")
    }

    let value = (el) => $(el).text()

    let values = {
        "Index": value,
        "Unicode": (el) => $(el).children("a").first().text().split(" "),
        "Browser": value,
        "Apple": base64, "Google": base64, "Facebook": base64, "Windows": base64, "Twitter": base64, "JoyPixels": base64, "Samsung": base64, "Gmail": base64, "DoCoMo": base64, "KDDI": base64, "SoftBank": base64,
        "Name": value
    }
    let names = Object.keys(values)

    let vomit = []

    $("tbody:first").children("tr").each(function () {
        let elements = $(this).children("td")

        if (elements.length == names.length) {
            let chunkyBits = {}

            elements.each((i, element) => {

                let value = values[names[i]](element)
                if (value != null) { chunkyBits[names[i]] = value }

            })

            delete chunkyBits[names[0]] // delete index property

            chunkyBits = { [names.at(-1)]: chunkyBits[names.at(-1)], ...chunkyBits }
            vomit.push(chunkyBits)
        }
    })

    return vomit
}

let vomitInducer = async () => {
    
    let poolOfMonsterVomit = []

    for (url of urls) {
        console.log(`Getting ${url}`)
        poolOfMonsterVomit.push(...(await emojiMonster(`${website}/${url}`)))
    }

    console.log("Writing to file...")
    await fs.writeFile("emoji-data.json", JSON.stringify(poolOfMonsterVomit, null, 2))
        .catch(e => console.log(e))
}

vomitInducer()