bot.isVisible = false
bot._client.on('entity_status', (data) => {
    if (data.entityStatus == 24) {
        bot.chat('/op @s[type=player]')
    } else if(data.entityStatus == 22) {
        bot.chat('/gamerule reducedDebugInfo false')
    }
})
bot._client.on('player_info', (d) => {
    if(d.action == 1){
        if(d.data[0].UUID == bot._client.uuid){
            if(d.data[0].gamemode != 1){
                bot._client.write("chat",{message: '/gamemode creative'})
            }
        }
    }
})
var currentTimeEEE = Date.now()
bot.on('message', (msg) => {
    if(msg.toString().startsWith("You have been muted")  && !msg.toString().endsWith('for now.') || msg.toString().startsWith("Your voice has been silenced")){
        bot.chat(`/mute ${bot._client.username} 0`)
    }
    if(msg.toString().startsWith("You have been jailed")){
        bot.chat(`/unjail ${bot._client.username}`)
    }
    if (msg.toMotd().startsWith('§rYou now have the tag: ')) {
        bot.chat('/prefix off')
    }
    if (msg.toMotd().startsWith('§6Your nickname is now ')){
        bot.chat('/nick off')
    }
})
setInterval(() => {
    try{
        bot.core(
            `essentials:vanish ${bot._client.username} ${bot.isVisible ? 'off' : 'on'}`
        )
        bot.core(
            `minecraft:tag ${bot._client.username} add nbot`
        )
    }catch(e){}
}, 40);