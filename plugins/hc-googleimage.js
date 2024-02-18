import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
      if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`, m);
  
      conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
      m.react('⌛');
      const apiEndpoint = `https://rzky.my.id/api/search/image?query=${args[0]}&apikey=${rzky}`;
  
      const get = await fetch(apiEndpoint);
      const js = await get.json();
  
      if (Array.isArray(js.result) && js.result.length > 0) {
        const image = js.result[0];
        const {
          title,
          size,
          width,
          height,
          url
        } = image;
  
        let message = `❏ Title: ${title}\n❏ Size: ${size}\n❏ Resolution: ${width}x${height}\n❏ URL: ${url}`;
  
        await conn.sendFile(m.chat, url, null, message, m);
        m.react('✅');
      } else {
        m.react('❌');
        conn.reply(m.chat, `_*Tidak ada hasil atau terjadi kesalahan!*_`, m);
      }
    } catch (e) {
      console.error(e);
      if (m.sender) {
        conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
        m.react('❌');
      }
    }
  };

handler.help = ['googleimage'];
handler.tags = ['search'];
handler.command = ['googleimage', 'gimage'];
handler.register = true

export default handler;