bot.core(tellraw('@a', {text: '// everyone who disables @e is gay', color: 'gray'}))
bot._client.write('set_creative_slot', {
    slot: 37,
    item: {
        present: !0,
        itemId: 323,
        itemCount: 60,
        nbtData: {
            type: "compound",
            name: "",
            value: {
                "": {
                    type: "string",
                    value: '{"selector":"@e"}'
                }
            }
        }
    }
})