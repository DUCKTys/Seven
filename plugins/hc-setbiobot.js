let handler = async (m, { conn, text }) => {
    if (!text) throw `Masukan Text.`
      try {
         await conn.updateProfileStatus(text).catch(_ => _)
         conn.reply(m.chat, 'SUCCESS ✅️', m)
 } catch {
        throw 'Error'
      }
 }
 handler.help = ['setbotbio']
 handler.tags = ['owner']
 handler.command = /^setbiobot|setbotbio$/i
 handler.owner = true
 handler.register = true
 
 export default handler
 