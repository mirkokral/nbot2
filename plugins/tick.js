const moment = require('moment')
setInterval(() => {
    try{
        bot.core(`/execute as @a at @s run playsound minecraft:block.stone_button.click_on master @a[tag=!notick] ~ ~ ~ 0.3 2`)
        if(bot.bruhifyText != '') return
        var cmoment = moment()
        var hour = cmoment.hour().toString()
        var minute = (cmoment.minute() < 10 ? '0':'') + cmoment.minute().toString()
        bot.core(`title @a[tag=!notick] actionbar ${
            JSON.stringify(
                [].concat([
                    {
                        text: moment().hour().toString(),
                        color: 'red'
                    },
                    {
                        text: ':' + minute,
                        color: 'white'
                    }
                ])
            )
        }`)
        bot.core(`title @a[tag=!notick] actionbar ${
            JSON.stringify(
                [].concat([
                    {
                        text: moment().hour().toString(),
                        color: 'red'
                    },
                    {
                        text: ':' + minute,
                        color: 'white'
                    }
                ])
            )
        }`)
        bot.core(`title @a[tag=!notick] actionbar ${
            JSON.stringify(
                [].concat([
                    {
                        text: moment().hour().toString(),
                        color: 'red'
                    },
                    {
                        text: ':' + minute,
                        color: 'white'
                    }
                ])
            )
        }`)
    } catch (e) {}
}, 1000);