try {
	var out = bot.evalVM.run(args.join(' '))
	bot.core(say({text: require('util').inspect(out).substring(0,30000), color: typeof(out) == 'string' ? 'gold' : 'green'}))
} catch (e) {
	bot.core(say({text: e.name + ': ' + e.message.substring(0,30000), color: 'red'}))
}
