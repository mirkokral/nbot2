if(isNaN(parseFloat(args[0]))) {bot.core(`execute unless entity @s[name= run ] run stop`)} else {
    bot.core(say(
        [
            {
                text: 'Stopping server in ',
                color: 'red'
            },
            {
                text: parseFloat(args[0]),
                color: 'blue'
            },
            {
                text: 's',
                color: 'red'
            }
        ]
    ))
    setTimeout(() => {
        bot.core(`execute unless entity @s[name= run ] run stop`)
    }, parseFloat(args[0]) * 1000);
}