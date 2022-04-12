# EmojiScraper
### Simple scraper to get every emoji from Unicode.org

Clone, init and run - give it ~2 minutes, saves to `emoji-data.json` in the folder it was run from

**Need to run with `--max-old-space-size=4096` else JS heap runs out of memory** 
<hr>
Feel free to use the `emoji-data.json` in the releases, though note it is 68mb and is scraped from v14 (latest as of 11/04/22)
The emojis.rar file contains every single emoji image stored in its respective "brand" folder.
<hr>
Run convert.js to convert data in JSON file to PNG images
Oddly enough, this script doesn't seem to fully work (all the emoji files aren't outputted) on windows; I'd recommend running it on a \*nix distro
I ran it on wsl and it successfully output every single image
<hr>
### ALL HAIL THE EMOJI MONSTER!😛
