bot.core(say([
    { text: "NightBot", color: "yellow" }, 
    { text: "'s current version is: ", color: 'gray'},
    { text: config.botMetadata.version, color: 'aqua'}
]));
