import axios from "axios"

export default {
  cmd: ["quote"],
  async run(sock, msg) {
    let res = await axios.get("https://api.quotable.io/random")
    await sock.sendMessage(msg.key.remoteJid, { text: `💬 ${res.data.content}` })
  }
}
