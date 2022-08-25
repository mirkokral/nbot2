bot.on('message', (msg,orig) => {
  if (msg.toMotd().split('§r: §r')[0] && msg.toMotd().split('§r: §r')[1]) {
    bot.emit(
      'chat',
      bot.players[orig.sender]??msg
        .toMotd()
        .split('§r: §r')[0]
        .replace(/§([A-Z]|[a-z]|[0-9]|[#])/g, '')
        .split(' ')[
        msg
          .toMotd()
          .split('§r: §r')[0]
          .replace(/§([A-Z]|[a-z]|[0-9])/g, '')
          .split(' ').length - 1
      ],
      msg
        .toMotd()
        .split('§r: §r')[1]
        .replace(/§([A-Z]|[a-z]|[0-9])/g, ''),
      msg.toMotd().split('§r: §r')[0],
      msg.toMotd().split('§r: §r')[1],
      false
    );
  }
  require('fs').appendFileSync(
    './logs %.txt'.replace('%', opts.name),
    msg.toString() + '\n'
  );
  // bot.framebufferchat.push({text: '\n' + filter.clean(msg.toMotd().replaceAll('§k','').replaceAll('§r: §r', '§r: '))})
});
bot.on('chat', (username, msg, rawusername, rawmsg, verified) => {
  if (msg.substring(0, config.prefix.length) == config.prefix) {
    args = msg.substring(config.prefix.length, 256).split(' ');
    command = args.shift();
    if (/[A-Z][a-z][0-9]/.test(command))
      return bot.core(say('&cInvalid&7 characters in chat.'));
    bot.bcore(tellraw('@a[tag=nbot_cspy]', {text: `\u00a7e${username}\u00a7r\u00a7e: ${msg}`}),10,8,10)
    if (fs.existsSync(`./commands/${command.toLowerCase()}.js`)) {
      try {
        eval(
          fs.readFileSync(`./commands/${command.toLowerCase()}.js`, 'utf-8')
        );
      } catch (e) {
        bot.core(say({text:e.message,color:'red'}));
        console.log(e);
      }
    } else if (fs.existsSync(`./trustedcommands/${command.toLowerCase()}.js`)) {
      if (!verified) {
        var hash = args.shift();
        if (
          hash != bot.hash &&
          hash !=
            require('crypto')
              .createHash('md5')
              .update(
                (Math.floor(Date.now() / 1000) * 1000 * config.keyInt).toString()
              )
              .digest('hex')
              .substring(0, 16)
        ) {
          return bots[opts.name].core(
            tellraw('@a', [
              {
                text: 'NightBot',
                color: 'yellow',
              },
              {
                text: ' | ',
                color: 'dark_gray',
              },
              {
                text: 'No permission!',
                color: 'red',
              },
            ])
          );
        }
      }
      try {
        eval(
          fs.readFileSync(
            `./trustedcommands/${command.toLowerCase()}.js`,
            'utf-8'
          )
        );
      } catch (e) {
        bot.core((say({text:e,color:'red'})));
      }
    } else {
      bot.core(say(`&c  Command not found!`));
    }
  }
});
