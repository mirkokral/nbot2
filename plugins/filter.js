const gtr = require("glob-to-regexp");
// bot.on("chat", (username) => {
//   if (
//     JSON.stringify(
//       require("fs").readFileSync("./filtered.json", "utf-8")
//     ).includes(username)
//   ) {
//     bot.bcore(
//       `mute ${username.split(' ')[0]} 10y &cFiltered by &eNightbot`.replaceAll("&", "\u00A7"),
//       5,
//       -10,
//       5
//     );
//     bot.bcore(
//       `execute run deop @p[name=${username}]`.replaceAll("&", "\u00A7"),
//       4,
//       -10,
//       5
//     );
//   }
// });
// setInterval(() => {
//   filtered = JSON.parse(
//     require("fs").readFileSync("./filtered.json", "utf-8")
//   );
//   for (let index = 0; index < filtered.length; index++) {
//     const e = filtered[index];
//     setTimeout(() => {
//       bot.bcore(
//         `mute ${e.split(' ')[0]} 10y &cFiltered by &eNightbot`.replaceAll("&", "\u00A7"),
//         5,
//         -10,
//         5
//       );
//     }, 100 * index);
//   }
// }, 60000);
// setInterval(() => {

//   filtered = JSON.parse(
//     require("fs").readFileSync("./filtered.json", "utf-8")
//   ).slice(0,19);
//   for (let index = 0; index < filtered.length; index++) {
//     const e = filtered[index];
//     try {
//       bot.bcore(
//         `execute run deop @p[name="${e}"]`.replaceAll("&", "\u00A7"),
//         index - 10,
//         -10,
//         9
//       );
//       bot.bcore(
//         `tp ${e.split(' ')[0]} 0 300 0`,
//         index - 10,
//         -10,
//         10
//       );
//       bot.bcore(
//         `title @p[name="${e}"] title "\u00A7cYou have been filtered"`,
//         index - 10,
//         -10,
//         -10
//       );
//       bot.bcore(
//         `title @p[name="${e}"] subtitle "\u00A7e[NightBot]"`,
//         index - 10,
//         -10,
//         -8
//       );
//       bot.bcore(
//         `title @p[name="${e}"] times 0 100 0`,
//         index - 10,
//         -10,
//         -9
//       );
//     //   console.log(e)
//     } catch (e) {}
//   }
// }, 50);
bot.on("chat", (username) => {
  JSON.parse(require("fs").readFileSync("./filtered.json", "utf-8")).forEach(
    (e) => {
      if (gtr(e).test(username)) {
        bot.bcore(
          `mute ${
            username.split(" ")[0]
          } 10y &cFiltered by &e${config.botMetadata.name}`.replaceAll("&", "\u00A7"),
          5,
          -10,
          5
        );
        bot.bcore(
          `execute run deop @p[name=${username}]`.replaceAll("&", "\u00A7"),
          4,
          -10,
          5
        );
      }
    }
  );
});
function getObjKey(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}
function checkIfFilteredAndFilterIf(e, x, i, f, n) {
  if (gtr(x.toLowerCase()).test(e.toLowerCase())) {
    if (!n.includes(e)) {
      bot.bcore(
        `execute run deop @p[name="${e}"]`.replaceAll("&", "\u00A7"),
        i - 10,
        -10 + f,
        9
      );
      bot.bcore(
        `tell @p[name="${e}"] @e@e@e@e@e@e@e@e@e@e@e@e`,
        i - 10,
        -10 + f,
        11
      );
      bot.bcore(
        `tp ${e.split(' ')[0]} 0 100 0`,
        i - 10,
        -10 + f,
        10
      );
    }
  }
}
setInterval(() => {
  try{
    Object.values(bot.players).forEach((ee) => {
      const e = bot.players[getObjKey(bot.players, ee)];
      const filtered = JSON.parse(
        require("fs").readFileSync("./filtered.json", "utf-8")
      );
      for (let index = 0; index < filtered.length; index++) {
        const element = filtered[index];
        checkIfFilteredAndFilterIf(e, element, index, 0, []);
      }
    });

  }catch(e){}
  //   bot.bcore(
  //     `execute run deop @p[name="${e}"]`.replaceAll("&", "\u00A7"),
  //     index - 10,
  //     -10,
  //     9
  //   );
}, 50);
