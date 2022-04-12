const { getSystemErrorMap } = require("util")

const fs = require("fs").promises

let slurpVomit = async () => {
    let names = ["Apple", "Google", "Facebook", "Windows", "Twitter", "JoyPixels", "Samsung", "Gmail", "DoCoMo", "KDDI", "SoftBank"]

    let vomit = await JSON.parse(await fs.readFile("emoji-data.json"))
        .reduce((a, c) => {

            names.forEach(b => {
                if (c[b]) {
                    a[b][c["Name"].replaceAll(" ", "-")] = c[b].substring(22)
                }
            })

            return a
        }, names.reduce((a, c) => ({ ...a, [c]: {} }), {}))


    for (brand of Object.keys(vomit)) {
        console.log(`Covert emojis for ${brand}`)
        await fs.mkdir(`emojis/${brand}`, { recursive: true })

        let index = 0
        for (image of Object.keys(vomit[brand])) {
            await fs.writeFile(`emojis/${brand}/${++index}-${image}.png`, Buffer.from(vomit[brand][image], "base64"), { recursive: true })
        }
    }

    await fs.writeFile("emojis/emoji-index.json", JSON.stringify(vomit, null, 2))
}

slurpVomit()
