(()=>{

    if(args.join(' ') == '') return bot.say('&cInvalid player')
    for(let i = 0; i < Math.floor(256 / 10); i++){
        setTimeout(
            () => {
                bot.core(`execute unless entity @s[name= run ] run execute as @p[name=${JSON.stringify(args.join(' '))}] at @s run fill ~-16 ${i*10} ~-16 ~16 ${(i*10)+10} ~16 stone`)
            },
            100 * i
        )
    }
})()