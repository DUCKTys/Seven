const handler = async (m, { conn }) => {
    let txt = '';
  try {    
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '👤 Peserta' : '❌ No Peserta';
      const totalParticipants = participants.length;
      txt += `*◉ Grup ${i + 1}*
      *➤ Nama:* ${await conn.getName(jid)}
      *➤ ID:* ${jid}
      *➤ Admin:* ${isBotAdmin ? '✔ Yes' : '❌ No'}
      *➤ Negara:* ${participantStatus}
      *➤ Jumlah Peserta:* ${totalParticipants}
      *➤ Link:* ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '--- (Error) ---'}` : '--- (No admin) ---'}\n\n`;
    }
    m.reply(`*Daftar Grup Bot* 🤖\n\n*—◉ Total Grup:* ${totalGroups}\n\n${txt}`.trim());
  } catch {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '👤 Peserta' : '❌ No Peserta';
      const totalParticipants = participants.length;    
      txt += `*◉ Grup ${i + 1}*
      *➤ Nama:* ${await conn.getName(jid)}
      *➤ ID:* ${jid}
      *➤ Admin:* ${isBotAdmin ? '✔ Yes' : '❌ No'}
      *➤ Negara:* ${participantStatus}
      *➤ Jumlah Peserta:* ${totalParticipants}
      *➤ Link:* ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '--- (Error) ---'}` : '--- (No admin) ---'}\n\n`;
    }
    m.reply(`*Daftar Grup Bot* 🤖\n\n*—◉ Total grup:* ${totalGroups}\n\n${txt}`.trim());
   }    
  };
  handler.help = ['groups', 'grouplist'];
  handler.tags = ['owner'];
  handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listgroup)$/i;
  handler.rowner = true;
  handler.private = true
  export default handler;