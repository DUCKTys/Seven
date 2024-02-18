import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
      if (!args[0]) return conn.reply(m.chat, `Masukkan Text!\n\ncontoh:\n${usedPrefix + command} Senja`, m);
  
      conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
      m.react('⌛');
      const apiEndpoint = `https://rzky.my.id/api/search/wattpad?query=${args[0]}&apikey=${rzky}`;
  
      const get = await fetch(apiEndpoint);
      const js = await get.json();
  
      if (js.result && js.result.data && js.result.data.length > 0) {
        const videos = js.result.data;
        let message = '';
  
        for (const video of videos) {
          const {
            title,
            description,
            user,
            numParts,
            lastPublishedPart,
            voteCount,
            readCount,
            commentCount,
            cover,
            url
          } = video;
  
          message += `❏ Title : ${title}\n❏ Description : ${description}\n❏ User : ${user.name}\n❏ Num Parts : ${numParts}\n❏ Last Published Part Date : ${lastPublishedPart.createDate}\n❏ Vote Count : ${voteCount}\n❏ Read Count : ${readCount}\n❏ Comment Count : ${commentCount}\n❏ Cover : ${cover}\n❏ URL : ${url}\n\n`;
        }
  
        await conn.sendFile(m.chat, videos[0].cover, null, message, m);
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

handler.help = ['wattpad'];
handler.tags = ['search'];
handler.command = ['wattpad'];
handler.register = true

export default handler;