const t = require('./NBotChat')
t.FetchAllTranslations()
console.log(t.Translate('language.invalid', 'asdf'))
t.setLang('sk')
console.log(t.Translate('language.invalid', 'asdf'))
