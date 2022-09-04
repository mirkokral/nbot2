const Jimp = require('jimp')
var image = []
var imageTextdata = []
if(!/[A-Z][a-z][0-9][\.]/gi.test(args.join(' ')) && args.join(' ').includes('..')){
    bot.core(say('&cCmo\'n, you wont dox me that ez'))
} else if (!require('fs').existsSync('./images/' + args.join(' '))){
// } else if (false){
    bot.core(say('&cImage not found, images: &a' + require('fs').readdirSync('./images').join(', ')))
}else{
    if(!bot.isDrawDisabled){
        bot.isDrawDisabled = true
        Jimp.read('./images/' + args.join(' '), (err, lenna) => {
            if (err) bot.say('&cAn error happend.');
            img = lenna.resize(30*8,30).opaque()
            for(let iy = 0; iy < 30; iy++){
                image[iy] = []
                imageTextdata[iy] = []
                for(let ix = 0; ix < 30*8; ix++){
                    curgie = img.getPixelColor(ix,iy).toString(16)
                    curgie = '0'.repeat(6 - (curgie.length - 2)) + curgie
                    image[iy].push("#" + curgie.substring(0,6))
                    imageTextdata[iy].push({text: '⎮', color: image[iy][ix]})
                }
            }
            iili = 0
            imageTextdata.forEach(element => {
                setTimeout(() => {
                    bot.core(tellraw('@a', element))
                }, 50 * iili);
                iili++
            });
            setTimeout(() => {
                bot.isDrawDisabled = false
            }, (imageTextdata.length * 50) + 2000);
          });
    }

}
