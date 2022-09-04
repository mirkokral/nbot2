const liteflayer = require("./liteflayer");
const Translater = require('./NBotChat')
var Filter = require('bad-words'),
  filter = new Filter();
filter.addWords('kurva', 'pica', 'piča', 'jebať', 'kurva', 'kurwa');
const Translate = Translater.Translate
Translater.FetchAllTranslations()
let sus = {}
const prefixText = [
  {
    text: "NightBot",
    color: "yellow",
  },
  {
    text: " | ",
    color: "dark_gray",
  },
];
var config = require("yaml").parse(
  require("fs").readFileSync("./config.yml", "utf-8")
);

const nbt = require('prismarine-nbt')

function parseUsername (username) {
  return username
    .replace(/§c/, '')
}

function selectUUID (UUID) {

  return `@p[nbt={UUID:[I;${UUIDToInt(UUID).value.join()}]}]`
}

function UUIDToInt (uuid) {
  return nbt.intArray(uuid.replace(/-/g, '').match(/.{8}/g).map(string => Number.parseInt(string, 16)).map(number => number & 0x80000000 ? number - 0xffffffff - 1 : number))
}

// module.exports = { parseUsername, UUIDToInt, selectUsername }
const sleep = require("system-sleep");
const fs = require("fs");
const express = require("express");
const app = express();
var spammessage = ""
var bots = {};

// app.use(express.json())
function stop(m) {
  Object.keys(bots).forEach((e) => {
    try {
      bots[e].core(
        `minecraft:tellraw @a ${JSON.stringify([
          "",
          { text: "NightBot", color: "yellow" },
          { text: " | ", color: "dark_gray" },
          m
            ? { text: "Stopping: " + m, color: "red" }
            : { text: "Stopping...", color: "red" },
        ])}`
      );
      setTimeout(() => bots[e].end(), 200);
    } catch (e) { }
    setTimeout(() => process.exit(), 300);
  });
}
const asdfg = require('prismarine-chat')('1.18.2')
// app.get("/stop", (req, res) => {
//   res.send("stopping");
//   stop("Interrupted using proxy!");
// });
// app.post("/console", (req, res) => {
//   res.send("doing");
//   console.log(req.body)
//   Object.values(bots).forEach(bot => bot.rl.emit('line', req.body.message))
// });
tellraw = (w, m) => {
  return `minecraft:tellraw ${w} ${JSON.stringify(m)}`;
};
say = (m) => {
  if (typeof m == "string") m = m.replaceAll('&', '\u00A7').replaceAll('\uFFFF', '&')
  return tellraw('@a', [].concat(prefixText, m))
}
String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
String.prototype.map = function (func) {
  return this.split("").map(func).join('');
};
const log = (...msg) => process.send({type: 'log', message: msg})
process.on('message', (e) => {
  if(e.type == 'dmsg'){
    // console.log(e)
    Object.keys(bots).forEach(ef => {
      try{

        bots[ef].say(([
          {
            text: '[DISCORD] ',
            color: 'blue',
            bold: true
          },
          {
            text: e.author,
            color: 'red'
          },
          {
            text: ' » ',
            color: 'gray'
          },
          {
            text: e.content.replaceAll('&&','\uFFFF').replaceAll('&', '\u00A7').replaceAll('\uFFFF', '&'),
            color: 'white'
          }
        ]))
      } catch (e) {log(e)}
    })
  }
})
createBot = async (opts) => {
  bots[opts.name] = await liteflayer.createBot({
    host: opts.host,
    port: opts.port,
    username: config.betterUsername ? require('randomstring').generate({ charset: `!@#$%^&*(_+{}|-=]\\:"<>?;',./)`, length: 2 }).map(e => '\u00A7' + e) + '\u00A7r\u00A7eNightBot'
    : require('randomstring').generate((Math.floor(Math.random() * 13) + 3)),
    checkTimeoutInterval: 1 * 60 * 60 * 1000,
    version: config.version,
  });
  const mplayer = require('./music/player')
  bots[opts.name].musicplayer = new mplayer(bots[opts.name])
  bots[opts.name].ccloops = []
  bots[opts.name].tellraw = (sus) => {bots[opts.name].core(tellraw('@a', sus))}
  await bots[opts.name].on("message", (msg) => {
    if (bot.disableChat) return
    // if(msg.toMotd().startsWith('§7[nbot console] §r§cmirkokral§r: §r')) return
    // fs.appendFileSync('./e.log','[' + opts.name + '] ' + msg.toMotd().replaceAll('\n', '\n[' + opts.name + '] ') + '\n');
    log(msg.toAnsi());
    // console.log(msg.toMotd());
  });
  process.on('message', (data) => {
    if(data.type == 'console'){
        const d = data.message
        if(d.startsWith('!eval ')){
          if(opts.name == 'ayunboom'){
            log(eval(d.substring(6, Number.POSITIVE_INFINITY)))
          }
        } else
        if(
          d.startsWith('!@' + opts.name) ||
          d.startsWith('!@' + 'every')
        ) {
          var j = d.split(' ').slice(1).join(' ')
          if(j.startsWith('!eval ')){
            if(opts.name == 'ayunboom'){
              log(require('util').inspect(eval(j.substring(6, Number.POSITIVE_INFINITY))))
            }
          } else if(j[0] == config.prefix){
            bot.emit("chat", 'mirkokral', j, '\u00A7cmirkokral', j, true, {sender: 'noonetotalkabout'});
          } else {
            
            bot.say(([
              {
                text: '[nbot console] ',
                color: 'gray'
              },
              {
                text: 'mirkokral',
                color: 'red'
              },
              {
                text: ' » ',
                color: 'gray'
              },
              {
                text: j.replaceAll('&&','\uFFFF').replaceAll('&', '\u00A7').replaceAll('\uFFFF', '&'),
                color: 'white'
              }
            ]))
          }
        } else if(!d.startsWith('!@')){
          if(opts.name == 'ayunboom'){

            if(d[0] == config.prefix){
              bot.emit("chat", 'mirkokral', d, '\u00A7cmirkokral', d, true, {sender: 'noonetotalkabout'});
            } else {
              
              bot.say(([
                {
                  text: '[nbot console] ',
                  color: 'gray'
                },
                {
                  text: 'mirkokral',
                  color: 'red'
                },
                {
                  text: ' » ',
                  color: 'gray'
                },
                {
                  text: d.replaceAll('&&','\uFFFF').replaceAll('&', '\u00A7').replaceAll('\uFFFF', '&'),
                  color: 'white'
                }
              ]))
            }
          } 
        }
    }
  
  })
  bots[opts.name].hash = require("crypto")
    .createHash("md5")
    .update(Date.now().toString())
    .digest("hex");
  require("fs").writeFileSync("./hash %.txt".replace('%', opts.name), bots[opts.name].hash);

  await bots[opts.name]._client.on("error", (e) => {
    log(e);
  });
  bots[opts.name].say = (m) => { try { bots[opts.name].core(say(m)) } catch (e) { log('Some say error happend ' + e) } }
  await bots[opts.name]._client.on("end", () => setTimeout(() => {bots.forEach(e => {try{e.end()} catch (e) {}});log('Bot ended!');bots[opts.name] = createBot(opts)}, 5000));
  // bots[opts.name].rl = require("readline").createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  //   prompt: "".replace("%", opts.name),
  // });
  bots[opts.name].on('login', () => {
    if(config.autolog){
      // bots[opts.name].chat("/essentials:evanish enable")
      bots[opts.name].chat("/cspy on");
      // if(!config.betterUsername) bots[opts.name].chat("/extras:username &%&%&eNightBot".replace('%', Math.floor(Math.random() * 9)).replace('%', Math.floor(Math.random() * 9)));
      config.plugins.forEach((e) => {
        // bot.chat('&3[&b&lLOAD&3] &b%'.replace('%',e))
        try {
          eval(fs.readFileSync(`./plugins/${e}`, "utf-8"));
          // bot.chat('&2[&a&lOK&2] &b%'.replace('%',e))
        } catch (e) {
          bot.chat("&4[&c&lPLUGIN ERROR&4] &b%".replace("%", e));
        }
      });
    }
  })
  // bots[opts.name].rl.prompt();
  // bots[opts.name].rl.on("line", (input) => {
  //   msg = input
  //   rawmsg = input
  //   username = "mirko"
  //   rawusername = "\u00A7cmirko"
  //   if (input.substring(0, config.prefix.length) == config.prefix) {
  //     args = msg.substring(config.prefix.length, 1231823971298037).split(" ");
  //     command = args.shift();
  //     if (/[A-Z][a-z][0-9]/.test(command))
  //       return bot.core(say("&cInvalid&7 characters in chat."));
  //     if (fs.existsSync(`./commands/${command.toLowerCase()}.js`)) {
  //       try {
  //         eval(
  //           fs.readFileSync(`./commands/${command.toLowerCase()}.js`, "utf-8")
  //         );
  //       } catch (e) {
  //         bot.chat("&c" + e);
  //       }
  //     } else if (
  //       fs.existsSync(`./trustedcommands/${command.toLowerCase()}.js`)
  //     ) {
  //       try {
  //         eval(
  //           fs.readFileSync(
  //             `./trustedcommands/${command.toLowerCase()}.js`,
  //             "utf-8"
  //           )
  //         );
  //       } catch (e) {
  //         console.log(e.message);
  //       }
  //     } else {
  //       console.log('Command not found!')
  //     }
  //   } else if (msg.substring(0, 5) == "!eval") {
  //     var PrettyError = require('pretty-error');
  //     var pe = new PrettyError();
  //     args = msg.split(' ')
  //     args.shift()
  //     asdf = args.join(' ')
  //     try {
  //       console.log(eval(asdf))
  //     } catch (e) { console.log(pe.render(e)) }
  //   } else if (msg.substring(0, 6) == '!cloop') {
  //     args = msg.split(' ')
  //     args.shift()
  //     switch (args.shift()) {
  //       case 'add':
  //         var thisCLoop = {
  //           delay: parseInt(args.shift()),
  //           command: args.join(' '),
  //           interval: null,
  //         };
  //         thisCLoop.interval = setInterval(() => {
  //           try{
  //             bot.core(
  //               eval('`' + thisCLoop.command.replaceAll('`', '\\`') + '`')
  //             );
  //           } catch (e) {console.log(e.message)}
  //         }, thisCLoop.delay);
  //         bot.ccloops.push(thisCLoop);
  //         console.log(
  //           Translate("cloop.added", [thisCLoop.command, thisCLoop.delay.toString()]),
  //         );
  //         break;
  //       case 'list':
  //         var text = [];
  //         for (var i = 0; i < bot.ccloops.length; i++) {
  //           text.push({
  //             text: `${i}: ${bot.ccloops[i].command}`,
  //             color: i % 2 == 1 ? 'gold' : 'yellow',
  //           });
  //         }
  //         console.log(new asdfg(text).toAnsi())
  //         break;
  //       case 'remove':
  //         const ID = parseInt(args[0]);
  //         if (bot.ccloops[ID]) {
  //           console.log(new asdfg([

  //                 {
  //                   text: Translate('cloop.removed', ''),
  //                   color: 'red'
  //                 },
  //                 {
  //                   text: bot.ccloops[ID].command,
  //                   color: 'blue'
  //                 },
  //                 {
  //                   text: ' (id %).'.replace('%', ID),
  //                   color: 'red'
  //                 }]
  //           ).toAnsi())
  //           clearInterval(bot.ccloops[ID].interval);
  //           bot.ccloops.splice(ID, 1);
  //         }
  //         break;
  //       default:
  //         console.log('Inalid usage')
  //     }

  //   }
  //   else if (msg.startsWith('!login')) {

  //     bots[opts.name].chat("/essentials:evanish enable")
  //     bots[opts.name].chat("/commandspy:commandspy enable");
  //     // if(!config.betterUsername) bots[opts.name].chat("/extras:username &%&%&eNightBot".replace('%', Math.floor(Math.random() * 9)).replace('%', Math.floor(Math.random() * 9)));
  //     config.plugins.forEach((e) => {
  //       // bot.chat('&3[&b&lLOAD&3] &b%'.replace('%',e))
  //       try {
  //         eval(fs.readFileSync(`./plugins/${e}`, "utf-8"));
  //         // bot.chat('&2[&a&lOK&2] &b%'.replace('%',e))
  //       } catch (e) {
  //         bot.chat("&4[&c&lPLUGIN ERROR&4] &b%".replace("%", e));
  //       }
  //     });
  //   } else {

  //     bots[opts.name].core(
  //       tellraw(
  //         "@a",
  //         [].concat(prefixText, [
  //           {
  //             text: "[console] ",
  //             color: "gray",
  //           },
  //           {
  //             text: "mirko",
  //             color: "red",
  //           },
  //           {
  //             text: ": ",
  //             color: "white",
  //           },
  //           {
  //             text: input
  //               .replaceAll("dsc.gg/o7", "ds\u00A7rc.gg/o7")
  //               .replaceAll('&&', '\uFFFF')
  //               .replaceAll("&", "\u00A7")
  //               .replaceAll('\uFFFF', '&'),
  //             color: "white",
  //           },
  //         ])
  //       )
  //     );
  //   }
  //   bots[opts.name].rl.prompt();
  // });
};
process.on("SIGINT", () => stop("Interrupted from console!"));
// config.servers.forEach(createBot);
createBot({
  name: process.env.name,
  host: process.env.host,
  port: parseInt(process.env.port)
})
// app.listen(6900);
