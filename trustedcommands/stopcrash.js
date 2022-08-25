bot.core(tellraw('@a', [].concat(prefixText, [{text: 'Stopping all crashing sessions', color: 'green'}])))
clearInterval(currentCrash)
