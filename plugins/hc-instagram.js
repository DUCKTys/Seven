import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
      if (!args[0]) return m.reply(`Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=TM4f2ivr7i8`);
  
      conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
      m.react('⌛');
  
      const url = args[0];
      const apiEndpoint = `https://rzky.my.id/api/download/ig?url=${url}&apikey=${rzky}`;
  
      const get = await fetch(apiEndpoint);
      const js = await get.json();
  
      const {
        download_link
    } = js.result[0];
    await conn.sendFile(m.chat, download_link, null, `Nih kak!`, m);
      m.react('✅');
    } catch (e) {
      console.error(e);
      if (m.sender) {
        conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
        m.react('❌');
      }
    }
  };

handler.help = ['instagram'];
handler.tags = ['dl'];
handler.command = ['igdl', 'instagram'];
handler.register = true

export default handler;