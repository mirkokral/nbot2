for (let ix = 0; ix < 4; ix++) {
    for (let iy = 0; iy < 4; iy++) {
        bot.core(
          `execute unless entity @s[name= run ] run execute as @a at @s run summon ${args.join(' ')} ^${ix-2} ^ ^${iy-2}`
        );
      }
}
