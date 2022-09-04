(() => {
  if (!args[0]) return bot.say('&cInvalid player');
  bot.core(
    tellraw('@a', {
      translate: 'multiplayer.player.left',
      with: [{ text: args.join(' '), color: 'red' }],
      color: 'yellow',
    })
  );
  bot.core(`v ${args[0]} enable`);
})();
