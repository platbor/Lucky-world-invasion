const $MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
const chargedMobs = new Set()

/**
 * global damage limit
 */
const GLOBAL_DAMAGE_LIMIT = {
    percentage: 10,
    limit: 500,
    luckyShieldTime: 30,
    maxShieldLevel: 100
}

const BOSS_AND_ELIT = [
    'minecraft:ender_dragon',
    'minecraft:warden',
    'minecraft:wither',
    'yakurum:water_shooter',
    'yakurum:water_master',
    'yakurum:biped_guardian',
    'yakurum:kraken',
    'yakurum:king_triton',
    'yakurum:poseidon',
    'fuze_relics:burger_boss',
    'shadowlands:wither_skeleton_commander',
    'shadowlands:doom_star',
    'shadowlands:guardian_boar',
    'shadowlands:vellium_megabee',
    'shadowlands:sporeking',
    'shadowlands:plaguemaiden',
    'shadowlands:the_red_knight',
    'shadowlands:red_nightmare',
    'shadowlands:ascendant_star_stage_1',
    'shadowlands:ascendant_star_stage_2',
    'shadowlands:ascendant_star_stage_3',
    'shadowlands:ascendant_star_stage_4',
    'shadowlands:ascendant_star_stage_5',
    'shadowlands:emperor_wither',
    'twilightforest:naga',
    'twilightforest:lich',
    'twilightforest:minoshroom',
    'twilightforest:hydra',
    'twilightforest:knight_phantom',
    'twilightforest:ur_ghast',
    'twilightforest:alpha_yeti',
    'twilightforest:snow_queen',
    'better_minoshroomtaur:better_minoshroomtaur',
    'legendary_monsters:dune_sentinel',
    'legendary_monsters:posessed_paladin',
    'legendary_monsters:ancient_guardian',
    'legendary_monsters:frostbitten_golem',
    'legendary_monsters:withered_abomination',
    'legendary_monsters:skeletosaurus',
    'legendary_monsters:warped_fungussus',
    'legendary_monsters:endersent',
    'legendary_monsters:shulker_mimic',
    'legendary_monsters:overgrown_colossus',
    'legendary_monsters:lava_eater',
    'legendary_monsters:cloud_golem',
    'torchesbecomesunlight:patriot',
    'torchesbecomesunlight:gun_knight_patriot',
    'torchesbecomesunlight:frost_nova',
    'torchesbecomesunlight:pursuer',
    'born_in_chaos_v1:lord_pumpkinhead',
    'born_in_chaos_v1:lord_pumpkinhead_withouta_horse',
    'born_in_chaos_v1:lord_the_headless',
    'born_in_chaos_v1:lord_pumpkinhead_head',
    'rats:rat_king',
    'rats:black_death',
    'rats:dutchrat',
    'rats:rat_baron',
    'rats:neo_ratlantean',
    'rats:ratlantean_automaton'
]

const SKILL_BREAK_MOBS = [
    'shadowlands:vellium_megabee'
]

/**
 * LivingHurtEvent
 * 
 * @param {Internal.LivingHurtEvent} event 
 */
global.LivingHurtEvent = event => {
    const { source, entity, amount } = event
    const { player } = source

    const damageType = typeof source.type === 'function' ? source.type() : source.type
    const msgId = typeof damageType.msgId === 'function' ? damageType.msgId() : damageType.msgId

    let fixAmount = amount

    // lightningBolt
    if (fixAmount > 0 && entity.isMonster()) {
        if (source.actual && source.actual.isPlayer()) {
            let difficulty = global.getPlayerDifficulty(player)
            let k = -Math.log(0.001) / 250;

            if (player.handSlots[0].getId().startsWith('lucky:')) {
                if ('lucky:lucky_world_invasion_lucky_sword' == player.handSlots[0].getId()) {
                    // console.log(player.block.light);
                    fixAmount = fixAmount * Math.max(Math.sqrt(player.block.light) * 2, 1)
                }

                if (entity.hasEffect('kubejs:lucky_shield')) {
                    entity.removeEffect('kubejs:lucky_shield')
                    entity.setAbsorptionAmount(0)
                }
            }

            if (fixAmount > GLOBAL_DAMAGE_LIMIT.limit) {
                entity.addEffect(new $MobEffectInstance(
                    'kubejs:lucky_shield',
                    GLOBAL_DAMAGE_LIMIT.luckyShieldTime * 20,
                    GLOBAL_DAMAGE_LIMIT.maxShieldLevel * fixAmount * (Math.exp(-k * (250 - difficulty))) / GLOBAL_DAMAGE_LIMIT.limit
                ))
            }

            if (BOSS_AND_ELIT.indexOf(entity.type) != -1) {
                fixAmount = Math.min(
                    fixAmount * Math.max(entity.health / entity.maxHealth, 0.1),
                    entity.maxHealth * GLOBAL_DAMAGE_LIMIT.percentage / 100
                )

                if (SKILL_BREAK_MOBS.indexOf(entity.type) != -1 && entity.health / entity.maxHealth < 0.3) {
                    if (!entity.persistentData.getString('chargeTarget')) {
                        chargedMobs.add(entity.uuid.toString())
                        entity.persistentData.putString('chargeTarget', player.uuid.toString())
                        entity.persistentData.putInt('chargeTime', parseInt(difficulty))
                        // entity.playSound('entity.ravager.roar')
                        entity.getServer().runCommandSilent(
                            `particle minecraft:soul_fire_flame ${entity.x} ${entity.y + 1} ${entity.z} 1 1 1 0.1 50`
                        )
                    }
                }

                // if ('attributeslib:current_hp_damage' === msgId) {
                //     event.setCanceled(true)
                // }
            }
            // console.log(msgId);
            // console.log(fixAmount);
        } else if (source.actual && 'touhou_little_maid:maid' == source.actual.getType()) {
            let MaidFavorability = parseInt(source.actual.getNbt().MaidFavorability || 0)
            let HandItem = source.actual.getNbt().HandItems[0]
            // console.log(msgId)
            // console.log(HandItem)
            // console.log(MaidFavorability);
            // console.log(source.actual.getNbt().ArmorItems)
            // console.log(fixAmount)
            let k = -Math.log(0.001) / 384;

            if (HandItem && HandItem.id.startsWith('lucky:')) {
                if ('lucky:lucky_world_invasion_lucky_sword' == HandItem.id) {
                    fixAmount = fixAmount * Math.max(Math.sqrt(source.actual.block.light) * 2, 1)
                }

                if (entity.hasEffect('kubejs:lucky_shield')) {
                    entity.removeEffect('kubejs:lucky_shield')
                    entity.setAbsorptionAmount(0)
                }
            }

            if (fixAmount > GLOBAL_DAMAGE_LIMIT.limit) {
                entity.addEffect(new $MobEffectInstance(
                    'kubejs:lucky_shield',
                    GLOBAL_DAMAGE_LIMIT.luckyShieldTime * 20,
                    GLOBAL_DAMAGE_LIMIT.maxShieldLevel * fixAmount * (Math.exp(-k * (384 - MaidFavorability))) / GLOBAL_DAMAGE_LIMIT.limit
                ))
            }

            if (BOSS_AND_ELIT.indexOf(entity.type) != -1) {
                fixAmount = Math.min(
                    fixAmount * Math.max(entity.health / entity.maxHealth, 0.1),
                    entity.maxHealth * GLOBAL_DAMAGE_LIMIT.percentage / 100
                )
                // if ('attributeslib:current_hp_damage' === msgId) {
                //     event.setCanceled(true)
                // }
            }

            // console.log(fixAmount)
        } else {
            if (BOSS_AND_ELIT.indexOf(entity.type) != -1 && 'genericKill' === msgId && entity.hasEffect('yakurum:death')) {
                event.setCanceled(true)
                entity.addEffect(new $MobEffectInstance(
                    'kubejs:lucky_shield',
                    GLOBAL_DAMAGE_LIMIT.luckyShieldTime * 20,
                    GLOBAL_DAMAGE_LIMIT.maxShieldLevel
                ))
                entity.getServer().runCommandSilent(
                    `particle minecraft:totem_of_undying ${entity.x} ${entity.y + 1} ${entity.z} 1 1 1 0.1 50`
                )
            }
        }
    }

    if (entity.isPlayer() || 'touhou_little_maid:maid' == entity.type) {
        if (entity.hasEffect('kubejs:lucky_shield')) {
            entity.removeEffect('kubejs:lucky_shield')
            entity.setAbsorptionAmount(0)
        }
    }

    // if ('torchesbecomesunlight:pursuer' == entity.type) {
    //     console.log(entity.getNbt().getInt('predicate'));
    // }

    // console.log(msgId);
    // console.log(fixAmount);

    if (typeof fixAmount == 'number' && !isNaN(fixAmount)) {
        event.setAmount(fixAmount)
    } else {
        event.setCanceled(true)
    }
}

EntityEvents.hurt(event => {
    const { entity, source } = event

    if (entity.type.startsWith('born_in_chaos_v1:') || 'legendary_monsters:skeletosaurus' == entity.type) {
        const damageType = typeof source.type === 'function' ? source.type() : source.type
        const msgId = typeof damageType.msgId === 'function' ? damageType.msgId() : damageType.msgId

        if ('cactus' === msgId) {
            event.cancel()
        }
    }

})

ServerEvents.tick(event => {
    const { server } = event
    
    if (server.tickCount % 2 === 0) {
        for (let entity of server.getEntities()) {
            if (entity.persistentData.getString('chargeTarget')) {
                let player = server.getPlayer(entity.persistentData.getString('chargeTarget'))
                entity.persistentData.putInt('chargeTime', entity.persistentData.getInt('chargeTime') - 1)
                if (!player || player.level.dimension !== entity.level.dimension || entity.persistentData.getInt('chargeTime') <= 0) {
                    entity.persistentData.remove('chargeTarget')
                    chargedMobs.delete(entity.uuid.toString())
                    continue
                }

                const dx = player.x - entity.x
                const dy = (player.y + player.eyeHeight) - entity.y
                const dz = player.z - entity.z
                const distance = Math.sqrt(dx*dx + dy*dy + dz*dz)

                if (distance > 20) {
                    entity.teleportTo(player.level.dimension, player.x, player.y, player.z, 1, 1)
                } else {
                    const speed = 0.5 + distance * 0.05
                    entity.setMotion(
                        dx/distance * speed,
                        dy/distance * speed * 0.2,
                        dz/distance * speed
                    )
                }
                
                server.runCommandSilent(`execute in ${player.level.dimension} run fill ${Math.round(entity.x - 1)} ${Math.round(entity.y)} ${Math.round(entity.z - 1)} ${Math.round(entity.x + 1)} ${Math.round(entity.y + 3)} ${Math.round(entity.z + 1)} air`)
            }
        }
    }
    
})

EntityEvents.spawned((event) => {
    const { entity } = event
    if (!entity || !entity.isLiving() || !entity.isMonster()) {
        return
    }

    if ('minecraft:ender_dragon' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 10, Name: 'attributeslib:life_steal' },
                { Base: 0.3, Name: 'attributeslib:current_hp_damage' },
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.8, Name: 'attributeslib:armor_shred' },
                { Base: 5, Name: 'attributeslib:prot_pierce' },
                { Base: 0.8, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'minecraft:generic.knockback_resistance' },
                // { Base: 1000, Name: 'minecraft:generic.max_health' } // 500
            ]
        })
    } else if ('yakurum:water_shooter' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 0.5, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1500, Name: 'minecraft:generic.max_health' } // 150
            ]
        })
    } else if ('yakurum:water_master' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 0.5, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1500, Name: 'minecraft:generic.max_health' } // 150
                
            ]
        })
    } else if ('minecraft:warden' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1500, Name: 'minecraft:generic.max_health' } // 500
            ]
        })
    } else if ('minecraft:wither' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1000, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('yakurum:kraken' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 40, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 500
            ]
        })
    } else if ('yakurum:king_triton' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 10, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.4, Name: 'attributeslib:current_hp_damage' },
                { Base: 2500, Name: 'minecraft:generic.max_health' } // 250
            ]
        })
    } else if ('yakurum:poseidon' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 40, Name: 'attributeslib:armor_pierce' },
                { Base: 0.4, Name: 'attributeslib:armor_shred' },
                { Base: 30, Name: 'attributeslib:prot_pierce' },
                { Base: 0.4, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.4, Name: 'attributeslib:current_hp_damage' },
                { Base: 7500, Name: 'minecraft:generic.max_health' } // 750
            ]
        })
    } else if ('shadowlands:wither_skeleton_commander' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2500, Name: 'minecraft:generic.max_health' } // 500
            ]
        })
    } else if ('shadowlands:doom_star' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 1000
            ]
        })
    } else if ('shadowlands:guardian_boar' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5120, Name: 'minecraft:generic.max_health' } // 1024
            ]
        })
    } else if ('shadowlands:vellium_megabee' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5120, Name: 'minecraft:generic.max_health' } // 1024
            ]
        })
    } else if ('shadowlands:sporeking' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5120, Name: 'minecraft:generic.max_health' } // 1024
            ]
        })
    } else if ('shadowlands:plaguemaiden' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5120, Name: 'minecraft:generic.max_health' } // 1024
            ]
        })
    } else if ('shadowlands:the_red_knight' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5120, Name: 'minecraft:generic.max_health' } // 1024
            ]
        })
    } else if ('shadowlands:red_nightmare' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 1000
            ]
        })
    } else if ('shadowlands:ascendant_star_stage_1' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 150, Name: 'minecraft:generic.max_health' } // 50
            ]
        })
    } else if ('shadowlands:ascendant_star_stage_2' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1600, Name: 'minecraft:generic.max_health' } // 400
            ]
        })
    } else if ('shadowlands:ascendant_star_stage_3' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2000, Name: 'minecraft:generic.max_health' } // 400
            ]
        })
    } else if ('shadowlands:ascendant_star_stage_4' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 800
            ]
        })
    } else if ('shadowlands:ascendant_star_stage_5' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 10000, Name: 'minecraft:generic.max_health' } // 1000
            ]
        })
    } else if ('shadowlands:emperor_wither' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 20, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 2, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 10000, Name: 'minecraft:generic.max_health' } // 1000
            ]
        })
    } else if ('twilightforest:naga' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1200, Name: 'minecraft:generic.max_health' } // 120
            ]
        })
    } else if ('twilightforest:lich' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 500 
            ]
        })
    } else if ('twilightforest:hydra' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 5000, Name: 'minecraft:generic.max_health' } // 500
            ]
        })
    } else if ('twilightforest:knight_phantom' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 350, Name: 'minecraft:generic.max_health' } // 35
            ]
        })
    } else if ('twilightforest:minoshroom' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1200, Name: 'minecraft:generic.max_health' } // 120
            ]
        })
    } else if ('twilightforest:ur_ghast' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2500, Name: 'minecraft:generic.max_health' } // 250
            ]
        })
    } else if ('twilightforest:alpha_yeti' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2000, Name: 'minecraft:generic.max_health' } // 200
            ]
        })
    } else if ('twilightforest:snow_queen' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:dune_sentinel' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:posessed_paladin' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:ancient_guardian' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:frostbitten_golem' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:withered_abomination' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:skeletosaurus' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:warped_fungussus' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:endersent' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:shulker_mimic' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:overgrown_colossus' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:lava_eater' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 30, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('legendary_monsters:cloud_golem' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.4, Name: 'attributeslib:armor_shred' },
                { Base: 5, Name: 'attributeslib:prot_pierce' },
                { Base: 0.4, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.3, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('better_minoshroomtaur:better_minoshroomtaur' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 25, Name: 'attributeslib:armor_pierce' },
                { Base: 0.2, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.2, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2800, Name: 'minecraft:generic.max_health' } // 280
            ]
        })
    } else if ('born_in_chaos_v1:lord_pumpkinhead' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 15, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 3000, Name: 'minecraft:generic.max_health' } // 600
            ]
        })
    } else if ('born_in_chaos_v1:lord_pumpkinhead_withouta_horse' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 15, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1000, Name: 'minecraft:generic.max_health' } // 200
            ]
        })
    } else if ('born_in_chaos_v1:lord_the_headless' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 15, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 1500, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('born_in_chaos_v1:lord_pumpkinhead_head' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 15, Name: 'attributeslib:armor_pierce' },
                { Base: 0.1, Name: 'attributeslib:armor_shred' },
                { Base: 3, Name: 'attributeslib:prot_pierce' },
                { Base: 0.1, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 800, Name: 'minecraft:generic.max_health' } // 160
            ]
        })
    } else if ('rats:rat_king' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 2000, Name: 'minecraft:generic.max_health' } // 200
            ]
        })
    } else if ('rats:black_death' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 3000, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('rats:dutchrat' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 3000, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('rats:rat_baron' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 3000, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('rats:neo_ratlantean' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.1, Name: 'attributeslib:current_hp_damage' },
                { Base: 3000, Name: 'minecraft:generic.max_health' } // 300
            ]
        })
    } else if ('rats:ratlantean_automaton' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 100, Name: 'attributeslib:armor_pierce' },
                { Base: 0.3, Name: 'attributeslib:armor_shred' },
                { Base: 4, Name: 'attributeslib:prot_pierce' },
                { Base: 0.3, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.2, Name: 'attributeslib:current_hp_damage' },
                { Base: 4000, Name: 'minecraft:generic.max_health' } // 400
            ]
        })
    } else if ('torchesbecomesunlight:frost_nova' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 200, Name: 'voidscape:voidic_dmg'},
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.5, Name: 'attributeslib:armor_shred' },
                { Base: 5, Name: 'attributeslib:prot_pierce' },
                { Base: 0.5, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.2, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('torchesbecomesunlight:patriot' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 200, Name: 'voidscape:voidic_dmg'},
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.5, Name: 'attributeslib:armor_shred' },
                { Base: 5, Name: 'attributeslib:prot_pierce' },
                { Base: 0.5, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.2, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('torchesbecomesunlight:gun_knight_patriot' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 200, Name: 'voidscape:voidic_dmg'},
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.5, Name: 'attributeslib:armor_shred' },
                { Base: 5, Name: 'attributeslib:prot_pierce' },
                { Base: 0.5, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.3, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    } else if ('torchesbecomesunlight:pursuer' == entity.type) {
        entity.mergeNbt({
            Attributes: [
                { Base: 200, Name: 'voidscape:voidic_dmg'},
                { Base: 50, Name: 'attributeslib:armor_pierce' },
                { Base: 0.6, Name: 'attributeslib:armor_shred' },
                { Base: 34, Name: 'attributeslib:prot_pierce' },
                { Base: 0.6, Name: 'attributeslib:prot_shred' },
                { Base: 1, Name: 'attributeslib:life_steal' },
                { Base: 0.4, Name: 'attributeslib:current_hp_damage' },
            ]
        })
    }
})
