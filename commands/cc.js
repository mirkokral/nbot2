bot.bcore(tellraw('@a', '\n'.repeat(10000)),0,2,0)
bot.bcore(say({text: args[0] == "--quiet" ? "The chat has been cleared!" : "The chat has been cleared by %!".replace('%',username), color:'green'}),0,3,0)