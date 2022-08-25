try {
  Translater.setLang(args[0]);
  bot.core(
    say({
      text: Translate('command.setLang.success', args[0]),
      color: 'green'
    })
  );
} catch (e) {
    bot.core(
        say({
            text: Translate('command.setLang.fail', args[0])
        })
    )
}
