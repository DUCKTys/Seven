export async function before(m) {

const username = conn.getName(m.sender)

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

let user = global.db.data.users[m.sender]

if (new Date() - user.pc < 21600000) return
await m.reply(`🌟 *Hai ${username}, 
📌 *Setiap pertanyaan atau saran, Anda dapat menghubungi owner saya:* 🖤
📩 wa.me/6281359053674 📭🖤💀🖤

💀🖤 *Jangan Lupa Donasi Ehek 🖤💀*`) 
user.pc = new Date * 1
}