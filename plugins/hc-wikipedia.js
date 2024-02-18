import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan Text!\n\ncontoh:\n${usedPrefix + command} mie`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/search/wikipedia?query=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (js.result && typeof js.result === 'object') {
      const result = js.result;

      const message = `❏ Title: ${result.title}\n❏ URL: ${result.url}\n❏ Publisher: ${result.publisher}\n❏ Date Published: ${result.datePublished}\n❏ Thumbnail: ${result.thumbnail}\n❏ Context: ${result.context}\n`;

      await conn.sendFile(m.chat, result.thumbnail, null, message, m);
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

handler.help = ['wikipedia'];
handler.tags = ['search'];
handler.command = ['wikipedia'];
handler.register = true

export default handler;