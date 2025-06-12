const $PSInvasionMob = Java.loadClass('dev.theagameplayer.puresuffering.world.entity.PSInvasionMob')

EntityEvents.death((event) => {
  const { server, source, entity } = event

  if (entity.monster && source.actual && source.actual.isPlayer()) {
    const { player } = source
    let difficulty = global.getPlayerDifficulty(player)

    if (entity.nbt[$PSInvasionMob.HYPER_CHARGE] > 0) {
      if (Math.random() > (1 - difficulty / (difficulty + 100))) {
        entity.block.popItem(Item.of('shadowlands:silver_coin', entity.nbt[$PSInvasionMob.HYPER_CHARGE]));
      }
    }

    // .some(type => Internal.MobSpawnType.NATURAL.equals(type))
    // console.log(entity.nbt['forge:spawn_type'])
  }

})

ServerEvents.entityLootTables(event => {
  event.addEntity('fuze_relics:burger_boss', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addEmpty(10)
      pool.addItem('diamond').weight(10).count([2, 5])
      pool.addItem('shadowlands:silver_coin').weight(1).count([1, 5])
    })
  })

  event.addEntity('torchesbecomesunlight:frost_nova', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addItem('apotheotic_additions:artifact_material').weight(100)
      pool.addItem('apotheotic_additions:heirloom_material').weight(40)
      pool.addItem('apotheotic_additions:esoteric_material').weight(1)
    })
  })

  event.addEntity('torchesbecomesunlight:patriot', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addItem('torchesbecomesunlight:halberd').weight(100)
    })

    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addEmpty(100)
      pool.addItem('apotheotic_additions:artifact_material').weight(100).count([1, 2])
      pool.addItem('apotheotic_additions:heirloom_material').weight(40).count([1, 2])
      pool.addItem('apotheotic_additions:esoteric_material').weight(1)
    })
  })

  event.addEntity('torchesbecomesunlight:gun_knight_patriot', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addEmpty(100)
      pool.addItem('apotheotic_additions:artifact_material').weight(100).count([2, 2])
      pool.addItem('apotheotic_additions:heirloom_material').weight(40).count([2, 2])
      pool.addItem('apotheotic_additions:esoteric_material').weight(1)
    })
  })

  event.addEntity('torchesbecomesunlight:pursuer', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addItem('torchesbecomesunlight:ursus_machete')
    })

    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addEmpty(100)
      pool.addItem('apotheotic_additions:artifact_material').weight(100).count([1, 2])
      pool.addItem('apotheotic_additions:heirloom_material').weight(40).count([1, 2])
      pool.addItem('apotheotic_additions:esoteric_material').weight(1)
    })
  })

  event.addEntity('legendary_monsters:cloud_golem', loot => {
    loot.addPool(pool => {
      pool.rolls = 1
      pool.addItem('legendary_monsters:air_rune')
    })

    loot.addPool(pool => {
      pool.rolls = 1
      pool.addItem('legendary_monsters:atmospheric_boots')
    })

    loot.addPool(pool => {
      pool.rolls = 1
      pool.killedByPlayer()
      pool.addItem('apotheotic_additions:artifact_material').weight(100).count([2, 5])
      pool.addItem('apotheotic_additions:heirloom_material').weight(40).count([2, 5])
      pool.addItem('apotheotic_additions:esoteric_material').weight(1).count([1, 2])
    })
  })

//   event.modifyEntity('artifacts:mimic', loot => {
//     loot.addPool(pool => {
//       // pool.setUniformRolls(1, 3)
//       // pool.enchantRandomly('minecraft:smite')
//       // pool.lootingEnchant(2, 10)
//       // pool.killedByPlayer()
//       // pool.addEmpty(2)
//       // pool.randomChanceWithLooting(0.1, 0.2)
//       pool.entityProperties('killer', {
//         type: 'minecraft:player',
//         equipment: {
//           mainhand: {
//             items: [
//               'minecraft:diamond_sword'
//             ],
//             predicates: {
//               enchantments: {
//                 enchantments: ['minecraft:silk_touch']
//               }
//             }
//           }
//         }
//       })
//       pool.rolls = 3
//     })
//   })
})

ServerEvents.chestLootTables(event => {

  event.modify('minecraft:pillager_outpost', loot => {
    loot.addPool(pool => {
      pool.rolls = 5
      pool.addItem('minecraft:gunpowder').count([3, 6]).weight(20)
      pool.addItem('minecraft:emerald').weight(10)
      pool.addItem('minecraft:diamond').weight(5)
    })
  })

  event.modify('super_block_world:brick_fortress', loot => {
    loot.clearPools()
    loot.addPool(pool => {
      pool.rolls = 8
      pool.addItem('super_block_world:toadstone_bricks').weight(20)
      pool.addItem('super_block_world:yoshi_fruit').weight(16)
      pool.addItem('minecraft:diamond').weight(6)
      pool.addItem('lucky:lucky_block').weight(6)
      pool.addItem('super_block_world:yoshi_cookie').weight(5)
      pool.addItem('super_block_world:hammer').weight(2)
    })
  })
})