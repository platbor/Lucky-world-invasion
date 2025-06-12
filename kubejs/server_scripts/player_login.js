PlayerEvents.loggedIn((event) => {
  const { player } = event
  player.tell(
    Text.translate('%s[%s]%s', [
      Text.translate('message.kubejs.login.text.0'),
      Text.translate('kubejs.title').yellow(),
      Text.translate('message.kubejs.login.text.1')
    ])
  )
})
