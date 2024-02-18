import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, command, text, usedPrefix }) => {
      const dates = new Date(); 
      const timestamp = dates.getTime();     
      const date = new Date(timestamp);
      const hour = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const formattedTime = hour + ":" + minutes + ":" + seconds;

      if (command == 'invert') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .invert')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/invert?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'greyscale') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .greyscale')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/greyscale?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'delete') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .delete')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/delete?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'gay') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .gay')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/gay?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'darkness') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .darkness')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/darkness?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'affect') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .affect')
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/affect?url=${url}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
    if (command == 'meme') {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Kirim/Reply Gambar Dengan Caption .meme')
        if (!text) return m.reply (`🚩 *Contoh:* ${usedPrefix + command} heavycraft`)
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://rzky.my.id/api/maker/meme?url=${url}&text=${text[0]}&text2=${text[1]}&apikey=${rzky}`)).buffer()
        await conn.sendFile(m.chat, hasil, 'maker.jpeg', 'Nih kak sudah jadi!', m);
    }
}
    handler.command = handler.help = ['meme','affect','darkness','gay','delete','greyscale','invert']
    handler.tags = ['maker'];
    handler.premium = false;
    handler.group = false;
    handler.register = true
    
    export default handler;