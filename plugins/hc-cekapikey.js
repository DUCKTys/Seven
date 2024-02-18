import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `${usedPrefix + command} cpnupC6pBS`, m);

    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    const apiEndpoint = `https://rzky.my.id/api/cekkey?apikey=${args[0]}`;

    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (js.status && js.status === true && js.result && typeof js.result === 'object') {
      const result = js.result;

      const message = `❏ Username: ${result.username}\n❏ Email: ${result.email}\n❏ API Key: ${result.apikey}\n❏ Limit: ${result.limit}\n❏ Premium: ${result.premium ? 'Yes' : 'No'}\n❏ Expired: ${result.expired}\n❏ Since: ${result.since}\n`;

      await conn.reply(m.chat, message, m);
      m.react('✅');
    } else if (js.status && js.status === false && js.result && typeof js.result === 'string' && js.result.toLowerCase().includes('not registered')) {
      m.react('❌');
      conn.reply(m.chat, '_*API key not registered!*_', m);
    } else {
      m.react('❌');
      conn.reply(m.chat, `_*API key not registered!*_`, m);
    }
  } catch (e) {
    console.error(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
      m.react('❌');
    }
  }
};

handler.help = ['cekapikey'];
handler.tags = ['main'];
handler.command = ['cekapikey'];
handler.register = true

export default handler;