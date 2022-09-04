const { Midi } = require("@tonejs/midi");
const instrumentMap = require("./instrument_map.js");
const percussionMap = require("./percussion_map.js");

const { workerData, parentPort, isMainThread } = require("worker_threads");
const fs = require("fs");

let maxVolume = 0.001;

parentPort.once("message", (filename) => {
  //console.log("coverter.js, ismainthread: "+isMainThread);
    const fsStat = fs.statSync(filename);
    const FILE_SIZE = fsStat.size;
  
    let buffer = Buffer.alloc(0);
    let currOffset = 0;
    let readStream = fs.createReadStream(filename, {highWaterMark: 1024});
  
    readStream.on("data", data => {
      buffer = Buffer.concat([buffer, data]); // TODO: can be optimized in the future
      currOffset += data.length;
      let percentageDone = (currOffset / FILE_SIZE) * 100;
      parentPort.postMessage({type: "progress_readfile", percentageDone});
    });

    readStream.on("end", () => {
      let midi;
      try {
      midi = new Midi(buffer);
      } catch(e) {
        console.log(e);
        parentPort.postMessage({type: "error", error: e});
      }

      if(midi == undefined) return;
    
    if (filename.includes("/")) {
       var len = filename.split("/").length;
       filename = filename.split("/")[len - 1];
    }
  
    midi.header.name = filename;
  
    parentPort.postMessage({type: "file", file: convertMIDI(midi)});
    });
  
    
});

function convertMIDI(midi) {
  //author: ChipMC/hhhzzzsss (with some changes etc etc.,..,.)
  if (!(midi instanceof Midi)) throw new TypeError("midi must be an instance of require('@tonejs/midi').Midi");
  
  let noteList = [];
  const TOTAL_TRACKS = midi.tracks.length;
  let currNoteIndex = 0;
  let totalNotes = 0; // ah yea true !! // yea
  let notesDone = 0;
  let percentage = 0;
  midi.tracks.forEach(t => totalNotes+=t.notes.length); // we'll see how this performs
  // that's what I was thinking but that's loop!
  midi.tracks.forEach((track, tIndex) => {
    let trackPercentage = tIndex / TOTAL_TRACKS * 100;
    let notes = track.notes;
    const NOTES_LENGTH = notes.length;
    
    
    notes.forEach((note, nIndex) => {
      
      let mcNote;
      if(track.instrument.percussion) mcNote = choosePercussion(track, note);
        else mcNote = chooseNote(track, note);
      
      if(mcNote != null) {
        if (mcNote.volume > maxVolume) maxVolume = mcNote.volume;
        noteList.push(mcNote);
      }
      notesDone++;
      //let notePercentageForThisTrack = nIndex / NOTES_LENGTH * 100;
      //let notePercentageTotal = notesDone / totalNotes * 100;
      //parentPort.postMessage({type: "progress_convert", notePercentage: {total: notePercentageTotal}, trackPercentage});
      percentage = ((notesDone + tIndex + 1) / (TOTAL_TRACKS + totalNotes)) * 100;
      if(nIndex % 10 === 1) parentPort.postMessage({type: "progress_convert", percentage});//mabe not so spam or yes too many packets!!!i think there is like under 10 tracks so mabe and like 1 million notes lol
    }); // I guess every 10 notes ah yea yea we could also not send note progress until a trakc is done but up to you ah mabe ah yes lol
//mabe try now yup
    percentage = ((notesDone + tIndex + 1) / (TOTAL_TRACKS + totalNotes)) * 100;
    
    parentPort.postMessage({type: "progress_convert", percentage});
    
    
  });

  
  
  noteList.forEach(note => {
    note.volume /= maxVolume;
  });
  
  noteList = noteList.sort((a, b) => a.time - b.time)
  let songLength = noteList[noteList.length-1].time;

  return { name: midi.header.name, notes: noteList, loop: false, loopPosition: 0, length: songLength };
}




function chooseNote(track, note) {
  //author: ChipMC/hhhzzzsss
  let instrument = null;

  const instrumentList = instrumentMap[track.instrument.number];
  if (instrumentList != null) {
    for (const candidateInstrument of instrumentList) {
      if (note.midi >= candidateInstrument.offset && note.midi <= candidateInstrument.offset + 24) {
        instrument = candidateInstrument;
        break;
      }
    }
  }

  if (instrument == null) return;

  const pitch = note.midi - instrument.offset;
  const time = Math.floor(note.time * 1000);

  return { time, instrument: instrument.name, pitch, volume: note.velocity };
}

function choosePercussion(track, note) {
  //author: ChipMC/hhhzzzsss
  if (note.midi < percussionMap.length) {
    const mapEntry = percussionMap[note.midi];
    if (mapEntry == null) return;

    const { pitch, instrument } = mapEntry;
    const time = Math.floor(note.time * 1000);

    return { time, instrument: instrument.name, pitch, volume: note.velocity };
  }

  return;
}

//module.exports = {convertMIDI};