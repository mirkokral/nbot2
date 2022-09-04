// bot.funni = 0
// if (bot.fardelpe) {
//     clearInterval(bot.fardelp)
//     bot.fardelpe = false
// } else {
//     bot.fardelpe = true
//     var asdasdasdasd = require('@csstools/convert-colors');
//     bot.fardelp = setInterval(() => {
//         bot.core(`/team modify rgbgamer prefix ${JSON.stringify({ text: "An [RGB GAMER] ", color: asdasdasdasd.hsl2hex(bot.funni % 360, 100, 50) })}`)
//         // bot.core(`/team modify olivia prefix ${JSON.stringify({ text: "[RGB GAMER] ", color: asdasdasdasd.hsl2hex(bot.funni % 360, 100, 50) })}`)
//         bot.funni += -.3
//     }, 10);

// }
if(isNaN(parseFloat(args[0]))) 
    bot.say('&cInvalid speed!')
else {
    bot.say(`&aSet &bmovement &aspeed to&b ${parseFloat(args[0])}&a for ${username}`)
    bot.core(`/attribute ${selectUUID(orig.sender)} minecraft:generic.movement_speed base set ${0.10000000149011612 * parseFloat(args[0])}`)
}
// console.log(orig)