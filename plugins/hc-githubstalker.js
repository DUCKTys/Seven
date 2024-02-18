import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/stalk/github?username=${args[0]}&apikey=${rzky}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    const { 
      username, 
      name, 
      blog,
      company,
      location,
      bio,
      followers,
      following,
      repository_count,
      created_at,
      profile_url
    } = js.result;

    await conn.sendFile(m.chat, profile_url, null, `❏ Username : ${username}\n❏ Nickname : ${name}\n❏ Bio : ${bio}\n❏ Blog : ${blog}\n❏ Company : ${company}\n❏ Location : ${location}\n❏ Followers : ${followers}\n❏ Following : ${following}\n❏ Total Repostory : ${repository_count}\n❏ Created At : ${created_at}`, m);
    m.react('✅');
  } catch (e) {
    console.error(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
      m.react('❌');
    }
  }
};

handler.help = ['githubstalker'];
handler.tags = ['stalker'];
handler.command = ['githubstalker', 'gbstalker'];
handler.register = true

export default handler;