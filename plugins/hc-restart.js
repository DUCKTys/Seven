import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) conn.reply('Dont: node main.js\nDo: node index.js')
    if (conn.user.jid == conn.user.jid) {
    await m.reply('🔄 Memulai ulang Bot...\n Tunggu sebentar')
    process.send('reset')
  } else conn.reply('eh')
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart','reiniciar'] 

handler.register = true
handler.rowner = true

export default handler
