const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const from = msg.key.remoteJid
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        console.log("Pesan masuk:", text)

        // ===== RESPON BOT =====
        if (text.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "pong 🏓" })
        }

        if (text.toLowerCase() === "menu") {
            await sock.sendMessage(from, {
                text: "📋 Menu Bot:\n- ping\n- menu\n- hi"
            })
        }

        if (text.toLowerCase() === "hi") {
            await sock.sendMessage(from, { text: "Halo juga 👋" })
        }
    })
}

startBot()
