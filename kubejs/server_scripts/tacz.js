TaCZServerEvents.entityShoot(event => {
    const { player } = event
    if (player && player.nbt.getCompound('ForgeData').getBoolean('playerrevive:bleeding')) {
        player.setStatusMessage(Text.translate('message.kubejs.gun.disabled').red())
        event.cancelShoot();
    }
});

TaCZServerEvents.entityMelee(event => {
    const { player } = event
    if (player && player.nbt.getCompound('ForgeData').getBoolean('playerrevive:bleeding')) {
        player.setStatusMessage(Text.translate('message.kubejs.gun.disabled').red())
        event.cancelMelee();
    }
});

TaCZServerEvents.entityReload(event => {
    const { player } = event
    if (player && player.nbt.getCompound('ForgeData').getBoolean('playerrevive:bleeding')) {
        player.setStatusMessage(Text.translate('message.kubejs.gun.disabled').red())
        event.cancelReload();
    }
});