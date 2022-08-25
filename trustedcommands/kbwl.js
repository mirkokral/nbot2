bot.kbwl = !bot.kbwl
bot.core(say(
    {
        text: Translate(('kbwl.' + (bot.kbwl ? 'enable' : 'disable')),''),
        color: 'red'
    }
))