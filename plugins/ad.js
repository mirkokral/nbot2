setInterval(() => {
  bot.bcore(
    say([
      {
        text: "Hi, i am",
        color: "gray",
        bold: false,
      },
      {
        text: " NightBot.\n",
        color: "yellow",
        bold: false,
      },
      {
        text: 'My prefix is "',
        color: "gray",
        bold: false,
      },
      {
        text: config.prefix,
        color: "aqua",
        bold: false,
      },
      {
        text: '", type ',
        color: "gray",
        bold: false,
      },
      {
        text: "[prefix]help".replace("[prefix]", config.prefix),
        color: "green",
        bold: true,
      },
      {
        text: " for a list of commands!",
        color: "gray",
        bold: false,
      },
      {
        text: "\nAlso, don't forget to join my discord by clicking this message.",
        color: "blue",
        clickEvent: {
          action: "open_url",
          value: "https://discord.gg/Mp3j7xJ2QJ",
        },
      },
    ]),
    0,
    10,
    0
  );
}, eval(config.ad.interval));
