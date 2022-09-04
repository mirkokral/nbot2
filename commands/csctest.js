let canCheckraw = require('fs').readdirSync('./commands/').concat(require('fs').readdirSync('./trustedcommands/'))
let canCheck = canCheckraw.map(e => {return e.substring(0, e.length-3)})
let word = args.join(' ')
let scores = []
const indexesOf = (arr, item) => 
  arr.reduce(
    (acc, v, i) => (v === item && acc.push(i), acc),
  []);
for(let i = 0; i < canCheck.length; i++){
    let wordlen = word.length
    for(let char = 0; char < wordlen; char++){
        if(!scores[i]) scores[i] = 0
        scores[i] += (canCheck[i].includes(word[char]) ? 1 : 0)
    }
    scores[i] = scores[i] / canCheck[i].length
}
let eng = []
indexesOf(scores,Math.max(...scores)).forEach(e => {
    eng.push(canCheck[e])
})
bot.say(`&aDid you mean: ${eng.join(', ')}`)