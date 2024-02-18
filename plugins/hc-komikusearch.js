import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan dengan benar!\n\ncontoh:\n${usedPrefix + command} seirei`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/anime/komiku/search?query=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (Array.isArray(js.result) && js.result.length > 0) {
      const profiles = js.result;
      let message = '';
      
      for (const profile of profiles) {
        const {
          title,
          chapter,
          img,
          link
        } = profile;

        message += `❏ Title : ${title}\n❏ Chapters : ${chapter.awal} - ${chapter.akhir}\n❏ Link : ${link}\n\n`;
      }

      await conn.sendFile(m.chat, profiles[0].img, null, message, m);
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

handler.help = ['komikusearch'];
handler.tags = ['anime'];
handler.command = ['komikusearch', 'komikusearch'];
handler.register = true

export default handler;