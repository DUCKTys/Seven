import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan Text!\n\ncontoh:\n${usedPrefix + command} Whatsapp`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/search/sfile?query=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (Array.isArray(js.result) && js.result.length > 0) {
      const results = js.result;
      let message = '';

      for (const result of results) {
        const { title, url, size } = result;
        message += `❏ Title: ${title}\n❏ URL: ${url}\n❏ Size: ${size}\n\n`;
      }

      await conn.reply(m.chat, message, m);
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

handler.help = ['sfile'];
handler.tags = ['search'];
handler.command = ['sfile'];
handler.register = true

export default handler;
