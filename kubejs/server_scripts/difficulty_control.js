/**
 * If the difficulty value more then the key, the difficulty value will decrease by value
 */
const AUTO_DIFFICULTY_REDUCE = {
    '250': 50,
    '100': 10,
    '50': 5,
    '20': 2,
    '5': 1,
    '0.5': 0.5
}

EntityEvents.death((event) => {
    const { entity, server, player } = event

    if (entity.isPlayer()) {
        let difficulty = global.getPlayerDifficulty(entity)

        let config = Object.keys(AUTO_DIFFICULTY_REDUCE).sort((a, b) => parseFloat(b) - parseFloat(a))
        for (let key of config) {
            if (difficulty > parseFloat(key)) {
                server.runCommandSilent(`improvedmobs difficulty player ${entity.getName().getString()} add -${AUTO_DIFFICULTY_REDUCE[key]}`)
                player.tell(Text.translate('message.kubejs.difficulty.reduce', [AUTO_DIFFICULTY_REDUCE[key]]).red())
                break
            }
        }
    }
})