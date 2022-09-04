switch(args.shift()){
    case "play":
        bot.musicplayer.play(args.join(' '))
        break;
    case "stop":
        bot.musicplayer.stop();
        break;
    case "list":
    case "songs":
        bot.musicplayer.songlist();
        break;
    case "loop":
        switch(args[0]){
            case "queue":
                bot.musicplayer.loop(2)
                bot.say('&aLooping queue!')
                break;
            case "current":
                bot.musicplayer.loop(1)
                bot.say('&aLooping current!')
                break;
            case "off":
                bot.musicplayer.loop(0)
                bot.say('&cLooping off')
                break;
            default:
                bot.say('&cInvalid looping mode, looping modes: queue, current, off')
        }
    case "queue":
        bot.musicplayer.queueList();
        break;
    case "skip":
        bot.musicplayer.skip();
        break;
    default:
        bot.say('&cInvalid usage, commands: play, stop, list, loop, queue, skip')
}