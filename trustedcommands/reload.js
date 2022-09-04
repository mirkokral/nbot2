let timeOfReloadStart = Date.now()
config = require('yaml').parse(require('fs').readFileSync('./config.yml','utf-8'))
Translater.FetchAllTranslations()
bot.core(
    say(
        {
            text: Translate('reload.success',''),
            color: 'green'
        }
    )
)
bot.core(
    say(
        {
            text: Translate('reload.took', (Date.now() - timeOfReloadStart).toString()),
            color: 'blue'
        }
    )
)
delete timeOfReloadStart