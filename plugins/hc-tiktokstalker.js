import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/stalk/tiktok?username=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    const { 
      username, 
      nickname, 
      pp_thumbnail,
      description,
      isVerify,
      isPrivate,
      isUserCommerce,
      region,
      followers,
      following,
      friends,
      totalLikes,
      totalVideos,
      LastUsernameModification,
      LastNicknameModification,
      url
    } = js.result;

    await conn.sendFile(m.chat, pp_thumbnail, null, `❏ Username : ${username}\n❏ Nickname : ${nickname}\n❏ Description : ${description}\n❏ Verify : ${isVerify}\n❏ Private : ${isPrivate}\n❏ User Commerce : ${isUserCommerce}\n❏ Region : ${region}\n❏ Followers : ${followers}\n❏ Following : ${following}\n❏ Friends : ${friends}\n❏ Total Like : ${totalLikes}\n❏ Total Videos : ${totalVideos}\n❏ Last Username Modification : ${LastNicknameModification}\n❏ Last Nickname Modification : ${LastNicknameModification}`, m);
    m.react('✅');
  } catch (e) {
    console.error(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
      m.react('❌');
    }
  }
};

handler.help = ['tiktokstalker'];
handler.tags = ['stalker'];
handler.command = ['ttstalker', 'tiktokstalker'];
handler.register = true

export default handler;