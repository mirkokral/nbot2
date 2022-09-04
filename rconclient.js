function main(){

const { io } = require('socket.io-client')
const chalk = require('chalk')
const readline = require('readline'),
      rl = readline.createInterface(
        {
            input: process.stdin,
            output: process.stdout,
            terminal: true,
            prompt: ''
        }
      )
let cio;
rl.question(`${chalk.blueBright('?')} ${chalk.greenBright('Server to connect?')} `, (a) => {
    const askeddate = Date.now()
    cio = io('ws://' + a + ':7000')
    cio.once('banned', () => {
        console.log(chalk.redBright('You were banned from this NCon server, you will be unbanned after an configurable peorid after the ban, usually 60 secs'));
        process.exit(5)
    })
    cio.on('disconnect', (e) => {
        console.log(chalk.redBright('Disconnected: ' + e + '. Press ctrl+c to quit application or wait 4 seconds.'))
        setTimeout(
            () => process.exit(1),
            4000
        )
    })
    cio.once('askpass', () => {
        rl.question(`${chalk.redBright('•')} ${chalk.greenBright('Password?')} `, (password) => {
            cio.emit('password', password)
            cio.once('badpass', () => {console.log(chalk.redBright('Bad password!')); process.exit(2)})
        })
    })
    cio.on('login', () => {
        cio.emit('acknowledge_login')
        console.log(chalk.greenBright('Got login packet! Took ' + (Date.now() - askeddate) + 'ms.'))
        rl.setPrompt(chalk.greenBright('RCON: ' + a + '> '))
        rl.prompt()
        rl.on('line', (line) => {
            process.stdout.write(`\x1b[1A\x1b[2K${chalk.greenBright('»')} ${line}\x1b[1B`)
            cio.emit('line', line)
            rl.prompt()
        })
        cio.on('message', (msg) => {
            console.log('\x1b[2K\x1b[0G' + msg)
            const oldCursor = rl.cursor
            rl.prompt(true)
            // process.stdout.write('\x1b[' + rl.line.length + 'C')
        })
    })
})
} 
main()