import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');

    const url = args[0];
    const apiEndpoint = `https://rzky.my.id/api/download/tiktokv2?url=${url}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    const videoUrls = js.result;

    if (!videoUrls || videoUrls.length === 0) {
      throw new Error('No video URLs found in the result');
    }

    // Filter URLs to include only MP4 files
    const mp4Urls = videoUrls.filter(url => url.endsWith('.mp4'));

    if (mp4Urls.length === 0) {
      throw new Error('No MP4 video URLs found in the result');
    }

    // Randomly select one MP4 video URL
    const selectedVideoUrl = mp4Urls[Math.floor(Math.random() * mp4Urls.length)];

    await conn.sendFile(m.chat, selectedVideoUrl, null, 'TikTok Video', m);
    m.react('✅');
  } catch (e) {
    console.error(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
      m.react('❌');
    }
  }
};

handler.help = ['facebook'];
handler.tags = ['dl'];
handler.command = ['fb', 'fbdl'];
handler.register = true

export default handler;