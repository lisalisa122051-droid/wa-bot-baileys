import moment from "moment"

export default {
  cmd: ["time"],
  async run(sock, msg) {
    const now = moment().format("HH:mm:ss - DD/MM/YYYY")
    await sock.sendMessage(msg.key.remoteJid, { text: `⏰ Waktu sekarang: ${now}` })
  }
}
