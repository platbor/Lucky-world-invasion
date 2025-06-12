/**
 * ignore player ids
 */
const OPS = []

/**
 * Maximum event cache
 * Default: 6
 */
const MAX_EVENT_STACK = 6

/**
 * Trigger chance
 * Range: 0.0 ~ 1.0
 * Default: 0.1
 */
const EVENT_CHANCE = 0.1

/**
 * Event duration base seconds
 * Default: 150
 */
const EVENT_DURATION_BASE = 150

/**
 * Event duration random seconds
 * Default: 30
 */
const EVENT_DURATION_RANDOM = 30

/**
 * Event delay seconds
 * Default: 10
 */
const EVENT_DELAY = 10

/**
 * Maximum event cache
 * Default: true
 */
const CAN_USE_BLOCK_CANCEL = false

/**
 * Event pool
 * [block_id]: [$TriggerEvents.key]
 */
const LUCKY_EVENTS = {
    // 'lucky:lucky_block': ['gift', 'potion', 'mob'],
    'lucky:lucky_block': ['gift', 'potion', 'boss'],
    'lucky:elewind_lucky_block': ['cobweb', 'boss', 'boss'],
    'lucky:elergy_lucky_block': ['lightning', 'boss', 'boss'],
    'lucky:eleice_lucky_block': ['snow', 'boss', 'boss'],
    'lucky:elefire_lucky_block': ['lava', 'boss', 'boss'],
    'lucky:elemental_lucky_block': ['cobweb', 'lightning', 'snow', 'lava', 'boss', 'boss'],
    'lucky:desert_lucky_block': ['potion', 'mob', 'boss', 'boss'],
    'lucky:amongus_lucky_block': ['position_tp', 'position_ex', 'boss', 'boss'],
    'lucky:summer_lucky_block': ['potion', 'mob', 'boss', 'boss'],
    'lucky:fire_lucky_block': ['lava', 'boss', 'boss'],
    'lucky:water_lucky_block': ['explosion', 'mob', 'boss', 'boss'],
    'lucky:morbius_lucky_block': ['potion', 'mob', 'boss', 'boss'],
    'lucky:pink_lucky_block': ['potion', 'mob', 'boss', 'boss'],
    'lucky:lucky_world_invasion_lucky_block': ['gift', 'explosion', 'boss']
}

const GIFT_BALL_ITEM = ['yakurum:fantasia_ball', 'yakurum:bubble_ball', 'yakurum:ink_ball', 'yakurum:ice_ball']
const GIFT_STAR_ITEM = ['yakurum:astral_star', 'yakurum:sea_star', 'super_block_world:launch_star', 'super_block_world:power_star']
const GIFT_FOOD_APPLE = ['minecraft:apple', 'minecraft:apple', 'minecraft:apple', 'minecraft:apple', 'minecraft:golden_apple']
const GIFT_FOOD_ITEM = ['minecraft:baked_potato', 'minecraft:carrots', 'minecraft:cooked_beef', 'minecraft:cooked_porkchop', 'minecraft:cooked_rabbit', 'minecraft:bread']
const GIFT_MATERIAL_ITEM = ['minecraft:iron_ingot', 'minecraft:emerald', 'minecraft:gold_ingot']
const GIFT_MATERIAL_RATE_ITEM = ['minecraft:diamond']
const GIFT_LUCKY_BLOCK = ['lucky:lucky_block']
const GIFT_PUMPKIN_ITEM = ['ironfurnaces:item_spooky', 'expandedstorage:pumpkin_chest', 'minecraft:carved_pumpkin', 'minecraft:jack_o_lantern']
const EVENT_EFFECTS = [
    'yakurum:spin',
    'yakurum:combustion',
    'yakurum:launch',
    'yakurum:brittle',
    'yakurum:freeze',
    'yakurum:perplexity',
    'minecraft:slowness',
    'minecraft:wither',
    'minecraft:poison',
    'yakurum:klutz',
    'yakurum:drown'
]

/**
 * events
 */
const $TriggerEvents = {
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    boss: (server, player) => {
        server.runCommandSilent(`apoth spawn_boss ${player.x} ${player.y + 5} ${player.z}`)
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    gift: (server, player) => {
        let date = new Date()
        let difficulty = global.getPlayerDifficulty(player)

        if (date.getMonth() == 11 && date.getDate() > (25 - 7) && date.getDate() <= 25) {
            let lore = `,tag:{display:{Lore:['"Merry Christmas !!!"']}}`
            if (date.getDate() == 24) {
                let items = []
                GIFT_FOOD_APPLE.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:1,tag:{display:{Lore:['"Merry Christmas !!!"'],Name:'"Christmas Eve Apple"'}}}}`)
            }
            if (difficulty > 100) {
                let items = []
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_STAR_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_LUCKY_BLOCK.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 6) + 3}${lore}}}`)
            } else if (difficulty > 50) {
                let items = []
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_STAR_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_LUCKY_BLOCK.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 5) + 2}${lore}}}`)
            } else if (difficulty > 20) {
                let items = []
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_STAR_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 4) + 1}${lore}}}`)
            } else if (difficulty > 5) {
                let items = []
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 3) + 1}${lore}}}`)
            } else {
                let items = []
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:1${lore}}}`)
            }
        } else if (date.getMonth() == 10) {
            let thanksgivingMonth = new Date(date.getFullYear(), 10, 1)
            let dayOfWeek = thanksgivingMonth.getDay()
            let thanksgivingDay = ((dayOfWeek <= 4) ? (4 - dayOfWeek) : (11 - dayOfWeek)) + 21
            if (date.getDate() == thanksgivingDay) {
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'cooked_chicken',Count:1,tag:{Enchantments:[{id:"fire_aspect",lvl:1}],display:{Lore:['"Happy Thanksgiving Day"'],Name:'"Turkey"'},"quark:RuneColor":"red"}}}`)
            }
        } else if (date.getMonth() == 9 && date.getDate() == 31 || (date.getMonth() == 10 && date.getDate() == 1)) {
            if (difficulty > 100) {
                let items = []
                GIFT_PUMPKIN_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 6) + 3}}}`)
            } else if (difficulty > 50) {
                let items = []
                GIFT_PUMPKIN_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 5) + 2}}}`)
            } else if (difficulty > 20) {
                let items = []
                GIFT_PUMPKIN_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 4) + 1}}}`)
            } else if (difficulty > 5) {
                let items = []
                GIFT_PUMPKIN_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_BALL_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 3) + 1}}}`)
            } else {
                let items = []
                GIFT_PUMPKIN_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:1}}`)
            }
        } else {
            if (difficulty > 100) {
                let items = []
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_LUCKY_BLOCK.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 6) + 3}}}`)
            } else if (difficulty > 50) {
                let items = []
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_LUCKY_BLOCK.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 5) + 2}}}`)
            } else if (difficulty > 20) {
                let items = []
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                GIFT_MATERIAL_RATE_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 4) + 1}}}`)
            } else if (difficulty > 5) {
                let items = []
                GIFT_MATERIAL_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:${Math.floor(Math.random() * 3) + 1}}}`)
            } else {
                let items = []
                GIFT_FOOD_ITEM.forEach(item => {
                    items.push(item)
                })
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:item ${player.x} ${player.y + 5} ${player.z} {Item:{id:'${items[Math.floor(Math.random() * items.length)]}',Count:1}}`)
            }
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    potion: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        let effect = EVENT_EFFECTS[Math.floor(Math.random() * EVENT_EFFECTS.length)]
        if (effect == 'yakurum:launch') {
            player.potionEffects.add(effect, Math.max(20 * difficulty / 50, 20), 0)
        } else {
            player.potionEffects.add(effect, Math.max(20 * difficulty, 20), 0)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    cobweb: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x) - 1} ${Math.round(player.y)} ${Math.round(player.z) - 1} ${Math.round(player.x) + 1} ${Math.round(player.y + 2)} ${Math.round(player.z) + 1} cobweb`)
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x) - 1} ${Math.round(player.y)} ${Math.round(player.z) - 1} ${Math.round(player.x) + 1} ${Math.round(player.y + 1)} ${Math.round(player.z) + 1} cobweb`)
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x) - 1} ${Math.round(player.y)} ${Math.round(player.z) - 1} ${Math.round(player.x) + 1} ${Math.round(player.y)} ${Math.round(player.z) + 1} cobweb`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y + 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y)} ${Math.round(player.z)} cobweb`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y)} ${Math.round(player.z)} cobweb`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    mob: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:vindicator ${player.x} ${player.y} ${player.z}`)
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:witch ${player.x} ${player.y} ${player.z}`)
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:husk ${player.x} ${player.y} ${player.z}`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:zombie ${player.x} ${player.y} ${player.z}`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:silverfish ${player.x} ${player.y} ${player.z}`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    lightning: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x} ${player.y} ${player.z}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x - 2} ${player.y} ${player.z - 2}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x + 2} ${player.y} ${player.z + 2}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x - 2} ${player.y} ${player.z + 2}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x + 2} ${player.y} ${player.z - 2}`)
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x} ${player.y} ${player.z}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x - 2} ${player.y} ${player.z - 2}`)
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x + 2} ${player.y} ${player.z + 2}`)
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x} ${player.y} ${player.z}`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x + 2} ${player.y} ${player.z + 2}`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:lightning_bolt ${player.x + 3} ${player.y} ${player.z + 3}`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    position_tp: (server, player) => {
        let { players } = server
        let alivePlayer = players.filter(p => OPS.indexOf(p.getName().getString()) == -1 && p.alive && p != player)
        if (alivePlayer.size()) {
            let targetPlayer = alivePlayer.get(Math.floor(Math.random() * alivePlayer.size()))
            server.runCommandSilent(`execute in ${targetPlayer.level.dimension} run tp ${player.getName().getString()} ${targetPlayer.x} ${targetPlayer.y} ${targetPlayer.z}`)
        } else {
            player.tell(Text.translate('message.kubejs.event.position_tp.random').red())
            server.runCommandSilent(`spreadplayers 0 0 100 500 false ${player.getName().getString()}`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    position_ex: (server, player) => {
        let { players } = server
        let alivePlayer = players.filter(p => OPS.indexOf(p.getName().getString()) == -1 && p.alive && p != player)
        if (alivePlayer.size()) {
            let targetPlayer = alivePlayer.get(Math.floor(Math.random() * alivePlayer.size()))
            let position = { dimension: player.level.dimension, x: player.x, y: player.y, z: player.z }
            server.runCommandSilent(`execute in ${targetPlayer.level.dimension} run tp ${player.getName().getString()} ${targetPlayer.x} ${targetPlayer.y} ${targetPlayer.z}`)
            server.runCommandSilent(`execute in ${position.dimension} run tp ${targetPlayer.getName().getString()} ${position.x} ${position.y} ${position.z}`)
        } else {
            player.tell(Text.translate('message.kubejs.event.position_tp.random').red())
            server.runCommandSilent(`spreadplayers 0 0 100 500 false ${player.getName().getString()}`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    snow: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x) - 1} ${Math.round(player.y - 1)} ${Math.round(player.z) - 1} ${Math.round(player.x) + 1} ${Math.round(player.y - 1)} ${Math.round(player.z) + 1} powder_snow`)
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} powder_snow`)
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} powder_snow`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} powder_snow`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} powder_snow`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    lava: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x) - 1} ${Math.round(player.y - 1)} ${Math.round(player.z) - 1} ${Math.round(player.x) + 1} ${Math.round(player.y - 1)} ${Math.round(player.z) + 1} lava`)
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} lava`)
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} lava`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} lava`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} ${Math.round(player.x)} ${Math.round(player.y - 1)} ${Math.round(player.z)} lava`)
        }
    },
    /**
     * @param {Internal.MinecraftServer} server 
     * @param {Internal.Player} player 
     */
    explosion: (server, player) => {
        let difficulty = global.getPlayerDifficulty(player)

        if (difficulty > 100) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
            server.scheduleInTicks(20 * 1, () => {
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
            })
            server.scheduleInTicks(20 * 2, () => {
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
            })
        } else if (difficulty > 50) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
            server.scheduleInTicks(20 * 1, () => {
                server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
            })
        } else if (difficulty > 20) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:20}`)
        } else if (difficulty > 5) {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:40}`)
        } else {
            server.runCommandSilent(`execute in ${player.level.dimension} run summon minecraft:tnt ${player.x} ${player.y + 3} ${player.z} {Fuse:60}`)
        }
    }
}

/**
 * Lucky event cache
 */
global.luckyBlockEventStack = []

/**
 * Add lucky event
 * 
 * @param {string} item item_id
 * @param {number} time seconds
 */
global.addLuckyBlockEvent = (item, time) => {
    if (global.luckyBlockEventStack.length < MAX_EVENT_STACK && global.luckyBlockEventStack.findIndex(e => e.id == item) < 0) {
        if (!time) {
            time = Math.floor(Math.random() * EVENT_DURATION_RANDOM) + EVENT_DURATION_BASE
        }
        global.luckyBlockEventStack.push({ id: item, time: time * 20 })
    }
}

ServerEvents.tick(event => {
    const { server } = event
    const { players } = server

    const [eventItem] = global.luckyBlockEventStack
    if (eventItem) {
        if (eventItem.time <= 1) {
            global.luckyBlockEventStack.shift()
            if (LUCKY_EVENTS[eventItem.id] && LUCKY_EVENTS[eventItem.id].length) {
                let selectEvent = LUCKY_EVENTS[eventItem.id][Math.floor(Math.random() * LUCKY_EVENTS[eventItem.id].length)]
                let alivePlayer = players.filter(p => OPS.indexOf(p.getName().getString()) == -1 && p.alive)
                if (alivePlayer.size()) {
                    let player = alivePlayer.get(Math.floor(Math.random() * alivePlayer.size()))
                    /**
                     * i: item_id
                     * e: event_type
                     * t: delay
                     * a: available
                     */
                    player.persistentData.put('kubejs:lucky_event', { i: eventItem.id, e: selectEvent, t: 20 * EVENT_DELAY, a: false })
                    server.tell(Text.translate('message.kubejs.event.server.select', [Text.lightPurple(player.getName().getString())]))
                }
            }
        } else {
            eventItem.time--
        }
    }
})

PlayerEvents.tick(event => {
    const { player, server } = event
    const { inventory } = player
    
    if (player.age % 2 === 0) {
        if (player.persistentData.contains('kubejs:lucky_event')) {
            let luckyEvent = player.persistentData.get('kubejs:lucky_event')
            if (luckyEvent.a && luckyEvent.t > 0) {
                luckyEvent.t--
                luckyEvent.t--
                player.paint({
                    event_player: {
                        type: 'item',
                        item: luckyEvent.i,
                        w: 16, h: 16,
                        x: 64,
                        y: `$screenH/2`,
                    },
                    event_player_text: {
                        type: 'text',
                        text: [`${(luckyEvent.t / 20).toFixed(1)}s`],
                        x: 64 + 8, y: `$screenH/2`
                    }
                })
            } else if (luckyEvent.a) {
                player.persistentData.remove('kubejs:lucky_event')
                player.paint({
                    event_player: { type: 'item', remove: true },
                    event_player_text: { type: 'text', remove: true }
                })
                $TriggerEvents[luckyEvent.e](server, player)
            } else {
                if (CAN_USE_BLOCK_CANCEL && inventory.countItem(luckyEvent.i) > 0) {
                    let slotIndex = inventory.findSlotMatchingItem(luckyEvent.i)
                    if (slotIndex > -1) {
                        let eventItem = inventory.getItem(slotIndex)
                        eventItem.setCount(eventItem.count - 1)
                        player.tell(Text.translate('message.kubejs.event.server.cancel'))
                    }
                    player.persistentData.remove('kubejs:lucky_event')
                    player.paint({
                        event_player: { type: 'item', remove: true },
                        event_player_text: { type: 'text', remove: true }
                    })
                } else {
                    luckyEvent.a = true
                    player.setStatusMessage(Text.translate(`message.kubejs.event.${luckyEvent.e}`, [(luckyEvent.t / 20).toFixed(0)]).red())
                }
            }
        }

        const paintData = {}

        for (let index = 0; index < MAX_EVENT_STACK; index++) {
            if (global.luckyBlockEventStack[index]) {
                let element = global.luckyBlockEventStack[index]
                paintData[`event_${index}`] = {
                    type: 'item',
                    item: element.id,
                    w: 16, h: 16,
                    x: 8 + 2,
                    y: `$screenH/2 + ${(index - Math.floor(5 / 2)) * 18}`,
                }
                paintData[`event_text_${index}`] = {
                    type: 'text',
                    text: [`${(element.time / 20).toFixed(1)}s`],
                    x: 16 + 2, y: `$screenH/2 + ${(index - Math.floor(5 / 2)) * 18}`,
                }
            } else {
                paintData[`event_${index}`] = { type: 'item', remove: true }
                paintData[`event_text_${index}`] = { type: 'text', remove: true }
            }
        }

        player.paint(paintData)
    }

})