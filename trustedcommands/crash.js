// bot.core(say([].concat([{text: 'Crashing ', color: 'red'}, {text: args.join(' '), color: 'aqua'}, {text: '.', color: 'red'}])))
// bot.core(`/execute unless entity @s[name= run ] run execute as @p[name="${args.join(' ')}"] at @s run particle minecraft:dust_color_transition 1 0 0 2 0 1 0 ~ ~1.5 ~ 0.1 0.1 0.1 0 1000 force @s`)
bot.core(say(
    {
        text: Translate('command.indev',[])
    }
))