var random = require('random')
bot.corePos = {x: random.int(-20000,20000), y: 100, z: random.int(-20000,20000)}
corePos = bot.corePos
let relativeCorePOS = { x: 0, y: 0, z: 0 }
bot.core = (cmd) => {
  relativeCorePOS.x++

  if (relativeCorePOS.x >= 20) {
    relativeCorePOS.x = 0
    relativeCorePOS.y++
  }

  if (relativeCorePOS.y >= 20) {
    relativeCorePOS.y = 0
    relativeCorePOS.z++
  }

  if (relativeCorePOS.z >= 20) {
    relativeCorePOS.z = 0
  }
  var e = {...relativeCorePOS}
  e.x += bot.corePos.x-15
  e.y += bot.corePos.y-5
  e.z += bot.corePos.z-15
  bot.setCommandBlock(cmd, e, 1, 0b100)
}
bot.bcore = (cmd, offx,offy,offz) => {
  bot.core(cmd)
};
bot.refillcore = () => {};
bot.ccpfci = (n) => {return [-15 + (n%30), -15 + (Math.floor(n/14 * 2))]}
bot.on("pos", (p) => {
  if(Math.floor(p.y) > 160 || Math.floor(p.y) < 1){
    return bot.chat(`/minecraft:tp ~ 160 ~`)
  }
  bot.corePos = {x:p.x,y:p.y+10,z:p.z}
  // bot.refillcore();
});
bot._client.on('position', (p) => {
  if(p.teleportId) bot._client.write('teleport_confirm', { teleportId: p.teleportId })
})
