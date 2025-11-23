import config from "../../config.json" assert { type: "json" }

export default {
  cmd: ["owner"],
  async run(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `👑 Owner: wa.me/${config.owner[0]}`
    })
  }
}
