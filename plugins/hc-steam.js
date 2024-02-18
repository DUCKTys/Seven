import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan Text!\n\ncontoh:\n${usedPrefix + command} GtaV`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/search/steam?query=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (Array.isArray(js.result) && js.result.length > 0) {
      const game = js.result[0];
      const {
        judul,
        img,
        link,
        rilis,
        harga,
        rating
      } = game;

      let message = `❏ Judul: ${judul}\n❏ Rilis: ${rilis}\n❏ Harga: ${harga}\n❏ Rating: ${rating}\n❏ Link: ${link}`;

      await conn.sendFile(m.chat, img, null, message, m);
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

handler.help = ['steam'];
handler.tags = ['search'];
handler.command = ['steam', 'steamsearch'];
handler.register = true

export default handler;