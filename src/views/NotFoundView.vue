<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
</script>

<template>
    <div class="page-not-found">
        <h1>Page Not Found</h1>
        <AppToOverViewBtn />
    </div>
</template>

<style lang="scss" scoped>
.page-not-found {
    height: 100%;
    display: grid;
    place-content: center;
    justify-items: center;

    h1 {
        color: $color-primary;
    }
}
</style>
