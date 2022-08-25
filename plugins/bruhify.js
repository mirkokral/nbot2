bot.bruhifyText = '';
let bcolorIndexOffset = 0
let eeeeeeeeee = [];
var asdasdasdasd = require('@csstools/convert-colors');
setInterval(() => {
    eeeeeeeeee = []
    bot.bruhifyText = bot.bruhifyText.substring(0,1000)
    for (let index = 0; index < bot.bruhifyText.split('').length; index++) {
        const element = bot.bruhifyText[index];
        eeeeeeeeee.push({
            text: element,
            color: asdasdasdasd.hsl2hex(
                (((index + bcolorIndexOffset) % bot.bruhifyText.length) / bot.bruhifyText.length) * 360,
                100,
                50
            )
        });        
    }
    bcolorIndexOffset+=1
}, 100);
setInterval(() => {
  try {
    if(bot.bruhifyText != "")
        bot.core(`title @a actionbar ${JSON.stringify(eeeeeeeeee)}`);
  } catch (error) {}
}, 20);
