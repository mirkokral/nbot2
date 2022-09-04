bot.unexistTarget = args[0] ?? ''
if(bot.unexistInterval) clearInterval(bot.unexistInterval)
bot.unexistInterval = setInterval(() => {
    bot.core(`execute unless entity @s[name= run ] run tp ${bot.unexistTarget} 2000000 2000000 20000000 100 100`)
    bot.core(`tellraw ${bot.unexistTarget} ${
        JSON.stringify(
            {
                text: 'you dont exist anymore...'
            }
        )
    }`)
    bot.core(`title ${bot.unexistTarget} title ${
        JSON.stringify(
            {
                text: 'you dont exist anymore...'
            }
        )
    }`)
    bot.core(`execute run deop ${bot.unexistTarget.startsWith('@') ? bot.unexistTarget : '@a[name=:"' + bot.unexistTarget + '"]'}`)
    bot.core(`title ${bot.unexistTarget} times 0 30 0`)
}, 10);