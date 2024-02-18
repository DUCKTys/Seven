import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input teks atau reply teks yang ingin di jadikan quote!"
   if (!text) return m.reply('masukan text')
   if (text.length > 100) return m.reply('Maksimal 100 Teks!')

let randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa', '#ffa500'];

const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')

    let rki = await (await fetch(`https://rzky.my.id/api/maker/qc?text=${text}&url=${pp}&username=${m.name}&apikey=${rzky}`)).buffer()
    let qcs = await sticker(null, rki, `(${m.name}) HeavyCraft`, `${m.name}`)
    conn.sendFile(m.chat, qcs, null, { asSticker: true }, m)
}

handler.help = ['qc']
handler.tags = ['maker']
handler.command = /^(qc|quotely)$/i
handler.register = true

export default handler;
