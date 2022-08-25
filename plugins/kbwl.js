bot.kbwl = false
bot._client.on('player_info', e => {
    if(e.action == 0){
        if(bot.kbwl){
            if(!config.whitelist.includes(e.data[0].name))
                bot.core(`tell @a[name="${e.data[0].name.replaceAll('"', '\\"')}"] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`)
        }
    }
})