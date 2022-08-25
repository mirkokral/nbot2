(
    async function(){
        const tti = require('text-to-image')
        console.log(await tti.generate('Lorem ipsum',
        {
            bgColor: '#18191c',
            textColor: '#FFFFFF',
            customHeight: 30
        }))
    }
)()