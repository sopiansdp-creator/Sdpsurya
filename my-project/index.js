

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason 
} = require("@whiskeysockets/baileys");
const pino = require("pino");

async function mulaiKoneksi() {
    const { state, saveCreds } = await useMultiFileAuthState('sesi_wa');
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    // JIKA BELUM LOGIN, MINTA PAIRING CODE
    if (!sock.authState.creds.registered) {
        // GANTI NOMOR DI BAWAH DENGAN NOMOR WA KAMU (Gunakan format 62)
        const nomorWA = "6283171996951"; 
        setTimeout(async () => {
            let code = await sock.requestPairingCode(nomorWA);
            console.log("\n====================================");
            console.log("KODE PAIRING KAMU:", code);
            console.log("====================================\n");
            console.log("Buka WA > Perangkat Tertaut > Tautkan dengan nomor telepon.");
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') console.log("\nWA BERHASIL TERHUBUNG!\n");
        if (connection === 'close') mulaiKoneksi();
    });
}

mulaiKoneksi();
