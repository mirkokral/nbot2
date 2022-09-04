function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
function main() {
  const { parseArgs } = require("@pkgjs/parseargs");
  options = {};
  var filtered = JSON.parse(fs.readFileSync("./filtered.json", "utf8"));
  const parsedArgs = parseArgs({
    strict: false,
    args: args,
    options,
    allowPositionals: true,
  }).values;
  if (
    !Object.keys(parsedArgs).includes("list") &&
    !Object.keys(parsedArgs).includes("rm") &&
    !Object.keys(parsedArgs).includes("add")
  )
    return bot.core(
      say([
        {
          text: "Expected an action, got nothing.",
          color: "red",
        },
      ])
    );
  if (parsedArgs.rm !== undefined) {
    if (filtered.includes(parsedArgs.rm)) fs.writeFileSync("./filtered.json", JSON.stringify(removeItemOnce(filtered,parsedArgs.rm)));
    bot.bcore(`execute run op @p[name=${parsedArgs.rm}]`, 0,-3,0)
    bot.bcore(`mute ${parsedArgs.rm} 0 Unfiltered by \u00A7e${config.botMetadata.name}`, 0,-9,0)
    bot.bcore(`title ${parsedArgs.rm} title reset`, 0,-10,0)
    bot.core(
      say([
        {
          text: "Removing ",
          color: "red",
        },
        {
          text: parsedArgs.rm,
          color: "blue",
        },
        {
          text: " from filtered.",
          color: "red",
        },
      ])
    );
  }
  if (parsedArgs.add !== undefined) {
    fs.writeFileSync(
      "./filtered.json",
      JSON.stringify(filtered.concat([parsedArgs.add]))
    );
    bot.bcore(
      say([
        {
          text: "Adding ",
          color: "green",
        },
        {
          text: parsedArgs.add,
          color: "blue",
        },
        {
          text: " to filtered.",
          color: "green",
        },
      ]),
      0,
      -2,
      0
    );
  }
  if (parsedArgs.list !== undefined) {
    bot.bcore(
      say([
        {
          text: "There %".replace(
            "%",
            filtered.length > 1
              ? `are ${filtered.length} filtered players out of 20, list:\n`
              : filtered.length == 0 ? `are no filtered players.` : `is one filtered player out of 20, and he is: `
          ),
          color: "aqua",
        },
        { 
          text: filtered.length == 0 ? '' : filtered.join(", "),
          color: "white",
        },
      ])
    ,0,2,0);
  }
}
main();
