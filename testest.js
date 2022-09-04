(async ()=>{
    const readline = require('readline');
    var ansi = require('ansi')
      , cursor = ansi(process.stdout)
    let list = []
    let currentText = ""
    readline.emitKeypressEvents(process.stdin);
    // const write = process.stdin.write
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.on('keypress', (data,key) => {
        if(key.name == 'c' && key.ctrl) {
            return process.exit(0)
        }
        if(key.name == "return"){
            list.push(currentText)
            currentText = ''
        }
        if(key.name.length == 1){
            currentText += key.sequence
            process.stdin.write(key.sequence)
        }
    })

})()