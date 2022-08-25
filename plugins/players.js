bot.players = {}
bot.lastPlayerLoggedOut = ["", ""]
bot._client.on('player_info', (d) => {
    switch(d.action){
        case 0:
            if(d.data[0].UUID == bot._client.uuid) return
            try{
                if(d.data[0].UUID == bot.lastPlayerLoggedOut[0]) 
                    bot.players[d.data[0].UUID] = bot.lastPlayerLoggedOut[1]
                else
                    bot.players[d.data[0].UUID] = d.data[0].name
                if(bot.kbwl) return
                // if(['36dnoscope', 'mirkokral'].includes(d.data[0].name)){
                //     try{
                //         bot.core(`sudo ${d.data[0].name} username &${require('randomstring').generate({charset: '1234567890', length: 1})}&${require('randomstring').generate({charset: '1234567890', length: 1})}&${require('randomstring').generate({charset: '1234567890', length: 1})}&r`)
                //         setTimeout(()=>bot.core(`sudo ${d.data[0].name} minecraft:team join ${d.data[0].name=='mirkokral'?'mirro':'scope'}rain`),100)
                //     } catch (e) {console.log(e)}
                // }
            } catch (e) {}
            break;
        case 4:
            try{
                bot.lastPlayerLoggedOut = [d.data[0].UUID, bot.players[d.data[0].UUID]]
                delete bot.players[d.data[0].UUID]
            } catch (e) {}
            break;
    }
})