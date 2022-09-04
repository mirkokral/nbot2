bot.framebuffer = [];
bot.framebufferchat = [];
setInterval(() => {
  for (let ix = -1; ix < 1; ix++) {
    bot.bcore(
      `tellraw @a[tag=fb] ${JSON.stringify(
        [].concat(
          ["\n".repeat(20)],
          typeof bot.framebuffer == "array"
            ? bot.framebuffer.slice(-50, 0)
            : [bot.framebuffer]
        )
      )}`,
      ix,
      -1,
      0
    );
  }
  for (let ix = -1; ix < 0; ix++) {
    bot.bcore(
      `tellraw @a[tag=fbc] ${JSON.stringify(
        [].concat(
          ["\n".repeat(20)],
          typeof bot.framebufferchat == "array"
            ? bot.framebufferchat.slice(-50, 0)
            : [bot.framebufferchat]
        )
      )}`,
      ix,
      -2,
      0
    );
  }
}, 50);
  