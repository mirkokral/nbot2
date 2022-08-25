const cprocess = require('child_process')
let servCProcesses = {}
servCProcesses['ayunboom'] = cprocess.fork('./index.js', {
    env: {
        host: 'sus.shhnowisnottheti.me',
        port: '25565',
        name: 'ayunboom'
    }
})
servCProcesses['ayunboom'].on('exit', (code) => {
    console.log(code)
})