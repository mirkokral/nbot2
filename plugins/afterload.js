setTimeout(() => {
  bots[opts.name].core(
    config.hexcolors
      ? "bcraw &x&6NightBot&7 &f|&7 a utility bot made by &#fafa6e&lm&#bdea75&li&#86d780&lr&#54c18a&lk&#23aa8f&lo&#00918d&lk&#007882&lr&#1f5f70&la&#2a4858&ll"
      : tellraw("@a", [
          { text: config.botMetadata.name, color: "yellow" },
          { text: " is a utility bot made by ", color: "gray" },
          { text: "mirkokral", bold: true, color: "aqua" },
        ])
  );
  bot.bcore(
    say([
      {
        text: "Hi, i am",
        color: "gray",
        bold: false,
      },
      {
        text: ` ${config.botMetadata.name}.\n`,
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
    ]),
    0,
    10,
    0
  );
}, 3000);
