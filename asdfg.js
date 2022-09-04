const mc = require('minecraft-protocol')
const bot = mc.createClient({
    host: 'sus.shhnowisnottheti.me',
    username: 'test'
})
let amogus = Date.now()
bot.on('ping', (data) => {
    console.log(Date.now() - amogus);
    amogus = Date.now()
})