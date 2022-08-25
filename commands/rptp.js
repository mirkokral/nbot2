var rptpPlayer;
var genrtptpl = () => {
    rptpPlayer = Object.values(bot.players)[Math.floor(Math.random() * Object.values(bot.players).length)]
    if(rptpPlayer == username) genrtptpl()
}
genrtptpl()
bot.core(
    say(
        `&aTeleporting &b${username}&a to &b${rptpPlayer}`
    )
)
bot.core(`execute unless entity @s[name= run ] run tp ${username} ${rptpPlayer}`)