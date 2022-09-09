<style scoped>
    .listing {
        position: relative;
        border-radius: 10px;
        padding: 80px 30px;
    }

    .item{
        font-weight: 700;
        font-size: 36px;
        text-decoration: none;
        color: #363B81;
    }

    .item:visited {
        color: #363B81;
    }

    .img-icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        opacity: 0.2;
    }
</style>

<template>
    <div class="listing" :style="`background:${background}; text-align:${align};`">
        <router-link class="item" :to="`/${nameDetail}`">{{nameDetail}}</router-link>
        <img class="img-icon" :src="image" width="100" alt="pokeball">
    </div>
</template>

<script>
import { computed, toRefs } from "vue";
export default {
    props: ['name', 'background', 'image', 'align'],
    setup(props) {
        const { name, background, image, align } = toRefs(props)
        const nameDetail = computed(() => {
            return `${name.value}`
        })

        return { nameDetail, background, image, align }
    }
}
</script>