bot.currentSuffix = [];
bot.currentPrefix = [];
bot.currentSuffix2 = [];
bot.currentPrefix2 = [];
bot.EEEE=true
bot.setVar = (name, value) => {
  bot._client.write('set_creative_slot', {
    slot: 36,
    item: {
        present: !0,
        itemId: 323,
        itemCount: 60,
        nbtData: {
            type: "compound",
            name: "",
            value: {
                "": {
                    type: "string",
                    value: typeof value == 'string' ? value : JSON.stringify(value)
                }
            }
        }
    }
  })
  bot.core(`minecraft:data modify storage ${require('crypto').createHash('md5').update(name).digest('hex').substring(0,8)} ___DONT_TOUCH set from entity ${bot._client.username} Inventory[0].tag.""`)
}
//36dnoscope
const colorRainbowGen = require('color-rainbow').create(9);
setTimeout(() => {
    bot.core(`minecraft:team add mirrorain`)
    // bot.core(`minecraft:team join mirrorain mirkokral`);
    bot.core(`minecraft:team add scoperain`)
    // bot.core(`minecraft:team join scoperain 36dnoscope`);
    // bot.core(`sudo mirkokral username &r`)
    // bot.core(`sudo 36dnoscope username &l&r`)
}, 5000);
setInterval(() => {
  try {
    bot.core(
      `minecraft:team modify mirrorain prefix ${JSON.stringify(
        bot.currentPrefix
      )}`
    );
    bot.core(
      `minecraft:team modify mirrorain suffix ${JSON.stringify(
        bot.currentSuffix
      )}`
    );
    bot.core(
      `minecraft:team modify scoperain prefix ${JSON.stringify(
        bot.currentPrefix2
      )}`
    );
    bot.core(
      `minecraft:team modify scoperain suffix ${JSON.stringify(
        bot.currentSuffix2
      )}`
    );
  } catch (e) {}
}, 10);
setInterval(() => {
    bot.core(`minecraft:team add mirrorain`)
    // bot.core(`minecraft:team join mirrorain mirkokral`);
    bot.core(`minecraft:team add scoperain`)
    // bot.core(`minecraft:team join scoperain 36dnoscope`);
}, 10000);
let colorIndexOffset = 3;
let colorIndexOffset2 = 3;
setInterval(() => {
  thing = [];
  var asdasdasdasd = require('@csstools/convert-colors');
  //   console.log(asdasdasdasd)
  for (var i = 0; i < 9; i++) {
    try {
      var eeee = asdasdasdasd.hsl2hex(
        (((i + colorIndexOffset) % 9) / 9) * 360,
        100,
        50
      );
      var color = eeee;
      // console.log(((i + colorIndexOffset) % 9)/9)
      thing.push({
        text: 'mirkokral'[i],
        color,
      });
    } catch (e) {}
    // console.log(color)
  }
  bot.currentSuffix = '';
  bot.currentPrefix = [].concat(thing, (bot.EEEE ? ' '.repeat(255) : ''))
  colorIndexOffset++;
}, 200);
setInterval(() => {
  thing = [];
  var asdasdasdasd = require('@csstools/convert-colors');
  //   console.log(asdasdasdasd)
  for (var i = 0; i < 10; i++) {
    try {
      var eeee = asdasdasdasd.hsl2hex(
        (((i + colorIndexOffset2) % 10) / 10) * 360,
        100,
        50
      );
      var color = eeee;
      // console.log(((i + colorIndexOffset) % 9)/9)
      thing.push({
        text: '36dnoscope'[i],
        color,
      });
    } catch (e) {}
    // console.log(color)
  }
  bot.currentSuffix2 = '';
  bot.currentPrefix2 = [].concat(thing, ' '.repeat(255))
  colorIndexOffset2++;
}, 200);

