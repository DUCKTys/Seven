import fetch from 'node-fetch';

let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) return conn.reply(`*🚩 Example:* ${usedPrefix}${command} Rzky`)
  conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
  m.react('⌛');
  try {
    let response = await fetch(`https://rzky.my.id/api/search/pinterest?query=${args[0]}&apikey=${rzky}`);
    let data = await response.json();   
    let old = new Date()
    let limit = Math.min(5, data.result.length);
    for(let i = 1; i < limit; i++) { 
      conn.sendFile(m.chat, data.result[i], 'pin.jpg', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m);
      m.react('✅');
    }
  } catch (e) {
    conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    m.react('❌');
  }
}

handler.help = ['pinterest']
handler.tags = ['search']
handler.command = ['pinterest'];
handler.group = false
handler.register = true

export default handler