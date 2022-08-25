bot.isVisible = !bot.isVisible
bot.core(
    say(
        {
            text: Translate('bot.visible.' + bot.isVisible, ''),
            color: bot.isVisible ? 'green' : 'red'
        }
    )
)
bot.core(
    `essentials:vanish ${bot._client.username} ${bot.isVisible ? 'off' : 'on'}`
)