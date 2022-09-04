if (!config.ops.map(e => e.toLowerCase()).includes(username.toLowerCase()) && verified == (false || undefined)) {
// if (false) {
  bots[opts.name].core(
    tellraw("@a", [
      {
        text: config.botMetadata.name,
        color: "yellow",
      },
      {
        text: " | ",
        color: "dark_gray",
      },
      {
        text: "No permission!",
        color: "red",
      },
    ])
  );
} else {
  bots[opts.name].hash = require("crypto")
    .createHash("md5")
    .update(Date.now().toString())
    .digest("hex");
  require("fs").writeFileSync(
    "./hash %.txt".replace("%", opts.name),
    bots[opts.name].hash
  );
  bots[opts.name].core(
    tellraw("@a", [
      {
        text: config.botMetadata.name,
        color: "yellow",
      },
      {
        text: " | ",
        color: "dark_gray",
      },
      {
        text: "Hash reset!",
        color: "green",
      },
    ])
  );
  bots[opts.name].emit('hash', bots[opts.name].hash,username)
  try{
    process.send({type: 'hash', server: opts.name, hash: bot.hash, sender: username})
  } catch (e) {bot.say(e)}
}
