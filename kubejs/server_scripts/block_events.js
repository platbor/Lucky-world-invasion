BlockEvents.broken((event) => {
    const { block, player, server } = event

    if (Object.keys(LUCKY_EVENTS).indexOf(block.id) != -1) {
        let silkTouch = player.handSlots[0].getEnchantments().get('minecraft:silk_touch') || 0

        if ('kubejs:lucky_gem_pickaxe' == player.handSlots[0].id) {
            server.scheduleInTicks(20 * 1, () => {
                server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(block.x)} ${Math.round(block.y)} ${Math.round(block.z)} ${Math.round(block.x)} ${Math.round(block.y)} ${Math.round(block.z)} ${block.id}`)
            })
        } else if (silkTouch <= 0 && 'kubejs:lucky_gem_pickaxe_imitation' == player.handSlots[0].id) {
            global.addLuckyBlockEvent(block.id)
        } else if (Math.random() * silkTouch > (1 - EVENT_CHANCE)) {
            global.addLuckyBlockEvent(block.id)
        }
    }
})
