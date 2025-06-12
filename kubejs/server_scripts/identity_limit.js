// PlayerEvents.tick(event => {
//     const { player, server } = event

//     if (player.getNbt().getCompound('CurrentIdentity')
//         && 'minecraft:empty' !== player.getNbt().getCompound('CurrentIdentity').getString('id')) {
//         server.runCommandSilent(`identity unequip ${player.getName().getString()}`)
//     }
// })