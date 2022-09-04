const fs = require("fs");
//const {convertMIDI} = require("./converter.js");
const { Midi } = require("@tonejs/midi");
const { download } = require("./songdownloader.js");
const { Worker, isMainThread } = require("worker_threads");
//TODO: queue and loop support 
const config = require('yaml').parse(fs.readFileSync('./config.yml', 'utf-8'))
class MusicPlayer {
  queue = [];
  playing = false;
  playtime = {current: 0, total: 0, start: 0};
  interval = null;
  cancelPlay = false;
  skipping = false;
  looping = 0; //0 off, 1 current, 2 queue
  
  constructor(client, songdir = __dirname+"/songs", enablePlayUrl = true) {
    if(!fs.existsSync(songdir)) fs.mkdir(songdir, { recursive: true });
    this.client = client;
    this.enablePlayUrl = enablePlayUrl;
    this.save_downloaded_songs = false;
    this.songdir = songdir;
  }

  songlist() {
    let songs = fs.readdirSync(this.songdir);
    songs.filter((file) => file.endsWith(".mid") || file.endsWith(".midi")).sort();
    
    songs = songs.map((a, i) => (i%2 == 1 ? "§5" : "§d")+a);
    this.client.say(`§7Songs §8(§9${songs.length-1}§8) ${songs.join(" ")}`);
  }

  skip() {
    if(this.playing) {
      this.skipping = true;
      this.cancelPlay = true;
    } else this.client.say(`Not playing anything right now...`);
  }

  getLoop() {
    return this.looping;
  }

  loop(type = 1) {
    this.looping = type;
  }

  playurl(url) {
    if(!false) return this.client.say("Playurl not enabled");
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch(e) {
      this.client.say(e.message);
    }
    if (urlObj != undefined && (urlObj.protocol === "https:" || urlObj.protocol === "http:")) {
        this.client.say("Starting download...");
        let start = Date.now();
        download(urlObj.toString(), undefined, (err, file) => {
        if (err) {
            console.log(`failed download in ${Date.now() - start}ms! ${err}`);
            this.client.say(`Failed to download file: ${err}`);
        } else {
            this.client.say(`Finished download took ${Date.now() - start}ms`);
            console.log(`finished download in ${Date.now() - start}ms! ${file}`);
            this.play(file);
            setTimeout(() => {
              if(!this.save_downloaded_songs) fs.unlink(file, () => {});
            }, 5000);
        }
    });
    } else {
        this.client.say(`Illegal url: ${url}`);
    }
  }

  play(file) {
    if(file == undefined && this.queue.length >= 1 && !this.playing) {
      if(this.queue[0].notes.length >= 1) {
        this.playParsed(this.queue[0]);
      } else if(this.queue[0].file != undefined) {
        file = this.queue[0].file;
      }
    } else {
    
    if(this.playing === true) {
      this.parse(file).then(parsed => {
      if(parsed != undefined) {
        parsed.file = file;
        this.queue.push(parsed);
        this.client.say("&aAdded song to queue");
      }
        return;
      });
    } else {
    //console.log(file);
    //{ name: midi.header.name, notes: noteList, loop: false, loopPosition: 0, length: songLength }

    this.parse(file).then(parsed => {
      if(parsed == undefined) return;
      parsed.file = file;
      this.queue[0] = parsed;
      this.playParsed(parsed);
    });
    }
    }
  }

  playParsed(parsed) {
    this.client.say(`&aNow playing &b${parsed.name}`);
    this.cancelPlay = false;
    this.skipping = false;
    this.playing = true;
    this.playtime = {current: 0, total: parsed.length, start: Date.now()};
    //const firstNoteTime = parsed.notes[0].time;
    this.interval = setInterval(() => { 
        this.playtime.current = (Date.now() - this.playtime.start)// + firstNoteTime;
        if(this.cancelPlay) {
          clearInterval(this.interval);
          this.cancelPlay = false;
          this.playing = false;
          this.interval = null;
          if(this.skipping) {
            this.skipping = false;
            this.client.say("&aSkipping: "+parsed.name);
            parsed.notes = [];
            this.playBasedOnLoop();
          } else this.client.say("&cStopped playing "+parsed.name);
          return;
        }
        
        if (this.playtime.current >= parsed.notes[0].time) {
          let note = parsed.notes.shift();//TODO: maybe dont shift messages in the long run as it will take time to load files and i dont think i save so much memory by shifting...
          const floatingPitch = 2 ** ((note.pitch - 12) / 12.0);
          this.playNote(note, floatingPitch);
          this.actionBar();//TODO: maybe put this on its own setInterval?
        }
        if(this.playtime.current >= this.playtime.total) {
          clearInterval(this.interval);
          this.cancelPlay = false;
          this.playing = false;
          this.interval = null;
          if(parsed.notes.length === 1) parsed.notes.shift();//bad fix
          this.client.say("&7Finished playing "+parsed.name);
          this.playBasedOnLoop();
          return;
        }
    }, 1);
  }

  playBasedOnLoop() {
    if(this.looping === 1) {
          //console.log("looping curr")
            this.play(this.queue.shift().file);
          } else if(this.looping === 2) {
          //console.log("looping all")
            this.queue.push(this.queue.shift());
            if(this.queue[0].notes.length > 0) 
              this.playParsed(this.queue[0]);
             else this.play(this.queue[0].file);
          } else if(this.looping === 0) {
          //console.log("no loop")
            this.queue.shift();
            if(!this.queue[0]) return;
            console.log(this.queue[0])
            if(this.queue[0].notes.length > 0) 
              this.playParsed(this.queue[0]);
             else this.play(this.queue[0].file);
          }
  }

  actionBar() {
    let message = `§e${config.botMetadata.name} §8| §a${this.queue[0].name} §8| §a${this.timeFormat(Math.floor(this.playtime.current/*/1000*/))}§8/§a${this.timeFormat(this.playtime.total/*/1000*/)}`;
    if(this.looping != 0) {
      let lop;
      if(this.looping === 1) lop = "Current";
      else lop = "Queue";
      message += ` §8| §aLooping: ${lop}`;
    }
    this.client.core(`/minecraft:title @a[tag=!nomusic] actionbar "${message}"`)
  }
  
  // TODO: [###......]
  progressActionBar(percentage, type = "Reading file", bar = true) { // ah boolean
    let message = `§e${config.botMetadata.name} §8|`;
    if(Array.isArray(percentage) && Array.isArray(type)) {
      percentage.forEach((p,i) => {
        message += ` §7${type[i]} §a${p}%§7/§a100% §8|`;
      });
      message.slice(0, message.length-3);
    } else {
      message += ` §7${type} §8|`;
      if(bar) {//
        message += ` §8[`;
        let base = new Array(50).fill("§a|");
        
        let percent = percentage / 100;
        let index = Math.ceil(percent * base.length);
        for (let i = 0; i < index; i++) { 
          base[i] = "§2|";
        }
        
        message += base.join(""); 
        message += `§8] `;
      }
      message += `${bar ? "§8|" : ""} §a${percentage}%§7/§a100%`;
    }
    this.client.core(`/minecraft:title @a[tag=!nomusic] actionbar "${message}"`);   
  }

  queueList() {
    if(this.queue.length === 0) {
      this.client.say("&cNothing in queue!");
    } else {
      let q = this.queue
        .filter((x, i) => i != 0)
        .map((a)=>(a.notes.length >= 1 ? "§b" : "§3")+a.name);//§b loaded §3 not loaded
      if(q.length === 0) q = ["Empty"];
      let lop = "Off"
      if(this.looping === 1) lop = "Current";
      if(this.looping === 2) lop = "Queue";
      this.client.say(`&aNow playing: §b${this.queue[0].name}§r, &aLoop: ${lop}\nQueue: ${q.join(", ")}`);
    }
  }

  timeFormat (time) {
    const seconds = Math.floor(time / 1000)

    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }
  /*//has glitch in the second calculation 02:64 should be illegal...
  timeFormat(t) {
    var d = Math.floor(t/86400),
        h = ('0'+Math.floor(t/3600) % 24).slice(-2),
        m = ('0'+Math.floor(t/60)%60).slice(-2),
        s = ('0' + t % 60).slice(-2);
    return (d>0?d+'d ':'')+(h>0?h+':':'')+(m>0?m+':':'')+(t>=60?s:s+'s');
}*/

  playNote(note, floatingPitch) {
    this.client.core(`execute as @a[tag=!nomusic] at @s run playsound ${soundNames[note.instrument]} record @s ~ ~ ~ ${note.volume} ${floatingPitch}`);
  }

  stop() {
    if(this.playing) {
      this.cancelPlay = true;
      this.playing = false;
    }
  }

  parse(song) {
    if(song == undefined) return;

    if(song.startsWith("/home/pi/nbot/music/songs/")) 
      song = song.split("/home/pi/nbot/music/songs/")[1];
    var test = song.match(/\\|\//g) || 0; 
	  if(test.length > 0) {// so people dont try to go outside of the ./songs/ directory
		  this.client.say("§cIllegal amount if /'es");
		  return;
	  }
    
    let filename = `${this.songdir}/${song}`;
	  if(!song.endsWith(".mid")) filename += ".mid";
    
    if(!fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
      this.client.say("§cFile doesnt exist!");
      return;
    } 
    
    let song_converter = new Worker(__dirname + "/converter.js");
    let start = Date.now();
    console.log("player.js, ismainthread: "+isMainThread) 
    return new Promise((resolve) => {
      song_converter.postMessage(filename);
      let intv;
      song_converter.on("message", (data) => { // hm yup you can try if you want
        if(data.type === "progress_readfile") {
          this.progressActionBar(data.percentageDone.toFixed(2), "Read file");
          if(data.percentageDone >= 100 && !(typeof(intv) === "number")) {
            intv = setInterval(() => {
              this.client.core(`/minecraft:title @a[tag=!nomusic] actionbar "§e${config.botMetadata.name} §8| §aParsing to tonejs/midi format..."`); 
            }, 1000)
          }
        } else if (data.type == "progress_convert") {
          clearInterval(intv);
          this.progressActionBar(data.percentage.toFixed(2), "Converting"); //ok sure
        } else if(data.type === "error") {
          clearInterval(intv);
          this.client.say("Error: "+data.error);
        }
        else {
          console.log("Thread converter.js responded and took", Date.now() - start, "ms");
          resolve(data.file);//yea let me just do this last thing yes!!
        }
      }); //yup we should test it to see if it even works sofar lol yup
    });
  }
}

const soundNames = {
  harp: "minecraft:block.note_block.harp",
  basedrum: "minecraft:block.note_block.basedrum",
  snare: "minecraft:block.note_block.snare",
  hat: "minecraft:block.note_block.hat",
  bass: "minecraft:block.note_block.bass",
  flute: "minecraft:block.note_block.flute",
  bell: "minecraft:block.note_block.bell",
  guitar: "minecraft:block.note_block.guitar",
  chime: "minecraft:block.note_block.chime",
  xylophone: "minecraft:block.note_block.xylophone",
  iron_xylophone: "minecraft:block.note_block.iron_xylophone",
  cow_bell: "minecraft:block.note_block.cow_bell",
  didgeridoo: "minecraft:block.note_block.didgeridoo",
  bit: "minecraft:block.note_block.bit",
  banjo: "minecraft:block.note_block.banjo",
  pling: "minecraft:block.note_block.pling"
}

module.exports = MusicPlayer;