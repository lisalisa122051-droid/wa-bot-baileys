export default {
  cmd: ["ping"],
  async run(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 *Pong!*" })
  }
}
