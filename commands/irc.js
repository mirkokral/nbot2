// data = [
//     {
//         text: '[' + opts.name + '] ',
//         color: 'gray',
//         clickEvent: {
//             action: 'copy_to_clipboard',
//             value: bot.host
//         },
//         hoverEvent: {
//             action: 'show_text',
//             contents: {
//                 text: 'Click to copy server IP!',
//                 color: 'green'
//             }
//         }
//     },
//     {
//         text: rawusername.split(' ')[rawusername.split(' ').length-1],
//         color: 'white'
//     },
//     {
//         text: ' › ',
//         color: 'white'
//     },
//     {
//         text: args.join(' '),
//         color: 'white'
//     }
// ]
// Object.keys(bots).forEach((e) => {
//     bots[e].bcore(`tellraw @a ${JSON.stringify(data)}`, 0, -5, 0)
// })
process.send({
    type: 'netmsg',
    message: rawargs.join(' '),
    username: rawusername.split(' ')[rawusername.split(' ').length - 1],
    // name: opts.name,
    name: opts.host
})