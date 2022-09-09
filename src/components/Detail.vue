<template>
    <Suspense>
        <Pokemon/>
    </Suspense>
</template>

<script>
import Pokemon from './pages/pokemon/Pokemon.vue'
export default {
    components: { Pokemon },
    setup() {
    }
}
</script>