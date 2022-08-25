(async function () {
  const discord = require('discord.js');
  bot.discord = {
    client: new discord.Client({
      intents: [
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMembers,
      ],
    }),
    queue: '',
  };
  bot.discord.queue += `\nLogged into **${opts.name}** (${opts.host}) as ${bot._client.username}`;
  bot.discord.client.on('ready', () => {
    setInterval(() => {
      if (bot.discord.queue.trim() != '') {
        bot.discord.client.channels
          .fetch(config.discord.channel)
          .then((channel) =>
            channel.send( 
              bot.discord.queue == ''
                ? '​'
                : '\n​'+bot.discord.queue.substring(1, 1900)
            )
          );
        setTimeout(() => {
          bot.discord.queue = '';
        }, 200);
      }
    }, 500);
    bot.core(say({ text: 'Logged into discord!', color: 'green' }));
  });
  var markdownEscape = function (text) {
    return text.replace(/((\_|\*|\~|\`|\|\:){2})/g, '\\$1');
  };
  bot.on('hash', (h, u) => {
    bot.discord.client.channels
      .fetch(config.discord.hchannel)
      .then((channel) =>
        channel.send(`**Hash:** ${h} **Sender:** ${u} **Server:** ${opts.name}`)
      );
  });
  bot.on('message', (m) => {
    if (m.toMotd().startsWith('§eNightBot§r§8 | §r§9[DISCORD] §r')) return;
    if (m.toString() == '') {
      bot.discord.queue += '\n​';
    } else {
      bot.discord.queue +=
        '\n' +
        markdownEscape(m.toString())
          .replaceAll('<@', '<$')
          .replaceAll('@everyone', '\\@ everyone')
          .replaceAll('@here', '\\@ here');
    }
  });
  bot.discord.client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    console.log(msg.author.username);
    console.log(msg.channelId);
    if (msg.channelId == '1002292221233598585'){
      if(filter.isProfane(msg.content)) {msg.delete();msg.author.send(`don't care + didn't ask + cry about it + stay mad + get real + L + ratio + mald seethe cope harder + hoes mad + basic + skill issue + you fell off + the audacity + triggered + beta + caught in 4k + any askers + redpilled + get a life + ok and? + cringe + touch grass + donowalled + not based + anime pfp + not funny didn't laugh + you're* + grammar issue + go outside + get good + reported + ad hominem + ask deez + ez clap + straight cash + ratio again + stay pressed + cancelled + done for + rip bozo + slight_smile + mad cuz bad + lol + irrelevant + cope + jealous + whine about it + your problem + don't care even more + not okay + I'm better than you +extra ratio + cringe + your* + don't care + didn't ask + cry about it + stay mad + get real + L + ratio + mald seethe cope harder + hoes mad + basic + skill issue + you fell off + the audacity + triggered + beta + caught in 4k + any askers + redpilled + get a life + ok and? + cringe + touch grass + donowalled + not based + anime pfp + not funny didn't laugh + you're* + grammar issue + go outside + get good + reported + ad hominem + ask deez + ez clap + straight cash + ratio again + stay pressed + cancelled + done for + rip bozo + slight_smile + mad cuz bad + lol + irrelevant + cope + jealous + whine about it + your problem + don't care even more + not okay + I'm better than you +extra ratio + don't care + didn't ask + cry about it + stay mad + get real + L + ratio + mald seethe cope harder + hoes mad + basic + skill issue + you fell off + the audacity + triggered + beta + caught in 4k + any askers + redpilled + get a life + ok and? + cringe + touch grass + donowalled + not based + anime pfp + not funny didn't laugh + you're* + grammar issue + go outside + get good + reported + ad hominem + ask deez + ez clap + straight cash + ratio again + stay pressed + cancelled + done for + rip bozo + slight_smile + mad cuz bad + lol + irrelevant + cope + jealous + whine about it + your problem + your gay + nobody loves you + homo`)}
    }else 
    if (msg.channelId == '1002291990702084186') {
      const origrole = await msg.guild.roles.fetch('1004107407191978158');
      const verirole = await msg.guild.roles.fetch('1004107108389761075');

      if (msg.content[0] == '!') {
        const args = msg.content.substring(1, 2000).split(' ');
        const rawusername = msg.author.username;
        const username = rawusername.replaceAll(/$[0-9][A-Z][a-z]/gi, '');
        const command = args.shift();
        bot.bcore(tellraw('@a[tag=nbot_cspy]', {text: `\u00a7e${username}\u00a7r\u00a7e: ${msg.content}`}),10,8,10)

        if (fs.existsSync(`./commands/${command.toLowerCase()}.js`)) {
          try {
            const trusted = msg.member.roles.cache.has('1004107108389761075');
            const verified = msg.member.roles.cache.has('1004107108389761075');
            msg.delete()
            eval(
              fs.readFileSync(`./commands/${command.toLowerCase()}.js`, 'utf-8')
            );
          } catch (e) {
            bot.core(say({text:e,color:'red'}));
          }
        } else if (
          fs.existsSync(`./trustedcommands/${command.toLowerCase()}.js`)
        ) {
          if (!msg.member.roles.cache.has('1004107108389761075')) {
            msg.reply('You are not trusted').then(emsg => emsg.delete({timeout: 2000}))
          }
          try {
            const trusted = true;
            const verified = true;
            msg.delete()
            eval(
              fs.readFileSync(
                `./trustedcommands/${command.toLowerCase()}.js`,
                'utf-8'
              )
            );
          } catch (e) {
            bot.core(say({text:e,color:'red'}));
          }
        } else
          msg.reply('Command not found!').then(emsg => emsg.delete({timeout: 5000}))
      } else {
      await bot.bcore(
        say([
          {
            text: '[DISCORD] ',
            color: 'blue',
            hoverEvent: {
              action: 'show_text',
              value: {
                text: 'Join this discord to get real ✔️! (click to join)',
              },
            },
            clickEvent: {
              action: 'open_url',
              value: 'https://discord.gg/Mp3j7xJ2QJ',
            },
          },
          {
            text: msg.author.username,
            color: msg.member.roles.cache.has('1004107407191978158')
              ? 'aqua'
              : 'gold',
          },
          {
            text: ' › ',
            color: 'dark_gray',
          },
          {
            text: msg.content.replaceAll('&', '\u00A7'),
            color: 'white',
          },
        ]),
        9,
        10,
        9
      );
    }}
  });
  bot.discord.client.login(process.env.token);
})();
