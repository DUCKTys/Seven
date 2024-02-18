import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://komiku.id/manga/hagure-seirei-ino-shinsatsu-kiroku-seijo-kishi-dan-to-iyashi-no-kamiwaza/`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/anime/komiku/detail?url=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (js.result) {
      const {
        title,
        img,
        metadata,
        sinopsis,
        chapters
      } = js.result;

      let message = `❏ Title : ${title}\n❏ Judul Indonesia : ${metadata.judul_indonesia}\n❏ Jenis Komik : ${metadata.jenis_komik}\n❏ Konsep Cerita : ${metadata.konsep_cerita}\n❏ Komikus : ${metadata.komikus}\n❏ Status : ${metadata.status}\n❏ Umur Pembaca : ${metadata.umur_pembaca}\n❏ Cara Baca : ${metadata.cara_baca}\n❏ Genre : ${metadata.genre.join(', ')}\n❏ Sinopsis : ${sinopsis}\n\nChapters:\n`;

      for (const chapter of chapters) {
        message += `▶ Chapter ${chapter.chapter}: ${chapter.title}\n   Upload: ${chapter.upload}\n   URL: ${chapter.url}\n`;
      }

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

handler.help = ['komikudetail'];
handler.tags = ['anime'];
handler.command = ['komikudetail'];
handler.register = true

export default handler;