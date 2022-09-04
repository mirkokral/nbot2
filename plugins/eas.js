bot.eas = false
bot.easInterval = null
bot.ier = 0
// setInterval(() => {
//     bot.ier = 0.5
// }, 10000);
process.on('message', e => {
    if(e.type === 'eas') {
        bot.eas = !bot.eas
        bot.ier = 0
        if(bot.eas){
            bot.easInterval = setInterval(() => {
                bot.core('execute as @a at @s run playsound minecraft:block.note_block.flute master @a ~ ~1 ~ 99999999999999 1')
                bot.core(`/title @a actionbar ${JSON.stringify(
                    [
                        {
                            text: 'An emergency alert has been issued! More info: ' + e.msg,
                            color: 'red'
                        }
                    ]
                )}`)
                // bot.ier+=0.05
            }, 5);
        } else {
            clearInterval(bot.easInterval)
        }
    }
})