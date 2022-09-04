(() => {
  if (!args[0]) return bot.say('&cInvalid player');
  bot.core(
    tellraw('@a', {
      translate: 'multiplayer.player.joined',
      with: [{ text: args.join(' '), color: 'yellow' }],
      color: 'yellow',
    })
  );
  bot.core(`v ${args[0]} disable`);
})();
