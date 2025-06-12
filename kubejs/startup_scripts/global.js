/**
* @param {Internal.Player} player 
*/
global.getPlayerDifficulty = player => {
    return player.nbt.ForgeCaps['improvedmobs:player_cap']?.Difficulty || 0
}

/**
* @param {Internal.Player} player 
*/
global.getPlayerCurios = player => {
    const curios = player.nbt.ForgeCaps['curios:inventory']?.Curios || []
    return curios
}

/**
* @param {Internal.MinecraftServer} server 
*/
global.getCompass = (server, playerName, displayName, dimension, x, y, z) => {
    server.runCommandSilent(
        `give ${playerName} minecraft:compass{display:{Name:'"${displayName}"'}, LodestonePos:{X:${x},Y:${y},Z:${z}}, LodestoneDimension:"${dimension}", LodestoneTracked:0b}`
    )
}
