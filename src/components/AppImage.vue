<script setup>
defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <picture class="img-container">
        <img :src="src" :alt="alt" class="img" />
    </picture>
</template>

<style lang="scss" scoped>
.img-container {
    display: flex;
    align-items: center;
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
