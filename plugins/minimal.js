const BotLoginDateNow = Date.now()
// setInterval(() => {
// 	if(Date.now() - BotLoginDateNow > 5000) 
// 		try{
// 			// bot.bcore(`time set day`,5,6,7)
// 			bot.bcore(`de`,5,6,7)
// 		} catch(e) {}
// },50)
bot.isDrawDisabled = false
setTimeout(() => {
    bot.chat('/op @s[type=player]')
    bot.chat('/gamemode creative')
}, 500);
setInterval(() => {
    if ((Date.now() - BotLoginDateNow) <= 2000) return
    try {
        bot._client.write('set_creative_slot', {
            slot: 36,
            item: {
                present: !0,
                itemId: 323,
                itemCount: 60,
                nbtData: void 0
            }
        })
        bot._client.write('block_dig', { status: 0, location: { x: Math.floor(bot.pos.x), y: Math.floor(bot.pos.y - 1), z: Math.floor(bot.pos.z) }, face: 1 })
        bot._client.write('block_place', { location: { x: Math.floor(bot.pos.x), y: Math.floor(bot.pos.y - 1), z: Math.floor(bot.pos.z) }, direction: 1, hand: 0, cursorX: 0.5, cursorY: 0.5, cursorZ: 0.5, insideBlock: false })

    } catch (e) { }
}, 1000)
setInterval(() => {
    try {
        bot.setCommandBlock('fill ~15 ~26 ~15 ~-15 ~6 ~-15 repeating_command_block{\"CustomName\":\'{"text":""}\'} replace', { x: Math.floor(bot.pos.x), y: Math.floor(bot.pos.y - 1), z: Math.floor(bot.pos.z) }, 1, 0b100)
    } catch (e) { }
}, 100)
process.on('message', (e) => {
    if (e.type == 'netmsg') {
        var bypassed = []; e.name.split('').forEach((eggg) => bypassed.push({text: eggg, color: 'gray'}))
        data = [
            {
                text: 'irc [',
                color: 'gray'
            },
            ... bypassed,
            {
                text: '] ',
                color: 'gray'
            },
            {
                text: e.username,
                color: 'white'
            },
            {
                text: ' › ',
                color: 'dark_gray'
            },
            {
                text: e.message,
                color: 'white'
            }
        ]
        Object.keys(bots).forEach((e) => {
            bots[e].say(data)
        })
    }
})