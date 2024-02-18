
import { createHash } from 'crypto'
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  let bio_user; // Declare bio_user before the try block
  if (user.registered === true) return m.reply(`Anda sudah daftar, mohon maaf tidak bisa daftar kembali!`)
  if (!(text)) return m.reply(`⚠️ Format salah\n\n ✳️ Penggunaan perintah : *${usedPrefix + command} nama*\n📌Contoh : *${usedPrefix + command}* ${name2}`)
  let [_, name] = text.match()
  if (!text) return m.reply(`❌ Nama tidak boleh kosong`);
  if (text.length < 5) return m.reply(`❌ Nama terlalu pendek minimal 5 huruf!`);
  if (text.length >= 10) return m.reply(`❌ Nama terlalu panjang minimal 10 huruf!`);
  user.name = text.trim()
  user.bio = bio_user
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  try {
    bio_user = `${bio_nya.status}`
  } catch {
    bio_user = '-'
  }
  m.reply(`❒ *TERVERIFIKASI* ❒
❏ 👤 Nama: ${text}
❏ 💌 Bio: ${bio_user}
❏ ✨ Premium : ✘
❏ 💌 Serial :${sn}

Terimakasih telah mendaftar ke database bot`.trim())
}
handler.help = ['verify'].map(v => v + '')
handler.tags = ['main']
handler.command = ['verify', 'reg', 'register', 'registrarme'] 

export default handler

