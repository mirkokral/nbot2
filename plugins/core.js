bot.corePos = config.corePos
corePos = bot.corePos
let relativeCorePOS = { x: 0, y: 0, z: 0 }
bot.core = (cmd) => {
  relativeCorePOS.x++

  if (relativeCorePOS.x >= 30) {
    relativeCorePOS.x = 0
    relativeCorePOS.y++
  }

  if (relativeCorePOS.y >= 30) {
    relativeCorePOS.y = 0
    relativeCorePOS.z++
  }

  if (relativeCorePOS.z >= 30) {
    relativeCorePOS.z = 0
  }
  var e = {...relativeCorePOS}
  e.x += bot.pos.x-15
  e.y += bot.pos.y-15
  e.z += bot.pos.z-15
  bot.setCommandBlock(cmd, e, 1, 0b100)
}
bot.bcore = (cmd, offx,offy,offz) => {
  bot.core(cmd)
};
bot.refillcore = () => bot.chat(`/fill ~15 ~18 ~15 ~-15 ~-15 ~-15 command_block{\"CustomName\":'{"text":""}'} replace`);
bot.ccpfci = (n) => {return [-15 + (n%30), -15 + (Math.floor(n/14 * 2))]}
bot.on("pos", (p) => {
  // if(Math.floor(p.x) != Math.floor(corePos.x) || Math.floor(p.y) != Math.floor(corePos.y) || Math.floor(p.z) != Math.floor(corePos.z)){
  //   return bot.chat(`/minecraft:tp ${corePos.x} ${corePos.y} ${corePos.z}`)
  // }
  bot.corePos = {x:p.x,y:p.y,z:p.z}
  bot.refillcore();
});
