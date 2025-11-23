export default {
  cmd: ["menu","help"],
  async run(sock, msg) {
    const text = `
📌 *SimpleBot Menu*
  
1. .ping
2. .joke
3. .quote
4. .fact
5. .time
6. .owner

Bot simple by Baileys MD
`
    await sock.sendMessage(msg.key.remoteJid, { text })
  }
}
