import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
      if (!args[0]) return m.reply(`Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`);
  
      conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
      m.react('⌛');
  
      const url = args[0];
      const apiEndpoint = `https://rzky.my.id/api/download/spotify?url=${url}&apikey=${rzky}`;
  
      const get = await fetch(apiEndpoint);
      const js = await get.json();
  
      const { 
        title, 
        mp3,
        img,
        artis
    } = js.result;
    
    const audioUrl = mp3;
    
    await conn.sendFile(m.chat, img, null, `❏ Title : ${title}\n❏ Artist : ${artis}\n\nSilahkan download manual jika audio error, link download di atas!`, m);
    
    conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', contextInfo: {
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
    } catch (e) {
      console.error(e);
      if (m.sender) {
        conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
        m.react('❌');
      }
    }
  };

handler.help = ['spotify'];
handler.tags = ['dl'];
handler.command = ['spotify', 'spotify'];
handler.register = true

export default handler;