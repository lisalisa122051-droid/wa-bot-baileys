import axios from "axios"

export default {
  cmd: ["fact"],
  async run(sock, msg) {
    let res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en")
    await sock.sendMessage(msg.key.remoteJid, { text: `📘 Fact:\n${res.data.text}` })
  }
}
