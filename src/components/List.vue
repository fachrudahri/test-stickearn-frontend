<template>
    <Suspense>
        <Pokemons/>
    </Suspense>
</template>

<script>
import Pokemons from './pages/pokemon/Pokemons.vue'
export default {
    components: { Pokemons },
    setup() {
    }    
}
</script>