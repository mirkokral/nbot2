const {VM} = require('vm2')
bot.evalVM = new VM(
	{
		timeout: 2000,
		allowAsync: false,
		sandbox: {core: (b) => {bot.bcore(b.substring(0,30000),-2,-5,-3)}}
	}
)
