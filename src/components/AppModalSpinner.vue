<script setup>
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '../stores/useAnimeStore'
import { onMounted, onUnmounted } from 'vue'

const animeStore = useAnimeStore(),
    { isSpinnerVisible } = storeToRefs(animeStore)

onMounted(() => (isSpinnerVisible.value = true))
onUnmounted(() => (isSpinnerVisible.value = false))
</script>

<template>
    <div class="center">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    </div>
</template>

<style lang="scss" scoped>
.center {
    width: min-content;

    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;

    position: absolute;
    top: 50%;
    left: 50%;

    z-index: 9;
    transform: translateX(-50%) translateY(-50%);
}
.wave {
    width: 5px;
    height: 100px;
    background: linear-gradient(45deg, cyan, #fff);
    margin: 10px;
    animation: wave 1s linear infinite;
    border-radius: 20px;
}
.wave:nth-child(2) {
    animation-delay: 0.1s;
}
.wave:nth-child(3) {
    animation-delay: 0.2s;
}
.wave:nth-child(4) {
    animation-delay: 0.3s;
}
.wave:nth-child(5) {
    animation-delay: 0.4s;
}
.wave:nth-child(6) {
    animation-delay: 0.5s;
}
.wave:nth-child(7) {
    animation-delay: 0.6s;
}
.wave:nth-child(8) {
    animation-delay: 0.7s;
}
.wave:nth-child(9) {
    animation-delay: 0.8s;
}
.wave:nth-child(10) {
    animation-delay: 0.9s;
}

@keyframes wave {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
</style>
