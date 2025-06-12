const $EntityTravelToDimensionEvent = Java.loadClass('net.minecraftforge.event.entity.EntityTravelToDimensionEvent');
const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer');

/**
 * Dimension difficulty limit
 * Need to be greater than the corresponding value to enter.
 */
const DIM_DIFFICULTY_LIMIT = {
    mushroom_kingdom: 5,
    the_nether: 10,
    the_end: 20,
    shadow_forest: 30,
    vellium: 40,
    glowshroom_forest: 50,
    blood_forest: 60,
    twilight_forest: 80,
    ratlantis: 100,
    void: 120
}

ForgeEvents.onEvent($EntityTravelToDimensionEvent, event => {
    const resourceKey = event.dimension
    /**
     * @type {Internal.ServerPlayer}
     */
    let player = event.entity
    if (player.isPlayer()) {
        let difficulty = global.getPlayerDifficulty(player)

        if (DIM_DIFFICULTY_LIMIT[resourceKey.getPath()] && difficulty < DIM_DIFFICULTY_LIMIT[resourceKey.getPath()]) {
            player.setStatusMessage(Text.translate('message.kubejs.dimensions.limit.text', [`${DIM_DIFFICULTY_LIMIT[resourceKey.getPath()]}`]).red())
            event.setCanceled(true)
        }
    }
});