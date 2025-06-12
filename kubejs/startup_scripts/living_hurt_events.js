ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
    global.LivingHurtEvent(event)
})

// ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', event => {
//     global.LivingDamageEvent(event)
// })