const Instruments = require('./lib/Instruments')
const nbsjs = require('nbs.js')
const song = nbsjs.loadSong('./music/MUSUC.nbs')
let layers = []
Object.values(song.layers).forEach(e => {
    console.log(e.notes)
})
console.log()