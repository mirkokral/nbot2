bot.core(
    say(
        `&cSpamming &ateam add&c 4000 times...`
    )
)
for (let index = 0; index < 4000; index++) {
    bot.core(`team add ${require('crypto').randomBytes(6).toString('hex')}`)
}