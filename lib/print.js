import {
	WAMessageStubType
} from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import {
	watchFile,
	readFile,
	writeFile
} from 'fs';
import terminalImage from 'terminal-image';
import urlRegex from 'url-regex-safe';
let logCount = 0;
let codeUpdated = !1;
export default async function(m, conn = {
	user: {}
}) {
	const formatType = (type) => type ? type.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : 'Unknown';
	const formatTime = (timestamp) => (timestamp ? new Date(1000 * (timestamp.low || timestamp)).toLocaleString() : new Date().toLocaleString());
	const _name = await conn.getName(m.sender);
	const sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '');
	const chat = await conn.getName(m.chat);
	const filesize = m.msg && m.msg.vcard ? m.msg.vcard.length : m.msg && m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.text ? m.text.length : 0;
	if (m.sender) {
    console.log(chalk.cyan('╭──────────────────────────────────────···'));
		console.log(`   ${chalk.cyan('父 Message Type')}: ${formatType(m.mtype)}`);
		console.log(`   ${chalk.cyan('父 Message ID')}: ${m.msg?.id || m.key.id || 'N/A'}`);
		console.log(`   ${chalk.cyan('父 Sent Time')}: ${formatTime(m.messageTimestamp)}`);
		console.log(`   ${chalk.cyan('父 Message Size')}: ${formatSize(filesize || 0)}`);
		console.log(`   ${chalk.cyan('父 Sender ID')}: ${m.sender.split('@')[0]}`);
		console.log(`   ${chalk.cyan('父 Sender Name')}: ${m.name ? conn.user.name : 'N/A'}`);
		console.log(`   ${chalk.cyan('父 Chat ID')}: ${m.chat.split('@')[0]}`);
		console.log(`   ${chalk.cyan('父 Chat Name')}: ${chat || 'N/A'}`);
		console.log(`   ${chalk.cyan('父 Total log Messages')}: ${logCount}`);
    console.log(chalk.cyan('╰──────────────────────────────────────···'))
	}
	if (typeof m?.text === 'string' && m.text) {
		console.log(chalk.cyan('╭──────────────────────────────────────···'));
		let logMessage = m.text.replace(/\u200e+/g, '');
		const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g;
		const mdFormat = (depth = 4) => (_, type, text, monospace) => {
			const types = {
				_: 'italic',
				'*': 'bold',
				'~': 'strikethrough'
			};
			text = text || monospace;
			const formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
			return formatted
		};
		if (logMessage.length < 4096) {
			logMessage = logMessage.replace(urlRegex, (url, i, text) => {
				const end = url.length + i;
				return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
			})
		}
		logMessage = logMessage.replace(mdRegex, mdFormat(4));
		if (m.mentionedJid) {
			for (const user of m.mentionedJid) {
				logMessage = logMessage.replace('@' + user.split`@` [0], chalk.blueBright('@' + await conn.getName(user)))
			}
		}
		console.log(m.error != null ? `父 ${chalk.red(logMessage)}` : m.isCommand ? `父 ${chalk.yellow(logMessage)}` : logMessage);
		console.log(chalk.cyan('╰──────────────────────────────────────···'))
	}
	if (m.msg) {
		const attachmentType = m.mtype.replace(/message$/i, '');
		if (/document/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			console.log(chalk.redBright(`   父 Attached Document: ${m.msg.fileName || m.msg.displayName || 'Document'}`));
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		} else if (/contact/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			console.log(chalk.redBright(`   父 Attached Contact: ${m.msg.displayName || 'N/A'}`));
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		} else if (/audio/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			const duration = m.msg.seconds;
			const formattedDuration = formatDuration(duration);
			console.log(chalk.redBright(`   父 Attached Audio: ${m.msg.ptt ? '(PTT)' : '(Audio)'} - Duration: ${formattedDuration}`));
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		} else if (/image/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			const attachmentName = m.msg.caption || attachmentType;
			console.log(chalk.redBright(`   父 Attached Image: ${attachmentName}`));
			if (m.msg.url && global.opts.img) {
				try {
					const imageBuffer = await m.download();
					const terminalImg = await terminalImage.buffer(imageBuffer);
					console.log(terminalImg)
				} catch (error) {
					console.error(chalk.red('Error displaying image:'), error)
				}
			}
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		} else if (/video/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			const attachmentName = m.msg.caption || attachmentType;
			console.log(chalk.redBright(`   父 Attached Video: ${attachmentName}`));
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		} else if (/sticker/i.test(attachmentType)) {
			console.log(chalk.cyan('╭──────────────────────────────────────···'));
			const attachmentName = m.msg.caption || attachmentType;
			console.log(chalk.redBright(`   父 Attached Sticker: ${attachmentName}`));
			console.log(chalk.cyan('╰──────────────────────────────────────···'))
		}
	}
	if (m.sender) {
    console.log(chalk.cyan('╭──────────────────────────────────────···'));
		console.log(chalk.greenBright(`  ${chalk.red('Nomor User')}: ${getPhoneNumber(m.sender)}`));
		console.log(chalk.blueBright(`  ${chalk.red('Bot')}: ${getPhoneNumber(conn.user?.jid)}`));
    console.log(chalk.cyan('╰──────────────────────────────────────···'))
		console.log(chalk.magentaBright('\n'))
	}
	logCount++
}
const getPhoneNumber = (jid) => PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
const getContactInfo = (jid) => `   - ${getPhoneNumber(jid)} ${conn.getName(jid) ? `~${conn.getName(jid)}` : ''}`;

function formatSize(size) {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let i = 0;
	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++
	}
	return ``
}

function formatDuration(duration) {
	const timeUnits = ['Y', 'M', 'W', 'D', 'h', 'm', 's'];
	const timeLabels = ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'];
	let formattedDuration = '';
	let i = 0;
	while (i < timeUnits.length) {
		const unitInSeconds = i < 4 ? 86400 * (i === 2 ? 7 : 1) : 3600;
		const value = Math.floor(duration / unitInSeconds);
		duration -= value * unitInSeconds;
		if (value > 0) {
			formattedDuration += `${value} ${timeLabels[i]}${value > 1 ? 's' : ''} `
		}
		i++
	}
	return formattedDuration.trim()
}
let file = global.__filename(import.meta.url)
watchFile(file, () => {
  console.log(chalk.redBright("Update 'lib/print.js'"))
})
