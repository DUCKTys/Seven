import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
      if (!args[0]) return m.reply(`Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=TM4f2ivr7i8`);
  
      conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
      m.react('⌛');
  
      const url = args[0];
      const apiEndpoint = `https://rzky.my.id/api/download/ytmp4?url=${url}&apikey=${rzky}`;
  
      const get = await fetch(apiEndpoint);
      const js = await get.json();
  
      const { 
        title, 
        video, 
        size,
        duration,
        thumb,
        views,
        channel,
        desc
      } = js.result;

      await conn.sendFile(m.chat, thumb, null, `❏ Title : ${title}\n❏ Channel : ${channel}\n❏ Download : ${video}\n❏ Views : ${views}\n❏ Duration : ${duration}\n❏ Size : ${size}\n❏ Desc : ${desc}\n\nSilahkan download manual jika video error, link download di atas!`, m);

      conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'video/mpeg', contextInfo: {
        externalAdReply: {
        title: title,
        body: "",
        thumbnailUrl: img,
        sourceUrl: url,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
        }}} , { quoted: m })
        m.react('✅');
      m.react('✅');
    } catch (e) {
      console.error(e);
      if (m.sender) {
        conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
        m.react('❌');
      }
    }
  };

handler.help = ['ytmp4'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'ytmp4'];
handler.register = true

export default handler;