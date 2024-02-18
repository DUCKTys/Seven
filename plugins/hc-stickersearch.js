import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!args[0]) return conn.reply(m.chat, `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@ripalfiee/video/7323196261417471265?is_from_webapp=1&sender_device=pc`, m);


    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('⌛'); // Add a loading reaction while fetching data

    try {
        let apiResponse = await fetch(`https://rzky.my.id/api/search/sticker?query=${args[0]}&apikey=${rzky}`);
        let result = await apiResponse.json();

        if (result && result.result && result.result.length > 0) {
            // Choose the first result from the array, you can modify this logic based on your preference
            let chosenResult = result.result[0];

            // Use the chosen result to generate the sticker
            let rki = await fetch(chosenResult.url).then(res => res.buffer());
            let stiker = await sticker(null, rki, `(${name2}) HeavyCraft`, `${name}`);

            // Send the sticker to the chat
            conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);
            m.react('✅');
        } else {
            throw '❌ No results found!';
        }
    } catch (error) {
        console.error(error);
        throw '❌ An error occurred while processing the request.';
    }
};

handler.help = ['stickersearch'];
handler.tags = ['search'];
handler.command = ['stickersearch', 'sticksearch'];
handler.group = false;
handler.register = true

export default handler;