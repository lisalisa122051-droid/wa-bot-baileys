import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys"
import pino from "pino"
import fs from "fs"
import path from "path"
import qrcode from "qrcode-terminal"
import config from "./config.json" assert { type: "json" }

const prefix = config.prefix

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        logger: pino({ level: "silent" })
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", ({ connection }) => {
        if (connection === "open") console.log("Bot Connected")
    })

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return
        const from = msg.key.remoteJid

        let type = Object.keys(msg.message)[0]
        let text = msg.message.conversation ||
                   msg.message[type]?.caption ||
                   msg.message[type]?.text ||
                   ""

        if (!text.startsWith(prefix)) return

        const args = text.trim().split(" ")
        const command = args.shift().slice(prefix.length).toLowerCase()

        await handleCommand(sock, msg, command, args)
    })
}

async function handleCommand(sock, msg, command, args) {
    const pluginDirs = fs.readdirSync("./plugins")

    for (const dir of pluginDirs) {
        const pluginFiles = fs.readdirSync(`./plugins/${dir}`)
        for (const file of pluginFiles) {

            const { default: plugin } = await import(`./plugins/${dir}/${file}`)
            if (plugin.cmd.includes(command)) {
                await plugin.run(sock, msg, args)
                return
            }
        }
    }
}

startBot()
