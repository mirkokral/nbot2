for (let index = 0; index < 10; index++) {
    bot.bcore(`execute unless entity @s[name= run ] run execute as @e at @s run playsound minecraft:entity.ender_dragon.death master @a ~ ~1 ~ 9999999999999999999999999 1`,5,index,5)
}