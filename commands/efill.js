if(isNaN(parseInt(args[1])) || isNaN(parseInt(args[2])) || isNaN(parseInt(args[3])) || isNaN(parseInt(args[4])) || isNaN(parseInt(args[5])) || isNaN(parseInt(args[6])))
    bot.core(
        say(
            {
                text: 'Invalid args'
            }
        )
    )
else {
    var pos1 = [parseInt(args[1]), parseInt(args[2]), parseInt(args[3])]
    var pos2 = [parseInt(args[4]), parseInt(args[5]), parseInt(args[6])]
    var vsize = [...pos2].map((e, i) => {return e-pos1[i]})
    var size = 0
    vsize.forEach(e => size +=e)
    if(size > 2000){
        bot.core(
            say(
                {
                    text: "Max size is 2000, got " + size,
                    color: 'red'
                }
            )
        )
    } else {
        for(let ix = pos1[0]; ix < pos2[0]+1; ix++){
            for(let iy = pos1[1]; iy < pos2[1]+1; iy++){
                for(let iz = pos1[2]; iz < pos2[2]+1; iz++){
                    setTimeout(() => {
                        bot.core(`summon ${args[0]} ${ix} ${iy} ${iz} ${args.slice(7).join(' ')}`)
                    }, 200 * (ix - pos1[0] * iy - pos1[1] * iz - pos1[2]));
                }
            }
        }
    }
}