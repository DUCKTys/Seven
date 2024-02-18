import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['6281281872699', 'Rzkymlna', true]
]

global.mods = ['']
global.prems = ['', '', '']

global.HeavyCraft = "" 
global.lastm = 'sɪx 𝟷.𝟶'
global.heavy = 'sɪx 𝟷.𝟶' // nama bot 
global.confirmCode = ""


// RZKY API
global.web = "http://rzky.my.id/"
global.rzky = "cpnupC6pBS" //isi dengan apikey kamu
global.noowner = "6281359053674"

//TRIPAY
global.apitripay = "tWWtxTjbn7jHjU1QEbRDLFS3T7oo4JmuuhCSZRiH" //isi dengan apikey tripay kamu
global.privatekey = "SuYEC-31Scc-EKQKi-N7qBg-JzNSx" //isi dengan privatekey tripay kamu
global.merchant = "T23423" //isi dengan merchant tripay kamu

// Sticker WM
global.packname = 'ʙᴏᴛ'
global.author = 'sɪx 𝟷.𝟶'
global.waig = 'Ikuti saya di Instagram\nhttps://www.instagram.com\n'
global.thumb = 'https://telegra.ph/file/a20c924a5f7e7953607aa.jpg' // thumbnail bot ( foto menu )
global.grupwa = 'https://chat.whatsapp.com/EgYMK47tFY723HOzUBQg7h'
global.wagit = 'https://github.com/'
global.wayt = 'https://youtube.com/'
global.wapyp = 'https://paypal.me/'

global.fglog = 'https://telegra.ph/file/a20c924a5f7e7953607aa.jpg'
global.numero = ['6281359053674']
global.wait = 'Sedang diproses, mohon tunggu...'
global.rwait = '⌛'
global.dmoji = '🗿'
global.done = '✅'
global.error = '❌'
global.xmoji = '🔥'

global.multiplier = 69
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
