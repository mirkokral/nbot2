const      mc = require("minecraft-protocol"),
           fs = require("fs"),
eventemmitter = require('events'),
         util = require("util"),
         rand = require("randomstring")
function createBot(config){
    bot = new eventemmitter()
    bot.position = {x: 0, y: 0, z: 0}
    bot.pos;
    if(!config.username) config.username = "Liteflayer" + rand.generate(3)
    bot.disableChat = false
    bot._client = mc.createClient(config)
    const pchat = require("prismarine-chat")(config.version ? config.version : '1.18.2')
    bot._queue = []
    bot._client.on('position', (pos) => {bot.emit('pos',pos);bot.pos = pos})
    bot._client.on('chat', (msg) => {
        try{
            var message = new pchat(JSON.parse(msg.message))
            if (message.translate=='advMode.setCommand.success') return;
            if (message.toString().startsWith('Vanish for ' + config.username)) return
            if (message.toString() == "You are now completely invisible to normal users, and hidden from in-game commands.") return
            bot.emit('message', message, msg)
        } catch (e) {console.log(e)}
    })
    bot._client.on('login', (msg) => {
        try{
            bot.emit('login')
        } catch (e) {console.log(e)}
    })
    setInterval(() => {
        if(bot._queue[0]){
            bot._client.write("chat", {message: bot._queue[0]})
            bot._queue.shift()
        }
    }, 200);
    bot.end = (m) => {
        bot._client.end(m)
        bot.removeAllListeners()
    }
    bot.setCommandBlock = (command, pos, mode, flags) => bot._client.write('update_command_block',{command: command, location: pos, mode: mode, flags: flags})
    bot.chat = (send) => bot._queue.push(send)
    return bot
}
module.exports = { createBot }