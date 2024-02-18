import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan Text!\n\ncontoh:\n${usedPrefix + command} Ayam`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/search/recipes?query=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (js.result && typeof js.result === 'object') {
      const result = js.result;

      const message = `❏ Title: ${result.title}\n❏ Timer: ${result.timer}\n❏ Portion: ${result.portion}\n❏ Level: ${result.level}\n❏ Thumbnail: ${result.thumbnail}\n❏ Ingredient: ${result.ingredient}\n❏ Step: ${result.step}\n`;

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

handler.help = ['resepmakanan'];
handler.tags = ['search'];
handler.command = ['resepmakanan'];
handler.register = true

export default handler;
