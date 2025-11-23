export default async function reply(sock, msg, text) {
  await sock.sendMessage(msg.key.remoteJid, { text })
}
