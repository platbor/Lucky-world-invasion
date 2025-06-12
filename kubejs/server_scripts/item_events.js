/**
 * If the difficulty value is less than the key, the difficulty value will increase by value
 */
const BAD_APPLE_DIFFICULTY_ADD = {
    '250': 10,
    '50': 5,
    '20': 2,
    '5': 1
}

/**
 * bad apple
 */
ItemEvents.foodEaten('kubejs:bad_apple', (event) => {
    const { server, player } = event
    let difficulty = global.getPlayerDifficulty(player)
    let config = Object.keys(BAD_APPLE_DIFFICULTY_ADD).sort((a, b) => parseFloat(a) - parseFloat(b))
    for (let key of config) {
        if (difficulty < parseFloat(key)) {
            if (difficulty > (parseFloat(key) - BAD_APPLE_DIFFICULTY_ADD[key])) {
                server.runCommandSilent(`improvedmobs difficulty player ${player.getName().getString()} set ${key}`)
                player.tell(Text.red(Text.translate(`message.kubejs.item.bad_apple`, [
                    Text.translate('item.kubejs.bad_apple'),
                    (parseFloat(key) - difficulty).toFixed(1)
                ])))
            } else {
                server.runCommandSilent(`improvedmobs difficulty player ${player.getName().getString()} add ${BAD_APPLE_DIFFICULTY_ADD[key]}`)
                player.tell(Text.red(Text.translate(`message.kubejs.item.bad_apple`, [
                    Text.translate('item.kubejs.bad_apple'),
                    BAD_APPLE_DIFFICULTY_ADD[key]
                ])))
            }

            break
        }
    }
})

ItemEvents.rightClicked('lucky:lucky_world_invasion_lucky_sword', event => {
    const { player, level } = event;
    const viewVector = player.getViewVector(1.0);
    const length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z());
    const normalizedVector = {
        x: viewVector.x() / length,
        y: viewVector.y() / length,
        z: viewVector.z() / length
    };
    const entityIDs = ['minecraft:snowball', 'yakurum:zeus_thunder', 'yakurum:ice_ball', 'yakurum:astral_star', 'yakurum:water_ball', 'yakurum:ink_ball'];
    const randomIndex = Math.floor(Math.random() * entityIDs.length);
    const randomEntityID = entityIDs[randomIndex];
    const projectile = level.createEntity(randomEntityID);
    projectile.setPosition(player.x, player.y + 1.6, player.z);
    const velocity = 2;
    projectile.setMotion(normalizedVector.x * velocity, normalizedVector.y * velocity, normalizedVector.z * velocity);
    projectile.setOwner(player)
    projectile.mergeNbt({ pickup: 2 })
    projectile.spawn();
});

const BOSS_SUMMON = {
    'twilightforest:auroralized_glass': {
        entityId: 'torchesbecomesunlight:frost_nova',
        difficulty: 80,
        dimension: 'twilightforest:twilight_forest'
    },
    'twilightforest:deadrock': {
        entityId: 'torchesbecomesunlight:patriot',
        difficulty: 90,
        dimension: 'twilightforest:twilight_forest'
    },
    // 'twilightforest:violet_castle_rune_brick': {
    //     entityId: 'torchesbecomesunlight:gun_knight_patriot',
    //     difficulty: 100,
    //     dimension: 'twilightforest:twilight_forest'
    // },
    'rats:marbled_cheese_golem_core': {
        entityId: 'torchesbecomesunlight:pursuer',
        difficulty: 110,
        dimension: 'rats:ratlantis'
    },
}

ItemEvents.rightClicked('kubejs:challenge_badge', event => {
    const { player, level, target, item } = event;
    let difficulty = global.getPlayerDifficulty(player)

    if (target && target.block) {
        // if ('minecraft:grass_block' === target.block.id) {
        //     player.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y + 2)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y + 2)} ${Math.round(player.z)} lucky:lucky_block{Luck:-100}`)
        //     player.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y + 3)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y + 3)} ${Math.round(player.z)} minecraft:redstone_block`)
        //     player.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y + 3)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y + 3)} ${Math.round(player.z)} air`)
        // }

        for (const key in BOSS_SUMMON) {
            if (key == target.block.id) {
                if ('minecraft:air' != level.getBlock(target.block.x, target.block.y + 1, target.block.z).id ||
                    'minecraft:air' != level.getBlock(target.block.x, target.block.y + 2, target.block.z).id) {
                    player.setStatusMessage(Text.translate('message.kubejs.summon.error.block').red())
                    break
                }
                if (BOSS_SUMMON[key].dimension && BOSS_SUMMON[key].dimension != level.dimension) {
                    player.setStatusMessage(Text.translate('message.kubejs.summon.error.dimension').red())
                    break
                }
                if (BOSS_SUMMON[key].difficulty && BOSS_SUMMON[key].difficulty > difficulty) {
                    player.setStatusMessage(Text.translate('message.kubejs.summon.error.diffuculty', [BOSS_SUMMON[key].difficulty]).red())
                    break
                }
                if (level.getEntities().filter(e => e.isLiving() && BOSS_SUMMON[key].entityId == e.type).size() > 0) {
                    player.setStatusMessage(Text.translate('message.kubejs.summon.error.exist').red())
                    break
                }
                let entity = target.block.createEntity(BOSS_SUMMON[key].entityId)
                entity.setPosition(target.block.x, target.block.y + 1, target.block.z)
                entity.spawn()
                item.count--

                break
            }
        }
    }
})

ItemEvents.rightClicked('shadowlands:gold_coin', event => {
    const { player, target, item, server } = event;

    if (target && target.entity && player.isCrouching() && 'minecraft:cat' === target.entity.type) {
        if (target.entity.getNbt().get('Owner')) {
            player.setStatusMessage(Text.translate('message.kubejs.npc.error.owner').red())
            return
        }
        
        server.runCommandSilent(`easy_npc preset import_with_owner data easy_npc:preset/cat/lucky_cat.npc.nbt ${player.getName().getString()} ${target.entity.x} ${target.entity.y} ${target.entity.z}`)
        target.entity.remove('discarded')
        item.count--
    }

})

ItemEvents.rightClicked('shadowlands:silver_coin', event => {
    const { player, target, item, server } = event;

    if (target && target.entity && player.isCrouching() && 'rats:rat' === target.entity.type) {
        if (target.entity.getNbt().get('Owner')) {
            player.setStatusMessage(Text.translate('message.kubejs.npc.error.owner').red())
            return
        }
        
        server.runCommandSilent(`easy_npc preset import_with_owner data easy_npc:preset/cat/jerry.npc.nbt ${player.getName().getString()} ${target.entity.x} ${target.entity.y} ${target.entity.z}`)
        target.entity.remove('discarded')
        item.count--
    }

})

ItemEvents.rightClicked('shadowlands:copper_coin', event => {
    const { player, target, item, server } = event;

    if (target && target.entity && player.isCrouching() && 'minecraft:villager' === target.entity.type) {
        if ('minecraft:toolsmith' === target.entity.getNbt().getCompound('VillagerData').getString('profession')) {
            server.runCommandSilent(`easy_npc preset import_with_owner data easy_npc:preset/villager/cs_villager.npc.nbt ${player.getName().getString()} ${target.entity.x} ${target.entity.y} ${target.entity.z}`)
            target.entity.remove('discarded')
            item.count--
        }
        
    }

})
