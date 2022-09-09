<style scoped>
    .toggle {
        position: fixed;
        border-radius: 100px;
        background-color: rgb(105, 173, 250);
        right: 20px;
        bottom: 20px;
        z-index: 10;
        text-align: center;
        cursor: pointer;
    }

    .toggle img {
        padding: 15px;
    }

    #modalFilter {
        position: fixed;
        width: 250px;
        border-radius: 15px;
        background-color: rgb(150, 196, 249);
        right: 20px;
        bottom: 100px;
        z-index: 10;
        padding: 20px;
        max-height: 400px;
        overflow: scroll;
        scrollbar-width: none; 
    }

    #modalFilter::-webkit-scrollbar {
        display: none;
    }

    #modalFilter ul {
        margin-bottom: 0;
        padding-left: 0;
    }

    .item-filter {
        color: #363B81;
        cursor: pointer;
        margin: 5px;
        list-style: none;
        font-size: 20px;
        font-weight: 500;
    }
</style>

<template>
    <div class="toggle" @click="changeModal()">
        <img src="../../../assets/filter.svg" alt="">
    </div>

    <div v-if="showModal" id="modalFilter">
        <ul>
            <li class="item-filter" @click="updateFilter(filter.pokemon); setTypeFunc('pokemon')">Pokemon<hr></li>
            <li class="item-filter" @click="updateFilter(filter.nature); setTypeFunc('nature')">Nature<hr></li>
        </ul>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    emits: ['updateFilter'],

    async setup(props, { attrs, slots, emit }) {
        let showModal = ref(false)
        const data = reactive({
            filter: null
        })

        const store = useStore()

        const setTypeFunc = (type) => {
            store.commit('pokemon/setType', type)
            saveToLocalStorage(type)
        }

        const result = await fetch(`https://pokeapi.co/api/v2`)
        data.filter = await result.json()


        const updateFilter = (url) => {
            emit('updateFilter', url)
        }

        const saveToLocalStorage = (value) => {
            localStorage.setItem('filter', JSON.stringify(value))
        }

        const changeModal = () => {
            showModal.value = !showModal.value
        }

        return {...toRefs(data), updateFilter, showModal, changeModal, setTypeFunc }
    }
}
</script>