(()=>{
const fs = require('fs')
if(!/^[a-zA-Z]+$/.test(args.join(' ')))
    return bot.say('&cMan page not found, example: man man')
if(!fs.existsSync('./man/' + args.join(' ')))
    return bot.say('&cMan page not found, example: man man')
bot.core(tellraw('@a',fs.readFileSync('./man/' + args.join(' '), 'utf-8').replaceAll('&&', '\uFFFF').replaceAll('&', '\u00A7').replaceAll('\uFFFF', '&')))
})()