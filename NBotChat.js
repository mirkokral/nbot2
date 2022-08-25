const YAML = require('yaml')
const FS = require('fs')
let Translations = {}
let lang = 'en'
function FetchAllTranslations(){
    FS.readdirSync(require('path').join(__dirname, 'lang')).forEach(e => {
        a = YAML.parse(FS.readFileSync(require('path').join(__dirname, 'lang', e), 'utf-8'))
        Translations[e.substring(0,e.length-4)] = (a)
    })
}
function setLang(elang){
    if(!FS.existsSync(__dirname + '/lang/' + elang + '.yml')) throw new Error('Invalid language')
    lang = elang
}
function Translate(thing,withe){
    if(typeof withe == 'string') withe = [withe]
    if(Translations[lang][thing] == undefined)
        return require('util').format(thing, ...withe)
    else
        return require('util').format(Translations[lang][thing], ...withe)
}
module.exports = 
    {
        FetchAllTranslations,
        setLang,
        Translate
    }