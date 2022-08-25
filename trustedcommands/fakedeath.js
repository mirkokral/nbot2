(() => {
  death = args.shift();
  deaths = {
    nuclear: {
      translate: 'death.attack.explosion.player',
      with: [
        { text: args[0] },
        [
          { text: 'a nuclear bomb at ', color: 'red' },
          { text: `${Math.floor(Math.random() * 40000)-20000} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 40000) - 20000}`, obfuscated: true, color: 'red' },
        ],
      ],
    },
    infarkt: [{ text: args[0] }, { text: ' got an infarkt' }],
    ungod: [
        {
            text: args[0]
        },
        {
            text: ' was not approved by '
        },
        {
            text: 'God',
            color: 'yellow',
            bold: true
        }
    ]
  };
  if (!death in deaths) return;
  bot.core(tellraw('@a', deaths[death]));
  bot.core(`clear ${args[0]}`);
  bot.core(
    `execute unless entity @s[name= run ] run tp ${args[0]} 115.0 71.0 -2.0`
  );
})();
