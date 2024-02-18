import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/anime/komiku/latest?apikey=Rzkymlna`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (Array.isArray(js.result) && js.result.length > 0) {
      const profiles = js.result;
      for (const profile of profiles) {
        const {
          title,
          chapter,
          img,
          link
        } = profile;

        await conn.sendFile(m.chat, img, null, `❏ Title : ${title}\n❏ Chapters : ${chapter.join(', ')}\n❏ Link : ${link}`, m);
      }
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

handler.help = ['komikulatest'];
handler.tags = ['anime'];
handler.command = ['komikulatest', 'komikulatest'];
handler.register = true

export default handler;