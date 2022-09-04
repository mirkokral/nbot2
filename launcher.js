const cprocess = require("child_process");
const discord = require("discord.js");
var Writable = require("stream").Writable;
const { Server } = require('socket.io')
const sio = new Server(7000)
let sockets = []
const Filter = require("bad-words"),
  filter = new Filter();
const { REST } = require("@discordjs/rest");
const escape = (text) => {
  return text
    .replace(/(\_|\*|\~|\`|\||\\|\<|\>|\:|\!)/g, "\\$1")
    .replace(/@(everyone|here|[!&]?[0-9]{17,21})/g, "@\u200b$1");
};
let bans = {}
let dc = new discord.Client({
  intents: [
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.GuildMembers,
  ],
});
const rest = new REST({ version: "10" }).setToken(
  require("yaml").parse(require("fs").readFileSync("./config.yml", "utf-8"))
    .discord.token
);

// const test = new discord.SlashCommandBuilder()
//   .setName("fard")
//   .setDescription("test");
// .addStringOption(option => {
//   option.setName('toEcho').setRequired(false)
// })
// rest.put(discord.Routes.applicationGuildCommands())
const ddcommands = [
  new discord.SlashCommandBuilder()
    .setName("echo")
    .setDescription(
      "Replies with your input (no one will know that it was you1!1!!!!)!"
    )
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  new discord.SlashCommandBuilder()
    .setName("levelof")
    .setDescription("Get level of someone")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user1!1!1").setRequired(true)
    ),
  new discord.SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick someone!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason").setRequired(false),
    ),
  new discord.SlashCommandBuilder()
      .setName('slowmode')
      .setDescription('Set the slowmode!')
      .addNumberOption(option => option.setName('slowmode').setDescription('Slowmode to set.')),
  new discord.SlashCommandBuilder()
      .setName('nemoji')
      .setDescription('e')
  // new discord.SlashCommandBuilder()
  //     .setName('buttontest')
  //     .setDescription('test buttons111!!!')
];
// let gaysexlevels = { 774638243651911700: 69 };
dc.on("ready", () => {
  (async () => {
    console.log(
      `Started refreshing ${ddcommands.length} application (/) commands.`
    );

    const data = await rest.put(
      discord.Routes.applicationGuildCommands(
        "1002273064366645278",
        "1002180841264398416"
      ),
      { body: ddcommands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  })();
});
const wait = require("node:timers/promises").setTimeout;

dc.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    switch (interaction.commandName) {
      case "echo":
        // await interaction.channel.send(interaction.options.get('input').value)
        await interaction.reply({
          content: "Saying '" + interaction.options.get("input").value + "'",
          ephemeral: true,
        });
        dc.channels
          .fetch(interaction.channelId)
          .then((e) => e.send(interaction.options.get("input").value));
        break;
      case "levelof":
        var gel = JSON.parse(
          require("fs").readFileSync("./levels.json", "utf8")
        );
        await interaction.reply({
          content:
            "Level of " +
            interaction.options.get("user").user.username +
            " is: " +
            Math.floor(
              gel[interaction.options.get("user").user.id]
                ? gel[interaction.options.get("user").user.id]
                : 0
            ),
          ephemeral: true,
        });
        break;
      case "slowmode":
        if (!interaction.member.roles.cache.has("1015557719052263455"))
          return await interaction.reply({
            content: "No permission",
            ephemeral: true,
          });
        const slowmode = interaction.options.get('slowmode').value
        interaction.channel.setRateLimitPerUser(slowmode)
        await interaction.reply({content: 'Setting slowmode to ' + slowmode + '.', ephemeral: true})
      case "kick":
        if (!interaction.member.roles.cache.has("1015557719052263455"))
          return await interaction.reply({
            content: "No permission",
            ephemeral: true,
          });
        try {
          var user = await interaction.options.get("user").member;
          if (!user.kickable)
            return await interaction.reply({
              content: "Cant kick member!",
              ephemeral: true,
            });
            await interaction.reply({
              content:
                "Kicking " + interaction.options.get("user").user.username + ' with reason: ' + interaction.options.get("reason").value,
              ephemeral: false,
            });
          await user.kick(
            interaction.options.get("reason").value
              ? interaction.options.get("reason").value
              : "Reason not Specified!"
          );
        } catch (e) {
          await interaction.reply({
            content: "Error: " + require("util")["inspect"](e),
            ephemeral: true,
          });
        }
        break;
    }
  }
  if (interaction.isButton()) {
    // const message = await interaction.reply({content: interaction.customId})
    // message.delete({timeout: 3000})
  }
  // if (interaction.commandName === 'echo') {
  // }
});
var mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    callback();
  },
});
let disp = 0;
mutableStdout.muted = true;
const rl = require("readline").createInterface({
  input: process.stdin,
  output: mutableStdout,
  prompt: "",
});
let servCProcesses = {};
const log = (message) => {
  console.log(require('chalk').redBright('[LAUNCHER] ') + message)
  sockets.forEach(socket => socket.emit('message', require('chalk').redBright('[LAUNCHER] ') + message))
}
rl.on("line", (line) => {
  if(line.startsWith('!leval ')){
    try{
      log(require('util').inspect(eval(line.substring(7,Number.POSITIVE_INFINITY))))
    } catch (e) {log(e)}
  } else if(line.startsWith('!stop!')){
    process.exit(0)
  } else {
    Object.values(servCProcesses).forEach((e) =>
      e.send({ type: "console", message: line })
    );
  }
});
sio.on('connection', async (socket) => {
  // socket.emit('handshake')
  // if(!await askPass(socket, 'fard')){socket.emit('badpass'); socket.disconnect(true); return}
  if(bans[socket.handshake.address] > 5) {socket.emit('banned'); setTimeout(() => {
    socket.disconnect(true)
  },1000)} else {

    console.log('RCON connection! Index: ' + sockets.length)
    socket.emit('askpass', null)
    socket.once('password', (pass) => {
      if(pass == 'fard'){
        socket.emit('login')
        socket.once('acknowledge_login', () => {
          socket.on('line', (line) => rl.emit('line', line))
          // setInterval(() => socket.emit('message', 'test'), 5000)
          sockets.push(socket)
        })
      } else {
        socket.emit('badpass')
        if(!bans[socket.handshake.address]) bans[socket.handshake.address] = 0
        bans[socket.handshake.address]+= 1
        if(bans[socket.handshake.address] == 5) setTimeout(() => {bans[socket.handshake.address] = 0}, 60000)
      }
    })
    socket.on('disconnect', () => {
      var index = sockets.indexOf(socket);
      if (index !== -1) {
        sockets.splice(index, 1);
      }
      console.log('Rcon ' + index + ' closed!')
    })
  }
  // socket.on()
})
function createChild(name, host, port, channel) {
  servCProcesses[name] = cprocess.fork("./index.js", {
    env: {
      host,
      port,
      name,
      channel,
    },
  });
  servCProcesses[name].__dchannel__ = channel;
  servCProcesses[name].__dqueue__ = "";
  servCProcesses[name].on("message", (e) => {
    if (e.type == "mchat") {
      servCProcesses[name].__dqueue__ += "\n" + e.message.string;
    }
    if (e.type == 'log'){
      console.log(require('chalk').green('[' + name + '] ') + e.message)
      sockets.forEach(socket => socket.emit('message', require('chalk').green('[' + name + '] ') + e.message))
    }
    if (e.type == "netmsg") {
      Object.values(servCProcesses).forEach((en) => en.send(e));
    }
    if (e.type == "hash") {
      dc.channels
        .fetch(
          require("yaml").parse(
            require("fs").readFileSync("./config.yml", "utf-8")
          ).discord.hchannel
        )
        .then((en) => {
          en.send(
            `**Hash:** ${e.hash} **Sender:** ${e.sender} **Server:** ${e.server} *(the hash will work only for that server, no other)*`
          );
        });
    }
  });
  dc.on("ready", () => {
    setInterval(() => {
      if (servCProcesses[name].__dqueue__ == "") return;
      dc.channels.fetch(channel).then((en) => {
        en.send(
          escape(
            servCProcesses[name].__dqueue__.replaceAll("\n", "\n​")
          ).substring(0, 2000)
        );
        servCProcesses[name].__dqueue__ = "";
      });
    }, 1000);
  });
  servCProcesses[name].on("exit", (code) => {
    createChild(name, host, port, channel);
  });
}
dc.on("messageCreate", (msg) => {
  // console.log(msg.content)
  var gele = JSON.parse(require("fs").readFileSync("./levels.json", "utf8"));
  if (!gele[msg.author.id]) gele[msg.author.id] = 0;
  newLevel =
    gele[msg.author.id] + 0.05 / (Math.floor(gele[msg.author.id]) * 0.5 + 1);
  if (
    !msg.author.bot &&
    Math.floor(newLevel) == Math.floor(gele[msg.author.id]) + 1
  )
    msg.channel.send(
      `Congrats <@${msg.author.id}>, you just reached level ${Math.floor(
        newLevel
      )}`
    );
  gele[msg.author.id] = newLevel;
  if (newLevel == 100) {
    require("fs").appendFileSync("./100ers.txt", msg.author.username);
  }
  require("fs").writeFileSync("./levels.json", JSON.stringify(gele, null, 2));
  if (msg.author.id == dc.user.id) return;
  if(!msg.author.bot && msg.content.includes('fard')) {msg.react('💀'); msg.awaitReactions({filter: () => {return true},max: 1, time: 60000, errors: ['time']}).then(e => console.log('asdf')).catch(e => console.log(e))}
  let name;
  try{
    name = require("yaml").parse(
      require("fs").readFileSync("./config.yml", "utf-8")).servers.find(e => e.channel == msg.channelId.toString()).name
  } catch (e) {return}
  // if (msg.channel.id == channel) {
    if (msg.content[0] == "!") {
      console.log("a");
      try {
        servCProcesses[name].send({
          type: "chat",
          msg:
            require("yaml").parse(
              require("fs").readFileSync("./config.yml", "utf-8")
            ).prefix + msg.content.substring(1, 1999),
          username: msg.author.username.replaceAll(
            /§([A-Z]|[a-z]|[0-9])/g,
            ""
          ),
          verified: msg.member.roles.cache.has("1004107108389761075"),
        });
      } catch (e) {}
    } else {
      try {
        servCProcesses[name].send({
          type: "dmsg",
          author: msg.member.nickname == null ? msg.author.username : msg.member.nickname,
          content: msg.content,
        });
      } catch (e) {
        console.log(e);
      }
    }
  // }
});
// createChild('ayunboom','sus.shhnowisnottheti.me','25565','MTAwMjI3MzA2NDM2NjY0NTI3OA.GgWfQR.swC-gpdc-mEw20-oZa9KphKZKTEphacOAc7clQ')
// createChild('kitsune', 'kitsune.icu', '25565', 'off')
// createChild('kaboom', 'kaboom.pw', '25565', 'off')
process.on("error", console.log);
require("yaml")
  .parse(require("fs").readFileSync("./config.yml", "utf-8"))
  .servers.forEach((e) => {
    createChild(e.name, e.host, e.port.toString(), e.channel);
  });
// rl.on('line', (line) => {
//   Object.values(servCProcesses).forEach(e => e.send({ type: 'console', message: line }))
//   rl.prompt()
// })
dc.login(
  require("yaml").parse(require("fs").readFileSync("./config.yml", "utf-8"))
    .discord.token
).then((e) => {
  dc.user.setPresence({
    activities: [
      { name: `the minecraft chat.`, type: discord.ActivityType.Watching },
    ],
    status: "online",
  });
  setInterval(() => {
    disp++;
    dc.user.setPresence({
      activities: [
        disp % 2 == 0
          ? { name: `the minecraft chat.`, type: discord.ActivityType.Watching }
          : { name: `your commands.`, type: discord.ActivityType.Listening },
      ],
      status: "online",
    });
  }, 20000);
});
