bot.core(say([
    { text: config.botMetadata.name, color: "yellow" }, 
    { text: "'s current version is: ", color: 'gray'},
    { text: config.botMetadata.version, color: 'aqua'}
]));
