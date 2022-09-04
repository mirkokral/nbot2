const https = require("https");
const http = require("http");
const fs = require("fs");

const maxDownloadBytes = 10485760; //deafults to 10mb

function download(url, dest, cb) {
  let file = null;
  let httpOrHttps = https;
  url.startsWith("https:") ? httpOrHttps = https : httpOrHttps = http;

  let request = httpOrHttps.get(url, (response) => {
    console.log("Download started! url: "+url);
    let size;
    try {
    size = parseInt(response.headers["content-length"]);
    } catch(e) {size = null;}

    if(response.headers["content-disposition"] != null && dest == undefined) {//get name from headers if it exists
      dest = __dirname+"/songs/"+response.headers["content-disposition"].toString().split("filename=")[1].replace(/\/|\"|\'|\`/g, "");
    }
    if(dest == undefined || dest == __dirname+"/songs/") {
      if(url.toLowerCase().endsWith(".mid") || url.toLowerCase().endsWith(".midi")) {
        let split = url.split("/");
        dest = __dirname+"/songs/"+split[split.length - 1];
      } else {
        dest = __dirname+"/songs/song.mid";
      }
    }
    if(dest.includes(", ")) dest = dest.split(", ")[0];
    console.log(dest);
    console.log(__dirname);
    console.log(fs.existsSync(dest));
    if(fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
    file = fs.createWriteStream(dest);
    console.log(file);
    
    if (size != null) {
      if (size > maxDownloadBytes) {
        if (cb) cb(`File was too big max allowed ${formatBytes(maxDownloadBytes)} (${maxDownloadBytes}) Recieved ${formatBytes(size)} (${size}) [header]`);
        request.abort();
        fs.unlink(dest, () => { });
        return;
      }
    }
    
    size = 0;
    
    response.on("data", (data) => {
      size += data.length;

      if (size > maxDownloadBytes) {
        if (cb) cb(`File was too big max allowed ${formatBytes(maxDownloadBytes)} (${maxDownloadBytes}) Recieved ${formatBytes(size)} (${size}) [data.length]`);

        request.abort();
        fs.unlink(dest);
        return;
      }
    }).pipe(file);

    response.on("error", (err) => {
      request.abort();
      fs.unlink(dest, () => { });
      if (cb) cb(err.message);
    })

    file.on("finish", () => {
      console.log("finished")
      file.close(() => {
        cb(undefined, dest);
      });
    });

  }).on("error", (err) => {
    request.abort();
    fs.unlink(dest, () => { });
    if (cb) cb(err.message);
  });
};

module.exports.download = download;

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}