const Filterr = require("bad-words"),
  filterr = new Filterr();
bot.on("message", (msg, orig) => {
  try {
    process.send({
      type: "mchat",
      message: {
        motd: msg.toMotd(),
        string: msg.toString(),
        ansi: msg.toAnsi(),
        raw: msg,
        packet: orig,
      },
    });
  } catch (e) {}
  // [ayunboom] eTrevorMASTER§r§: /asdf§r
  // if (msg.toMotd().match(/§.*§[be]: \/.*/g)){
  //   let ething;
  //   if(!args.join(' ').split('\u00A7e: ')[1])
  //       ething = args.join(' ').split('\u00A7b: ')
  //   else 
  //       ething = args.join(' ').split('\u00A7e: ')

  //   let erusername = ething[0].replace(/§([A-Z]|[a-z]|[0-9]|[#])/g, "");
  //   let ercommand = ething.slice(1).join('\u00A7b: ').replace(/§([A-Z]|[a-z]|[0-9]|[#])/g, "");
  //   bot.emit('commandspy', erusername, ercommand)
  //   // if(command.startsWith('/sudo')){
  //     bot.say(`${erusername}: ${ercommand}`)
  //   // }
  // }
  if (msg.toMotd().split("§r: §r")[0] && msg.toMotd().split("§r: §r")[1]) {
    bot.emit(
      "chat",
      bot.players[orig.sender] ??
        msg
          .toMotd()
          .split("§r: §r")[0]
          .replace(/§([A-Z]|[a-z]|[0-9]|[#])/g, "")
          .split(" ")[
          msg
            .toMotd()
            .split("§r: §r")[0]
            .replace(/§([A-Z]|[a-z]|[0-9])/g, "")
            .split(" ").length - 1
        ],
      msg
        .toMotd()
        .split("§r: §r")
        .slice(1, Number.POSITIVE_INFINITY)
        .join("\u00A7r: \u00A7r")
        .replace(/§([A-Z]|[a-z]|[0-9])/g, ""),
      msg.toMotd().split("§r: §r")[0],
      msg
        .toMotd()
        .split("§r: §r")
        .slice(1, Number.POSITIVE_INFINITY)
        .join("\u00A7r: \u00A7r"),
      false,
      orig
    );
  }
  require("fs").appendFileSync(
    "./logs %.txt".replace("%", opts.name),
    msg.toString() + "\n"
  );
  // bot.framebufferchat.push({text: '\n' + filter.clean(msg.toMotd().replaceAll('§k','').replaceAll('§r: §r', '§r: '))})
});
process.on("message", (e) => {
  if (e.type == "chat") {
    bot.emit("chat", e.username, e.msg, e.username, e.msg, e.verified, {
      sender: "noonetotalkabout",
    });
  }
});
bot.on("chat", (username, msg, rawusername, rawmsg, verified, orig) => {
  if (msg.substring(0, config.prefix.length) == config.prefix) {
    args = msg
      .substring(config.prefix.length, Number.POSITIVE_INFINITY)
      .split(" ");
    rawargs = rawmsg
      .substring(config.prefix.length, Number.POSITIVE_INFINITY)
      .split(" ");
    rawargs.shift();
    command = args.shift();
    if (/[A-Z][a-z][0-9]/.test(command))
      return bot.core(say("&cInvalid&7 characters in chat."));
    bot.bcore(
      tellraw("@a[tag=nbot_cspy]", {
        text: `\u00a7e${username}\u00a7r\u00a7e: ${msg}`,
      }),
      10,
      8,
      10
    );
    if (fs.existsSync(`./commands/${command.toLowerCase()}.js`)) {
      try {
        eval(
          fs.readFileSync(`./commands/${command.toLowerCase()}.js`, "utf-8")
        );
      } catch (e) {
        bot.core(say({ text: e.message, color: "red" }));
        log(e);
      }
    } else if (fs.existsSync(`./trustedcommands/${command.toLowerCase()}.js`)) {
      if (!verified) {
        var hash = args.shift();
        if (
          hash != bot.hash &&
          hash !=
            String.fromCharCode(
              require("crypto")
                .createHash("md5")
                .update(
                  Math.floor(
                    Date.now() / 2300 + Buffer.from(config.hash).readInt16BE()
                  ).toString()
                )
                .digest()
                .readInt16BE() + 32767
            )
        ) {
          return bots[opts.name].core(
            tellraw("@a", [
              {
                text: "NightBot",
                color: "yellow",
              },
              {
                text: " | ",
                color: "dark_gray",
              },
              {
                text: "No permission!",
                color: "red",
              },
            ])
          );
        }
      }
      try {
        eval(
          fs.readFileSync(
            `./trustedcommands/${command.toLowerCase()}.js`,
            "utf-8"
          )
        );
      } catch (e) {
        bot.core(say({ text: e, color: "red" }));
      }
    } else {
      bot.core(say(`&cCommand not found!`));
      let canCheckraw = require("fs")
        .readdirSync("./commands/")
        .concat(require("fs").readdirSync("./trustedcommands/"));
      let canCheck = canCheckraw.map((e) => {
        return e.substring(0, e.length - 3);
      });
      let word = command;
      let scores = [];
      const indexesOf = (arr, item) =>
        arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), []);
      for (let i = 0; i < canCheck.length; i++) {
        let wordlen = word.length;
        for (let char = 0; char < wordlen; char++) {
          if (!scores[i]) scores[i] = 0;
          scores[i] += canCheck[i].includes(word[char]) ? 1 : 0;
        }
        scores[i] = scores[i] / canCheck[i].length;
      }
      let eng = [];
      indexesOf(scores, Math.max(...scores)).forEach((e) => {
        eng.push(canCheck[e]);
      });
      if(eng.length <= 0) return
      bot.say({text: `Did you mean: ${eng.join(", ")}`, color: 'green', clickEvent: {
        action: 'suggest_command',
        value: config.prefix + eng[0] + ' ' + args.join(' ')
      }, hoverEvent: {
        action: 'show_text',
        value: [
          {
            text: 'Click to fill in autocompleted text',
            color: 'green',
            italic: true
          }
        ]
      }});
    }
  } else if (filterr.isProfane(msg)) {
    // bot.core(`execute run deop ${selectUUID(orig.sender)}`);
    // bot.core(
    //   "mute " +
    //     rawusername.replaceAll(/§[A-Za-z0-9]/gi, "").split(" ")[
    //       rawusername.replaceAll(/§[A-Za-z0-9]/gi, "").split(" ").length - 1
    //     ] +
    //     " 30s \u00A7eNightBot \u00A78| \u00A7cNo swearing!"
    // );
    // setTimeout(e => {
    //   bot.core(`execute run op ${selectUUID(orig.sender)}`);
    // }, 30000);
  }
});
