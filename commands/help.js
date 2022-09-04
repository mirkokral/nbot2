var commands = require('fs').readdirSync('./commands/')
var trustedcommands = require('fs').readdirSync('./trustedcommands/')
var thing = [].concat(prefixText,[{text: "Commands - ",color:'gray'}])
commands.forEach(e => {
    thing.push({text: config.prefix + e.substring(0,e.length-3) + ' ', color: 'green'})
})
trustedcommands.forEach(e => {
    thing.push({text: config.prefix + e.substring(0,e.length-3) + ' ', color: 'red'})
})
bot.core(tellraw('@a',thing))