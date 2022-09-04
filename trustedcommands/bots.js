createSpamBot = (opts) => {
  try {
    var spamBot = require("minecraft-protocol").createClient({
      host: opts.host,
      port: opts.port,
      checkTimeoutInterval: 1 * 60 * 60 * 1000,
      username: opts.name,
    });
    spamBot.on("login", () => {
      setInterval(() => {
        spamBot.write("chat", { message: spammessage });
      }, 100);
    });
    spamBot.on("entity_status", (d) => {
      if (d.entityStatus == 24) {
        sus.forEach((e) =>
          e.write("chat", { message: "/op " + spamBot.username })
        );
      }
    });
    // spamBot.on("end", (m) => {
    //   if (m != "stopping bots") createSpamBot(opts);
    // });
    spamBot.on("error", log);
    sus[opts.name] = spamBot;
  } catch (e) {
    log(e);
  }
};
switch (args.shift()) {
  case "add":
    createSpamBot({ host: opts.host, port: opts.port, name: args[0] });
    break;
  case "massadd":
    for (let i = 0; i < parseInt(args[0]); i++) {
      setTimeout(() => {
        createSpamBot({
          host: opts.host,
          port: opts.port,
          name: require("randomstring").generate(Math.floor(Math.random() * 13) + 3),
        });
      }, 2000 * i);
    }
  case "kill":
    spammessage = "";
    bot.disableChat = false;
    Object.values(sus).forEach((e) => e.end("stopping bots"));
    break;
  case "chat":
    Object.values(sus).forEach((e) =>
      e.write("chat", { message: args.join(" ").replace("%%%s", e.username) })
    );
    break;
  case "setSpam":
    spammessage = args.join(" ");
    if (spammessage == "") {
      bot.disableChat = false;
    } else {
      bot.disableChat = true;
    }
    break;
  default:
    bot.core(say({ text: "Invalid command!", color: "red" }));
}
