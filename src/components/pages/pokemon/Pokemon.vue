<style scoped>
    .card-name {
        position: relative;
        border-radius: 10px;
        padding: 80px 30px;
        background: #FDED9A;
    }

    .card-detail {
        border-radius: 10px;
        padding: 50px 30px;
        background: #FDAC9A;
    }

    .name{
        font-weight: 700;
        font-size: 36px;
        text-align: center;
        text-decoration: none;
        color: #363B81;
    }

    .title {
        font-weight: 500;
        font-size: 24px;
        color: #363B81;
    }
    
    .desc {
        font-weight: 700;
        font-size: 20px;
        color: #5B62C1;
    }
    .img-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        opacity: 0.1;
    }
</style>

<template>
    <template v-if="store.state.pokemon.type == 'pokemon'">
        <div class="container mt-4 mb-4">
            <div class="row gx-3 gy-3">
                <div class="col-md-5">
                    <Card
                        :name="detail.name"
                        :align="`center`"
                        :background="`#FDED9A`"
                        :image="detail.sprites?.other?.dream_world?.front_default ?? `https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png`"
                    />
                </div>
                <div class="col-md-7">
                    <div class="card-detail">
                        <div class="mb-4">
                            <h1 class="title">Base Experience</h1>
                            <p class="desc">{{detail.base_experience}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Height</h1>
                            <p class="desc">{{detail.height}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Weight</h1>
                            <p class="desc">{{detail.weight}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Ability</h1>
                            <template v-for="(data, index) in detail?.abilities" :key="data">
                                <span class="desc">{{detail?.abilities?.length > 1 && index != 0 ? `, ${data?.ability?.name}` : `${data?.ability?.name}`}}</span>
                            </template>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Sprites</h1>
                            <span>
                                <img :src="detail.sprites?.back_default"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.front_default"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.back_shiny"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.front_shiny"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="container mt-4">
            <div class="row gx-3 gy-3">
                <div class="col-md-5">
                    <Card
                        :name="detail.name"
                        :align="`center`"
                        :background="`#FDED9A`"
                        :image="detail.sprites?.other?.dream_world?.front_default ?? `https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png`"
                    />
                </div>
                <div class="col-md-7">
                    <div class="card-detail">
                        <div class="mb-4">
                            <h1 class="title">Status Decreased</h1>
                            <p class="desc">{{detail.decreased_stat.name}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Status Increased</h1>
                            <p class="desc">{{detail.increased_stat.name}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Likes Flavour</h1>
                            <p class="desc">{{detail.likes_flavor.name}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Hate Flavour</h1>
                            <p class="desc">{{detail.hates_flavor.name}}</p>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Move Battle Style</h1>
                            <template v-for="(data, index) in detail?.move_battle_style_preferences" :key="data">
                                <span class="desc">{{detail?.move_battle_style_preferences?.length > 1 && index != 0 ? `, ${data?.move_battle_style?.name} (low HP: ${data?.low_hp_preference} | high HP: ${data?.high_hp_preference})` : `${data?.move_battle_style?.name} (low HP: ${data?.low_hp_preference} | high HP: ${data?.high_hp_preference})`}}</span>
                            </template>
                        </div>
                        <div class="mb-4">
                            <h1 class="title">Sprites</h1>
                            <span>
                                <img :src="detail.sprites?.back_default"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.front_default"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.back_shiny"/>
                            </span>
                            <span>
                                <img :src="detail.sprites?.front_shiny"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Card from '../parts/Card.vue'
export default {
    components: { Card },
    async setup() {
        const data = reactive({
            detail: null,
        })

        const route = useRoute()
        const store = useStore()

        const name = route.params.name
        const result = await fetch(`https://pokeapi.co/api/v2/${store.state.pokemon.type}/${name}`)
        const detail = await result.json()
        
        data.detail = detail

        return { ...toRefs(data), route, store }
    }
}
</script>