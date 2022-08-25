const fs = require('fs')
if(fs.existsSync('./changelogs/' + (args[0] ? args[0] : '').replaceAll('..', '') + '.yml')){
    var clog = require('yaml').parse(fs.readFileSync('./changelogs/' + args[0].replaceAll('..', '') + '.yml', 'utf-8'))
    var data = [
        {
            text: args[0].replaceAll('..', '') + ' - ' + clog.title,
            color: 'white',
            bold: true
        },
        {
            text: '\n',
            color: 'white'
        }
    ]
    if(clog.added){
        clog.added.forEach(e => {
            data.push({text: '+ ' + e + '\n', color: 'green', bold: false})
        })
    }
    if(clog.removed){
        clog.removed.forEach(e => {
            data.push({text: '- ' + e + '\n', color: 'red', bold: false})
        })
    }
    bot.core(say(data))
} else if(!args[0]) {
    var clog = require('yaml').parse(fs.readFileSync('./changelogs/' + config.botMetadata.version + '.yml', 'utf-8'))
    var data = [
        {
            text: config.botMetadata.version + ' - ' + clog.title,
            color: 'white',
            bold: true
        },
        {
            text: '\n',
            color: 'white'
        }
    ]
    if(clog.added){
        clog.added.forEach(e => {
            data.push({text: '+ ' + e + '\n', color: 'green', bold: false})
        })
    }
    if(clog.removed){
        clog.removed.forEach(e => {
            data.push({text: '- ' + e + '\n', color: 'red', bold: false})
        })
    }
    bot.core(say(data))
} else if (args[0] == "list") {
    var data = []
    var e = fs.readdirSync('./changelogs').sort()
    for (let index = 0; index < e.length; index++) {
        const element = e[index];
        data.push({text: element.substring(0,element.length-4) + ', ', color: index % 2 == 1 ? 'blue' : 'aqua'})
    }
    bot.core(tellraw('@a', data))
} else {
    bot.core(say('&cThat changelog doesn\'t exist, do "%version" to show the latest version or "%changelog list" to list changelogs'.replaceAll('%', config.prefix)))
}