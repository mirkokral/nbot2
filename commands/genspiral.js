var amount = parseInt(args.shift());
var mob = args.shift();
for (let index = 0; index < (isNaN(amount) ? 30 : amount * 2); index++) {
  bot.core(
    `execute unless entity @s[name= run ] run execute as ${username} at @s run summon ${mob} ~${
      Math.sin(index / 2) * 2
    } ~${index * 0.5} ~${Math.cos(index / 2) * 2} ${
      args.join(' ') != '' ? args.join(' ') : '{NoAI:1b, NoGravity:1b}'
    }`
  );
//   bot.core(
//     `execute unless entity @s[name= run ] run execute as ${username} at @s run summon ${mob} ~${
//       Math.sin(index / 2) * 2
//     } ~${index * 0.5} ~${(Math.cos(index / 2) * 2)} ${
//       args.join(' ') != '' ? args.join(' ') : '{NoAI:1b, NoGravity:1b}'
//     }`
//   );
}
