import axios from "axios"

export default {
  cmd: ["joke"],
  async run(sock, msg) {
    let res = await axios.get("https://v2.jokeapi.dev/joke/Any")
    let joke = res.data.setup ? `${res.data.setup}\n${res.data.delivery}` : res.data.joke
    await sock.sendMessage(msg.key.remoteJid, { text: joke })
  }
}
