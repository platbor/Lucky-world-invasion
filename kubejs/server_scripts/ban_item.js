PlayerEvents.inventoryChanged(event => {
    const { item, player } = event;

    if ([
        'confluence:brain_of_confusion',
        'artifacts:helium_flamingo',
        'fuze_relics:axolo_soap',
        'fuze_relics:axolo_soap_2',
        'fuze_relics:axolo_soap_3',
        'fuze_relics:nether_portal_gun'
    ].indexOf(item.getId()) !== -1 && item.getCount() > 0) {
        player.tell(Text.translate('message.kubejs.item.ban').red());
        player.inventory.clear(item);
    }
})
