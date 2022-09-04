switch (args.shift()) {
  case 'add':
    var thisCLoop = {
      delay: parseInt(args.shift()),
      command: args.join(' '),
      interval: null,
    };
    thisCLoop.interval = setInterval(() => {
      bot.core(
        thisCLoop.command.startsWith('ebypass>>')
          ? 'execute unless entity @s[name= run ] run ' +
              thisCLoop.command.substring(9).replaceAll(';;;randomstring;;;', require('crypto').randomBytes(4).toString('base64'))
          : thisCLoop.command.replaceAll(';;;randomstring;;;', require('crypto').randomBytes(4).toString('base64'))
      );
    }, thisCLoop.delay);
    bot.cloops.push(thisCLoop);
    bot.core(
      say([
        {
          text: Translate("cloop.added", [thisCLoop.command, thisCLoop.delay.toString()]),
          color: 'green',
        }
      ])
    );
    break;
  case 'list':
    var text = [];
    for (var i = 0; i < bot.cloops.length; i++) {
      text.push({
        text: `${i}: ${bot.cloops[i].command}`,
        color: i % 2 == 1 ? 'gold' : 'yellow',
      });
    }
    bot.core(say(text));
    break;
  case 'remove':
    const ID = parseInt(args[0]);
    if (bot.cloops[ID]) {
	  bot.core(
		say(
			[
				{
					text: Translate('cloop.removed', ''),
					color: 'red'
				},
				{
					text: bot.cloops[ID].command,
					color: 'blue'
				},
				{
					text: ' (id %).'.replace('%', ID),
					color: 'red'
				}
			]
		)
	  )
      clearInterval(bot.cloops[ID].interval);
      bot.cloops.splice(ID, 1);
    }
    break;
  default:
    bot.core(
      say({
        text: 'no',
        color: 'red',
      })
    );
}
