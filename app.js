const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/chromium', // Jalur Chromium di Termux
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('SCAN QR DI ATAS DENGAN WHATSAPP');
});

client.on('ready', () => {
    console.log('WhatsApp sudah terhubung!');
});

client.initialize();
