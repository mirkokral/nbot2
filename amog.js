const mc = require('minecraft-protocol')
const pc = require('prismarine-chat')('1.18.2')
const client = mc.createClient({
    host: 'sus.shhnowisnottheti.me',
    username: 'cha510x'
})
client.on('chat', (packet) => {
    try{
        let message = new pc(JSON.parse(packet.message))
        if(message.toString().startsWith('@ whispers to you: ')){
            console.log('Got possible hash: ' + message.toString().substring('@ whispers to you: '.length, message.toString().length))
        }
    } catch(e) {console.log(e)}
})