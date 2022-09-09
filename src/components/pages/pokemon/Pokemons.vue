<template>
    <div>
        <div class="container mt-4 mb-4">
            <div  ref="scrollComponent" class="row gx-3 gy-3">
                <div class="col-xl-4 col-md-6" v-for="(item, index) in data?.list?.results" :key="index">
                    <Card
                        :name="item.name"
                        :align="`left`"
                        :background="`linear-gradient(180deg, rgba(226, 63, 63, 0.39) 0%, rgba(251, 215, 67, 0.51) 100%)`"
                        :image=" store.state.pokemon.type == 'pokemon'?`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg` : `https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png`"
                    />
                </div>
            </div>
        </div>
        <Filter @updateFilter="getUpdateFilter"/>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { useStore } from "vuex";
import Card from '../parts/Card.vue'
import Filter from '../parts/Filter.vue'

const scrollComponent = ref('')

const store = useStore()
let setUrl = ref(`https://pokeapi.co/api/v2/${store.state.pokemon.type}/`)

// set first data list
const data = reactive({
    list: []
})

// set new data list
const newData = reactive({
    list: []
})

// set endpoin next API
const next = ref(null)


watchEffect( async () => {
    const result = await fetch(setUrl.value)
    data.list = await result.json()
    next.value = data.list.next
})

const result = await fetch(setUrl.value)
data.list = await result.json()
next.value = data.list.next


const loadMore = async () => {
    if(next.value != null) {
        let newList = await fetch(next.value)
        newData.list = await newList.json()
        next.value = newData.list.next
    
        newData.list.results.map(e => {
            data.list.results.push(e)
        })
    }
}

const getUpdateFilter = (value, value2) => {
    setUrl.value = value
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
})

const handleScroll = async (e) => {
    let element = scrollComponent.value
    if(Math.round(element.getBoundingClientRect().bottom) <= window.innerHeight) {
        loadMore()
    }
}

</script>
