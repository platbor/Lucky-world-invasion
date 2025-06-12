// ItemEvents.toolTierRegistry(event => {
//     event.add('lucky_gem', tier => {
//         tier.uses = 250
//         tier.speed = 6.0
//         tier.attackDamageBonus = 2.0
//         tier.level = 2
//         tier.enchantmentValue = 14
//         tier.repairIngredient = 'shadowlands:ghostmetal_ingot'
//     })
// })


// StartupEvents.registry('champions:affix', event => {
//     event.create('').settings(s => {
//         s.setEnable(true)
//         s.setPrefix('')
//         s.setCategory('defense')
//     }).behavior(b => {
//         b.onHurt(e => {
//             e.livingEntity.
//         })
//     })
// })

ItemEvents.modification(event => {
    event.modify('minecraft:potion', item => {
        item.maxStackSize = 16
    })
    event.modify('minecraft:mushroom_stew', item => {
        item.maxStackSize = 16
    })
    event.modify('csgobox:csgo_box', item => {
        item.maxStackSize = 64
    })
})

StartupEvents.registry('item', (event) => {
    event.create('lucky_gem_pickaxe', 'pickaxe')
        .tier('netherite')
        .texture('kubejs:item/lucky_gem_pickaxe')
        .rarity('epic')
        .maxDamage(100)
        .tooltip(Text.translate('tooltip.kubejs.lucky_gem_pickaxe').gray())
        .glow(true)
        .fireResistant()

    event.create('lucky_gem_pickaxe_imitation', 'pickaxe')
        .tier('diamond')
        .texture('kubejs:item/lucky_gem_pickaxe')
        .rarity('uncommon')
        .maxDamage(100)
        .tooltip(Text.translate('tooltip.kubejs.lucky_gem_pickaxe_imitation').gray())

    event.create('bad_apple').food(food => {
        food.alwaysEdible()
        food.hunger(0)
        food.saturation(0)
    })
        .rarity('uncommon')
        .tooltip(Text.translate('tooltip.kubejs.bad_apple').gray())
        .maxStackSize(16)
        .glow(true)

    event.create('challenge_badge')
        .texture('kubejs:item/badge')
        .rarity('rare')
        .tooltip(Text.translate('tooltip.kubejs.challenge_badge').gray())
        .glow(true)
        .fireResistant()

})

StartupEvents.registry('mob_effect', (event) => {
    event.create('kubejs:lucky_shield')
        .color(0xff9d00)
        .beneficial()
        .effectTick((ett, lv) => {
            let { age, level, absorptionAmount } = ett;
            if (level.clientSide) return;
            // if (ett.isMonster()) {
                if (age % 20 == 0) {
                    let maxAmount = (lv + 1) * 5
                    if (absorptionAmount < maxAmount) {
                        absorptionAmount = Math.min(maxAmount, absorptionAmount + (lv + 1) * 5)
                        ett.setAbsorptionAmount(absorptionAmount)
                    }
                }
            // } else {
            //     ett.removeEffect('kubejs:lucky_shield')
            // }
        })
        .modifyAttribute('minecraft:generic.armor', 'ModifyArmor', 0.01, 'multiply_base')
        .createObject()
})
